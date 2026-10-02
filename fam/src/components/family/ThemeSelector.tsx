import { PALETTE_OPTIONS, useTheme } from '../../context/ThemeContext';

export function ThemeSelector({ compact = false }: { compact?: boolean }) {
  const { palette, appearance, setPalette, setAppearance, toggleAppearance } = useTheme();

  return (
    <div className={compact ? 'space-y-3' : 'space-y-5'}>
      <div className="flex items-center justify-between gap-3">
        <div>
          <p className="text-sm font-semibold">Appearance</p>
          <p className="fam-muted text-xs">Light and dark for every palette</p>
        </div>
        <button type="button" onClick={toggleAppearance} className="fam-btn text-xs">
          {appearance === 'light' ? 'Switch to dark' : 'Switch to light'}
        </button>
      </div>
      <div className="grid grid-cols-2 gap-2">
        {(['light', 'dark'] as const).map((mode) => (
          <button
            key={mode}
            type="button"
            onClick={() => setAppearance(mode)}
            className={`rounded-2xl border px-3 py-3 text-left text-sm capitalize transition ${
              appearance === mode ? 'border-transparent' : ''
            }`}
            style={{
              borderColor: appearance === mode ? 'var(--primary)' : 'var(--border)',
              background: appearance === mode ? 'var(--primary-soft)' : 'var(--elevated)',
            }}
          >
            {mode} theme
          </button>
        ))}
      </div>
      <div>
        <p className="mb-2 text-sm font-semibold">Color story</p>
        <div className="grid gap-2 sm:grid-cols-2">
          {PALETTE_OPTIONS.map((option) => (
            <button
              key={option.id}
              type="button"
              onClick={() => setPalette(option.id)}
              className="rounded-2xl border p-3 text-left transition"
              style={{
                borderColor: palette === option.id ? 'var(--primary)' : 'var(--border)',
                background: palette === option.id ? 'var(--primary-soft)' : 'var(--elevated)',
              }}
            >
              <p className="text-sm font-medium">{option.name}</p>
              <p className="fam-muted mt-0.5 text-xs">{option.blurb}</p>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
