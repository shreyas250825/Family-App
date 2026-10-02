import { AppLayout } from '../components/layout/AppLayout';

export function FeatureDetailPage({
  title,
  copy,
}: {
  title: string;
  copy: string;
}) {
  return (
    <AppLayout title={title}>
      <div className="fam-hero max-w-2xl rounded-[1.75rem] border p-8" style={{ borderColor: 'var(--border)' }}>
        <p className="text-lg leading-relaxed">{copy}</p>
        <p className="mt-6 text-sm fam-muted">Demo preview — this space is ready for future family stories.</p>
        <button type="button" className="fam-btn-primary mt-6">Start a demo capsule</button>
      </div>
    </AppLayout>
  );
}
