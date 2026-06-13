import { useState } from 'react';
import { AppLayout } from '../components/layout/AppLayout';
import { CONVERSATIONS, getMemberById } from '../constants/mockData';

export function Messages() {
  const [activeId, setActiveId] = useState(CONVERSATIONS[0].id);
  const [messageInput, setMessageInput] = useState('');
  const [mobileShowChat, setMobileShowChat] = useState(false);

  const activeConversation = CONVERSATIONS.find((c) => c.id === activeId)!;

  const selectConversation = (id: string) => {
    setActiveId(id);
    setMobileShowChat(true);
  };

  return (
    <AppLayout>
      <div className="glass-dark rounded-2xl shadow-card overflow-hidden h-[calc(100vh-8rem)] lg:h-[calc(100vh-6rem)] flex animate-slide-up" data-tour="messages-page">
        {/* Conversation list */}
        <div className={`w-full sm:w-80 border-r border-slate-100 flex-col ${mobileShowChat ? 'hidden sm:flex' : 'flex'}`}>
          <div className="p-4 border-b border-slate-100">
            <h2 className="text-lg font-bold text-slate-800 mb-3">Messages</h2>
            <div className="relative">
              <input
                type="text"
                placeholder="Search conversations..."
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-50 border border-slate-100 text-sm text-slate-700 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-primary/20"
              />
              <svg className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto">
            {CONVERSATIONS.map((conv) => (
              <button
                key={conv.id}
                onClick={() => selectConversation(conv.id)}
                className={`w-full flex items-center gap-3 p-4 hover:bg-slate-50 transition-colors text-left border-b border-slate-50 ${
                  activeId === conv.id ? 'bg-brand-primary/5 border-l-2 border-l-brand-primary' : ''
                }`}
              >
                <div className="relative flex-shrink-0">
                  <img src={conv.avatar} alt={conv.name} className="w-12 h-12 rounded-full object-cover" />
                  {conv.isGroup && (
                    <span className="absolute -bottom-0.5 -right-0.5 w-4 h-4 bg-brand-secondary rounded-full flex items-center justify-center text-[8px] text-white">
                      {conv.members.length}
                    </span>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <h3 className="font-semibold text-slate-800 text-sm truncate">{conv.name}</h3>
                    <span className="text-xs text-slate-400 flex-shrink-0">{conv.lastMessageTime}</span>
                  </div>
                  <p className="text-xs text-slate-500 truncate mt-0.5">{conv.lastMessage}</p>
                </div>
                {conv.unread > 0 && (
                  <span className="flex-shrink-0 w-5 h-5 bg-brand-primary text-white text-xs font-bold rounded-full flex items-center justify-center">
                    {conv.unread}
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Chat area */}
        <div className={`flex-1 flex-col ${mobileShowChat ? 'flex' : 'hidden sm:flex'}`}>
          {/* Chat header */}
          <div className="p-4 border-b border-slate-100 flex items-center gap-3">
            <button
              onClick={() => setMobileShowChat(false)}
              className="sm:hidden p-2 rounded-lg hover:bg-slate-100 text-slate-500"
              aria-label="Back"
            >
              ←
            </button>
            <img src={activeConversation.avatar} alt="" className="w-10 h-10 rounded-full object-cover" />
            <div>
              <h3 className="font-semibold text-slate-800">{activeConversation.name}</h3>
              <p className="text-xs text-emerald-600">
                {activeConversation.isGroup ? `${activeConversation.members.length} members` : 'Online'}
              </p>
            </div>
            <div className="ml-auto flex gap-2">
              <button className="p-2 rounded-xl hover:bg-slate-100 text-slate-500" aria-label="Video call">📹</button>
              <button className="p-2 rounded-xl hover:bg-slate-100 text-slate-500" aria-label="Voice call">📞</button>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50/50">
            {activeConversation.messages.map((msg) => {
              const sender = getMemberById(msg.senderId);
              const isMe = msg.senderId === 'm3';
              return (
                <div key={msg.id} className={`flex gap-3 ${isMe ? 'flex-row-reverse' : ''}`}>
                  {!isMe && sender && (
                    <img src={sender.avatar} alt={sender.name} className="w-8 h-8 rounded-full object-cover flex-shrink-0 mt-1" />
                  )}
                  <div className={`max-w-[75%] ${isMe ? 'items-end' : ''}`}>
                    {!isMe && sender && (
                      <p className="text-xs text-slate-500 mb-1 ml-1">{sender.name}</p>
                    )}
                    <div className={`px-4 py-2.5 rounded-2xl text-sm leading-relaxed ${
                      isMe
                        ? 'bg-gradient-brand text-white rounded-br-md'
                        : 'bg-white text-slate-700 shadow-soft rounded-bl-md border border-slate-100'
                    }`}>
                      {msg.content}
                    </div>
                    <p className={`text-[10px] text-slate-400 mt-1 ${isMe ? 'text-right mr-1' : 'ml-1'}`}>
                      {msg.timestamp}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Input */}
          <div className="p-4 border-t border-slate-100 bg-white">
            <div className="flex items-center gap-3">
              <button className="p-2 rounded-xl hover:bg-slate-100 text-slate-500" aria-label="Attach">📎</button>
              <input
                type="text"
                value={messageInput}
                onChange={(e) => setMessageInput(e.target.value)}
                placeholder="Type a message..."
                className="flex-1 px-4 py-3 rounded-xl bg-slate-50 border border-slate-100 text-sm text-slate-700 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-primary/20"
              />
              <button
                className="p-3 rounded-xl bg-gradient-brand text-white shadow-soft hover:shadow-glow transition-all disabled:opacity-50"
                disabled={!messageInput.trim()}
                aria-label="Send"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
