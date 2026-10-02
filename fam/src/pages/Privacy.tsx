export function Privacy() {
  return (
    <div className="min-h-screen px-6 py-24" style={{ background: 'var(--bg)', color: 'var(--text)' }}>
      <div className="max-w-2xl mx-auto prose prose-neutral">
        <a href="/" className="text-sm text-neutral-500 hover:text-neutral-900 no-underline">← Back to FamZee</a>
        <h1 className="text-3xl font-bold mt-6 mb-4">Privacy Policy</h1>
        <p className="text-neutral-500 text-sm mb-8">Last updated: August 2026</p>
        <p>FamZee is designed as a private space for families. We minimize data collection and give you control over your family&apos;s content.</p>
        <h2 className="text-xl font-semibold mt-8 mb-2">What we collect</h2>
        <p>Account information (name, email), family content you create (posts, photos, messages), and usage data needed to operate the service.</p>
        <h2 className="text-xl font-semibold mt-8 mb-2">Demo mode</h2>
        <p>In the web demo, data is stored in your browser&apos;s local storage and is not transmitted to our servers unless you use the mobile app with a connected backend.</p>
        <h2 className="text-xl font-semibold mt-8 mb-2">Your rights</h2>
        <p>You may delete your account and associated data at any time from Settings. Contact support@famzee.app for additional privacy requests.</p>
      </div>
    </div>
  );
}
