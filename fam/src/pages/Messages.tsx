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

  if (data.conversations.length === 0) {
    return (
      <AppLayout>
        <div className="bg-white rounded-2xl border border-neutral-100 p-12 text-center shadow-sm max-w-lg mx-auto">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-neutral-100 flex items-center justify-center text-2xl">💬</div>
          <h3 className="text-lg font-bold text-neutral-900 mb-2">No messages yet</h3>
          <p className="text-neutral-500 text-sm mb-6">
            {otherMembers.length > 0
              ? 'Start a conversation with a family member.'
              : 'Add family members from your profile, then start chatting.'}
          </p>
          {otherMembers.length > 0 ? (
            <button
              onClick={() => setNewChatOpen(true)}
              className="px-6 py-2.5 bg-neutral-900 text-white rounded-xl text-sm font-semibold"
            >
              New message
            </button>
          ) : null}
        </div>
        <Modal open={newChatOpen} onClose={() => setNewChatOpen(false)} title="New message">
          <div className="space-y-2">
            {otherMembers.map((m) => (
              <button
                key={m.id}
                onClick={() => startChat(m.id)}
                className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-neutral-50 text-left"
              >
                <img src={m.avatar} alt="" className="w-10 h-10 rounded-full object-cover" />
                <span className="font-medium text-neutral-800">{m.name}</span>
              </button>
            ))}
          </div>
        </Modal>
      </AppLayout>
    );
  }

  return (
    <AppLayout>
      <div className="bg-white rounded-2xl border border-neutral-100 shadow-sm overflow-hidden h-[calc(100vh-8rem)] lg:h-[calc(100vh-6rem)] flex animate-slide-up">
        <div className={`w-full sm:w-80 border-r border-neutral-100 flex-col ${mobileShowChat ? 'hidden sm:flex' : 'flex'}`}>
          <div className="p-4 border-b border-neutral-100">
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-lg font-bold text-neutral-900">Messages</h2>
              {otherMembers.length > 0 && (
                <button onClick={() => setNewChatOpen(true)} className="text-sm font-semibold text-neutral-900 hover:underline">
                  New
                </button>
              )}
            </div>
            <input
              type="text"
              placeholder="Search..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full px-4 py-2.5 rounded-lg bg-neutral-50 border border-neutral-100 text-sm focus:outline-none focus:ring-2 focus:ring-neutral-900/10"
            />
          </div>
          <div className="flex-1 overflow-y-auto">
            {conversations.map((conv) => (
              <button
                key={conv.id}
                onClick={() => selectConversation(conv.id)}
                className={`w-full flex items-center gap-3 p-4 hover:bg-neutral-50 text-left border-b border-neutral-50 ${
                  activeId === conv.id ? 'bg-neutral-50 border-l-2 border-l-neutral-900' : ''
                }`}
              >
                <img src={conv.avatar} alt="" className="w-12 h-12 rounded-full object-cover" />
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between gap-2">
                    <h3 className="font-semibold text-neutral-800 text-sm truncate">{conv.name}</h3>
                    <span className="text-xs text-neutral-400">{conv.lastMessageTime}</span>
                  </div>
                  <p className="text-xs text-neutral-500 truncate mt-0.5">{conv.lastMessage}</p>
                </div>
              </button>
            ))}
          </div>
        </div>

        {activeConversation ? (
          <div className={`flex-1 flex-col ${mobileShowChat ? 'flex' : 'hidden sm:flex'}`}>
            <div className="p-4 border-b border-neutral-100 flex items-center gap-3">
              <button onClick={() => setMobileShowChat(false)} className="sm:hidden p-2 rounded-lg hover:bg-neutral-100">←</button>
              <img src={activeConversation.avatar} alt="" className="w-10 h-10 rounded-full object-cover" />
              <div>
                <h3 className="font-semibold text-neutral-800">{activeConversation.name}</h3>
                <p className="text-xs text-emerald-600">{activeConversation.isGroup ? 'Group chat' : 'Active now'}</p>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-neutral-50/50">
              {activeConversation.messages.length === 0 ? (
                <p className="text-center text-neutral-400 text-sm py-8">Say hello 👋</p>
              ) : (
                activeConversation.messages.map((msg) => {
                  const sender = getMemberById(data.members, msg.senderId);
                  const isMe = msg.senderId === user?.id;
                  return (
                    <div key={msg.id} className={`flex gap-3 ${isMe ? 'flex-row-reverse' : ''}`}>
                      {!isMe && sender && <img src={sender.avatar} alt="" className="w-8 h-8 rounded-full object-cover mt-1" />}
                      <div className={`max-w-[75%] ${isMe ? 'text-right' : ''}`}>
                        {!isMe && sender && <p className="text-xs text-neutral-500 mb-1">{sender.name}</p>}
                        <div className={`px-4 py-2.5 rounded-2xl text-sm inline-block ${isMe ? 'bg-neutral-900 text-white rounded-br-md' : 'bg-white text-neutral-700 border border-neutral-100 rounded-bl-md'}`}>
                          {msg.imageUrl ? (
                            <img src={msg.imageUrl} alt="Shared" className="max-w-[220px] rounded-lg mb-1" />
                          ) : null}
                          {msg.content}
                        </div>
                        <p className={`text-[10px] text-neutral-400 mt-1 ${isMe ? 'text-right' : ''}`}>{msg.timestamp}</p>
                      </div>
                    </div>
                  );
                })
              )}
            </div>

            <div className="p-4 border-t border-neutral-100 bg-white">
              <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handleAttach} />
              <div className="flex items-center gap-3">
                <button onClick={() => fileRef.current?.click()} className="p-2 rounded-lg hover:bg-neutral-100 text-neutral-500" aria-label="Attach">📎</button>
                <input
                  value={messageInput}
                  onChange={(e) => setMessageInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                  placeholder="Message..."
                  className="flex-1 px-4 py-3 rounded-xl bg-neutral-50 border border-neutral-100 text-sm focus:outline-none focus:ring-2 focus:ring-neutral-900/10"
                />
                <button
                  onClick={handleSend}
                  disabled={!messageInput.trim()}
                  className="p-3 rounded-xl bg-neutral-900 text-white disabled:opacity-40"
                  aria-label="Send"
                >
                  ➤
                </button>
              </div>
            </div>
          </div>
        ) : null}
      </div>

      <Modal open={newChatOpen} onClose={() => setNewChatOpen(false)} title="New message">
        <div className="space-y-2">
          {otherMembers.map((m) => (
            <button
              key={m.id}
              onClick={() => startChat(m.id)}
              className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-neutral-50 text-left"
            >
              <img src={m.avatar} alt="" className="w-10 h-10 rounded-full object-cover" />
              <span className="font-medium text-neutral-800">{m.name}</span>
            </button>
          ))}
        </div>
      </Modal>
    </AppLayout>
  );
}
