import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { FoodTheme, foodThemes, defaultTheme } from '@/themes/foodThemes';

const STORAGE_KEY = 'food-store-theme';

const loadGoogleFont = (fontName: string) => {
  const id = `gfont-${fontName.replace(/\s+/g, '-').toLowerCase()}`;
  if (!document.getElementById(id)) {
    const link = document.createElement('link');
    link.id = id;
    link.rel = 'stylesheet';
    link.href = `https://fonts.googleapis.com/css2?family=${encodeURIComponent(fontName)}:wght@400;600;700;800&display=swap`;
    document.head.appendChild(link);
  }
};

type ThemeContextType = {
  theme: FoodTheme;
  setTheme: (theme: FoodTheme) => void;
  isTransitioning: boolean;
  allThemes: FoodTheme[];
};

const ThemeContext = createContext<ThemeContextType>({
  theme: defaultTheme,
  setTheme: () => {},
  isTransitioning: false,
  allThemes: foodThemes,
});

export const useTheme = () => useContext(ThemeContext);

const getInitialTheme = (): FoodTheme => {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      const found = foodThemes.find(t => t.id === parsed.id);
      if (found) return found;
    }
  } catch {}
  return defaultTheme;
};

const applyThemeVars = (theme: FoodTheme, el: HTMLElement) => {
  const s = el.style as any;
  s.setProperty('--theme-bg', theme.colors.background);
  s.setProperty('--theme-surface', theme.colors.surface);
  s.setProperty('--theme-surface-hover', theme.colors.surfaceHover);
  s.setProperty('--theme-primary', theme.colors.primary);
  s.setProperty('--theme-primary-fg', theme.colors.primaryForeground);
  s.setProperty('--theme-accent', theme.colors.accent);
  s.setProperty('--theme-highlight', theme.colors.highlight);
  s.setProperty('--theme-border', theme.colors.border);
  s.setProperty('--theme-text', theme.colors.text);
  s.setProperty('--theme-text-muted', theme.colors.textMuted);
  s.setProperty('--theme-font-display', `'${theme.fonts.display}', serif`);
  s.setProperty('--theme-font-body', `'${theme.fonts.body}', sans-serif`);
  s.setProperty('--theme-radius', theme.layout.borderRadius);
  el.setAttribute('data-food-theme', theme.id);
};

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setThemeState] = useState<FoodTheme>(getInitialTheme);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [pendingTheme, setPendingTheme] = useState<FoodTheme | null>(null);

  // Apply theme to root on mount and on change
  useEffect(() => {
    applyThemeVars(theme, document.documentElement);
    loadGoogleFont(theme.fonts.display);
    loadGoogleFont(theme.fonts.body);
  }, [theme]);

  const setTheme = useCallback((newTheme: FoodTheme) => {
    setPendingTheme(newTheme);
    setIsTransitioning(true);
    loadGoogleFont(newTheme.fonts.display);
    loadGoogleFont(newTheme.fonts.body);
    setTimeout(() => {
      setThemeState(newTheme);
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ id: newTheme.id }));
      setTimeout(() => {
        setIsTransitioning(false);
        setPendingTheme(null);
      }, 250);
    }, 225);
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, setTheme, isTransitioning, allThemes: foodThemes }}>
      {isTransitioning && pendingTheme && (
        <div
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center"
          style={{ backgroundColor: pendingTheme.colors.background }}
        >
          <div
            className="text-8xl mb-6"
            style={{ animation: 'themePulse 0.45s ease-in-out' }}
          >
            {pendingTheme.emoji}
          </div>
          <p
            className="text-2xl font-bold"
            style={{ color: pendingTheme.colors.primary, fontFamily: `'${pendingTheme.fonts.display}', serif` }}
          >
            Switching to {pendingTheme.name}...
          </p>
          <style>{`
            @keyframes themePulse {
              0%   { transform: scale(0.5); opacity: 0; }
              60%  { transform: scale(1.2); opacity: 1; }
              100% { transform: scale(1);   opacity: 1; }
            }
            @keyframes themeSwap {
              0%   { opacity: 1;   transform: scale(1);    filter: blur(0px); }
              35%  { opacity: 0;   transform: scale(0.97); filter: blur(4px); }
              65%  { opacity: 0;   transform: scale(1.01); filter: blur(4px); }
              100% { opacity: 1;   transform: scale(1);    filter: blur(0px); }
            }
            .theme-swap-enter {
              animation: themeSwap 0.45s cubic-bezier(0.4, 0, 0.2, 1);
            }
          `}</style>
        </div>
      )}
      <div className={isTransitioning ? '' : 'theme-swap-enter'} key={theme.id}>
        {children}
      </div>
    </ThemeContext.Provider>
  );
};
