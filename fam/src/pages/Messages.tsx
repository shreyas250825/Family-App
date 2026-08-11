import { useState, useRef } from 'react';
import { AppLayout } from '../components/layout/AppLayout';
import { Modal } from '../components/ui/Modal';
import { useFamZee } from '../context/FamZeeContext';
import { getMemberById } from '../constants/mockData';

export function Messages() {
  const { data, sendMessage, searchConversations, uploadImage, user, createConversation } = useFamZee();
  const [activeId, setActiveId] = useState(data.conversations[0]?.id || '');
  const [messageInput, setMessageInput] = useState('');
  const [search, setSearch] = useState('');
  const [mobileShowChat, setMobileShowChat] = useState(false);
  const [newChatOpen, setNewChatOpen] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  const conversations = searchConversations(search);
  const activeConversation = data.conversations.find((c) => c.id === activeId);
  const otherMembers = data.members.filter((m) => m.id !== user?.id);

  const selectConversation = (id: string) => {
    setActiveId(id);
    setMobileShowChat(true);
  };

  const startChat = (memberId: string) => {
    const id = createConversation([memberId]);
    setActiveId(id);
    setMobileShowChat(true);
    setNewChatOpen(false);
  };

  const handleSend = () => {
    if (!messageInput.trim() || !activeConversation) return;
    sendMessage(activeConversation.id, messageInput.trim());
    setMessageInput('');
  };

  const handleAttach = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !activeConversation) return;
    const imageUrl = await uploadImage(file);
    sendMessage(activeConversation.id, 'Shared a photo', imageUrl);
    e.target.value = '';
  };

  return (
    <AppLayout>
      <div className="flex h-[calc(100vh-8rem)] overflow-hidden rounded-2xl border border-white/[0.06] bg-[#0B0B0D] lg:h-[calc(100vh-6rem)]">
        {/* Conversation list */}
        <div className={`w-full flex-col border-r border-white/[0.06] sm:w-80 ${mobileShowChat ? 'hidden sm:flex' : 'flex'}`}>
          <div className="border-b border-white/[0.06] p-4">
            <div className="mb-3 flex items-center justify-between">
              <h2 className="text-lg font-medium text-stone-100">Messages</h2>
              {otherMembers.length > 0 ? (
                <button type="button" onClick={() => setNewChatOpen(true)} className="text-xs font-medium text-violet-400 hover:text-violet-300">
                  New
                </button>
              ) : null}
            </div>
            <input
              type="text"
              placeholder="Search conversations…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full rounded-lg border border-white/[0.06] bg-[#111113] px-4 py-2.5 text-sm text-stone-200 placeholder:text-stone-600 focus:outline-none focus:ring-1 focus:ring-violet-500/30"
            />
          </div>
          <div className="flex-1 overflow-y-auto">
            {conversations.map((conv) => (
              <button
                key={conv.id}
                type="button"
                onClick={() => selectConversation(conv.id)}
                className={`flex w-full items-center gap-3 border-b border-white/[0.04] p-4 text-left transition hover:bg-white/[0.02] ${
                  activeId === conv.id ? 'bg-white/[0.04]' : ''
                }`}
              >
                <img src={conv.avatar} alt="" className="h-11 w-11 rounded-full object-cover" />
                <div className="min-w-0 flex-1">
                  <div className="flex justify-between gap-2">
                    <h3 className="truncate text-sm font-medium text-stone-200">{conv.name}</h3>
                    <span className="shrink-0 text-[10px] text-stone-600">{conv.lastMessageTime}</span>
                  </div>
                  <p className="mt-0.5 truncate text-xs text-stone-500">{conv.lastMessage}</p>
                </div>
                {conv.unread > 0 ? (
                  <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-violet-500 text-[10px] font-medium text-white">
                    {conv.unread}
                  </span>
                ) : null}
              </button>
            ))}
          </div>
        </div>

        {/* Chat panel */}
        {activeConversation ? (
          <div className={`min-w-0 flex-1 flex-col ${mobileShowChat ? 'flex' : 'hidden sm:flex'}`}>
            <div className="flex items-center gap-3 border-b border-white/[0.06] p-4">
              <button type="button" onClick={() => setMobileShowChat(false)} className="rounded-lg p-2 text-stone-500 hover:bg-white/[0.04] sm:hidden">
                ←
              </button>
              <img src={activeConversation.avatar} alt="" className="h-10 w-10 rounded-full object-cover" />
              <div>
                <h3 className="font-medium text-stone-100">{activeConversation.name}</h3>
                <p className="text-xs text-emerald-500">
                  {activeConversation.isGroup ? '4 members · active' : 'Active now'}
                </p>
              </div>
            </div>

            <div className="flex-1 space-y-4 overflow-y-auto p-4">
              {activeConversation.messages.map((msg) => {
                const sender = getMemberById(data.members, msg.senderId) || (msg.senderId === user?.id ? user : null);
                const isMe = msg.senderId === user?.id;
                return (
                  <div key={msg.id} className={`flex gap-2.5 ${isMe ? 'flex-row-reverse' : ''}`}>
                    {!isMe && sender ? (
                      <img src={'avatar' in sender ? sender.avatar : user?.avatar} alt="" className="mt-1 h-7 w-7 rounded-full object-cover" />
                    ) : null}
                    <div className={`max-w-[80%] ${isMe ? 'text-right' : ''}`}>
                      {!isMe && sender ? (
                        <p className="mb-1 text-[10px] text-stone-600">{'name' in sender ? sender.name : ''}</p>
                      ) : null}
                      <div
                        className={`inline-block rounded-2xl px-4 py-2.5 text-sm ${
                          isMe
                            ? 'rounded-br-md bg-violet-600/90 text-white'
                            : 'rounded-bl-md border border-white/[0.06] bg-[#111113] text-stone-300'
                        }`}
                      >
                        {msg.imageUrl ? (
                          <img src={msg.imageUrl} alt="Shared" className="mb-1 max-w-[200px] rounded-lg" />
                        ) : null}
                        {msg.content}
                      </div>
                      <p className={`mt-1 text-[10px] text-stone-600 ${isMe ? 'text-right' : ''}`}>
                        {msg.timestamp}
                        {isMe && msg.isRead ? ' · Read' : ''}
                      </p>
                    </div>
                  </div>
                );
              })}
              {activeConversation.isGroup ? (
                <p className="text-center text-xs text-stone-600">Meera is typing…</p>
              ) : null}
            </div>

            <div className="border-t border-white/[0.06] bg-[#0a0a0a] p-4">
              <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handleAttach} />
              <div className="flex items-center gap-2">
                <button type="button" onClick={() => fileRef.current?.click()} className="rounded-lg p-2 text-stone-500 hover:bg-white/[0.04]" aria-label="Attach">
                  📎
                </button>
                <input
                  value={messageInput}
                  onChange={(e) => setMessageInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                  placeholder="Message…"
                  className="flex-1 rounded-xl border border-white/[0.06] bg-[#111113] px-4 py-3 text-sm text-stone-200 placeholder:text-stone-600 focus:outline-none focus:ring-1 focus:ring-violet-500/30"
                />
                <button
                  type="button"
                  onClick={handleSend}
                  disabled={!messageInput.trim()}
                  className="rounded-xl bg-stone-100 px-4 py-3 text-sm font-medium text-[#0a0a0a] disabled:opacity-40"
                  aria-label="Send"
                >
                  Send
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="hidden flex-1 items-center justify-center sm:flex">
            <p className="text-sm text-stone-600">Select a conversation</p>
          </div>
        )}
      </div>

      <Modal open={newChatOpen} onClose={() => setNewChatOpen(false)} title="New message">
        <div className="space-y-2">
          {otherMembers.map((m) => (
            <button
              key={m.id}
              type="button"
              onClick={() => startChat(m.id)}
              className="flex w-full items-center gap-3 rounded-xl p-3 text-left hover:bg-white/[0.04]"
            >
              <img src={m.avatar} alt="" className="h-10 w-10 rounded-full object-cover" />
              <span className="font-medium text-stone-200">{m.name}</span>
            </button>
          ))}
        </div>
      </Modal>
    </AppLayout>
  );
}
