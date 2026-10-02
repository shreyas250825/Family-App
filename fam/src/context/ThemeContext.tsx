import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react';

export type ThemePalette = 'blush' | 'ocean' | 'sunset' | 'classic';
export type ThemeAppearance = 'light' | 'dark';

const PALETTE_KEY = 'famzee-demo-palette';
const APPEARANCE_KEY = 'famzee-demo-appearance';

export const PALETTE_OPTIONS: { id: ThemePalette; name: string; blurb: string }[] = [
  { id: 'blush', name: 'Blush & Sky', blurb: 'Pink, lavender, and sky blue' },
  { id: 'ocean', name: 'Ocean Breeze', blurb: 'Teal, blue, and light aqua' },
  { id: 'sunset', name: 'Sunset Family', blurb: 'Warm orange, gold, and pink' },
  { id: 'classic', name: 'Classic', blurb: 'White, soft gray, and blue' },
];

interface ThemeContextValue {
  palette: ThemePalette;
  appearance: ThemeAppearance;
  setPalette: (palette: ThemePalette) => void;
  setAppearance: (appearance: ThemeAppearance) => void;
  toggleAppearance: () => void;
}

const ThemeContext = createContext<ThemeContextValue | null>(null);

function readStored<T extends string>(key: string, fallback: T, allowed: T[]): T {
  try {
    const value = localStorage.getItem(key) as T | null;
    if (value && allowed.includes(value)) return value;
  } catch {
    /* demo localStorage only */
  }
  return fallback;
}

function applyTheme(palette: ThemePalette, appearance: ThemeAppearance) {
  const root = document.documentElement;
  root.setAttribute('data-palette', palette);
  root.setAttribute('data-appearance', appearance);
  root.style.colorScheme = appearance;
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [palette, setPaletteState] = useState<ThemePalette>(() =>
    readStored(PALETTE_KEY, 'blush', ['blush', 'ocean', 'sunset', 'classic'])
  );
  const [appearance, setAppearanceState] = useState<ThemeAppearance>(() =>
    readStored(APPEARANCE_KEY, 'light', ['light', 'dark'])
  );

  useEffect(() => {
    applyTheme(palette, appearance);
  }, [palette, appearance]);

  const setPalette = useCallback((next: ThemePalette) => {
    setPaletteState(next);
    try {
      localStorage.setItem(PALETTE_KEY, next);
    } catch {
      /* ignore */
    }
  }, []);

  const setAppearance = useCallback((next: ThemeAppearance) => {
    setAppearanceState(next);
    try {
      localStorage.setItem(APPEARANCE_KEY, next);
    } catch {
      /* ignore */
    }
  }, []);

  const toggleAppearance = useCallback(() => {
    setAppearance(appearance === 'light' ? 'dark' : 'light');
  }, [appearance, setAppearance]);

  const value = useMemo(
    () => ({ palette, appearance, setPalette, setAppearance, toggleAppearance }),
    [palette, appearance, setPalette, setAppearance, toggleAppearance]
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error('useTheme must be used within ThemeProvider');
  return ctx;
}
