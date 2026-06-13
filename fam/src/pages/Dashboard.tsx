import { AppLayout } from '../components/layout/AppLayout';
import { FeedPost } from '../components/ui/FeedPost';
import { DashboardSidebar } from '../components/ui/DashboardSidebar';
import { CURRENT_USER, POSTS } from '../constants/mockData';

export function Dashboard() {
  return (
    <AppLayout rightPanel={<DashboardSidebar />}>
      {/* Welcome banner */}
      <div className="glass-dark rounded-2xl p-6 mb-6 shadow-soft bg-gradient-to-r from-brand-primary/5 via-brand-secondary/5 to-brand-accent/5 animate-slide-up">
        <div className="flex items-center gap-4">
          <img src={CURRENT_USER.avatar} alt={CURRENT_USER.name} className="w-14 h-14 rounded-full object-cover ring-2 ring-brand-primary/20" />
          <div>
            <h2 className="text-xl font-bold text-slate-800">
              Good morning, {CURRENT_USER.name.split(' ')[0]}! 👋
            </h2>
            <p className="text-slate-500 text-sm">Here's what's happening in The Salian Family today.</p>
          </div>
        </div>
      </div>

      {/* Create post */}
      <div className="glass-dark rounded-2xl p-4 mb-6 shadow-soft">
        <div className="flex items-center gap-3">
          <img src={CURRENT_USER.avatar} alt="" className="w-10 h-10 rounded-full object-cover" />
          <button className="flex-1 text-left px-4 py-3 rounded-xl bg-slate-50 text-slate-400 text-sm hover:bg-slate-100 transition-colors">
            Share a memory with your family...
          </button>
          <button className="p-2.5 rounded-xl bg-brand-primary/10 text-brand-primary hover:bg-brand-primary/20 transition-colors" aria-label="Add photo">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </button>
        </div>
      </div>

      {/* Feed */}
      <div className="space-y-6" data-tour="dashboard-feed">
        {POSTS.map((post) => (
          <FeedPost key={post.id} post={post} />
        ))}
      </div>
    </AppLayout>
  );
}
