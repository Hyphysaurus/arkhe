import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export const THEMES = {
  cyber: {
    name: 'Cyber',
    primary: '#00FFB2',
    secondary: '#00D4FF',
    accent: '#B362FF',
    bg: '#0A0A1B',
    surface: 'rgba(255,255,255,0.02)',
    border: 'rgba(255,255,255,0.06)',
    gradient: 'from-cyan-500 to-teal-500',
    gradientHover: 'hover:shadow-cyan-500/50',
    ring: 'ring-cyan-500',
    text: 'text-cyan-400'
  },
  sunset: {
    name: 'Sunset',
    primary: '#FF6B6B',
    secondary: '#FFD166',
    accent: '#FF8787',
    bg: '#1A0F0F',
    surface: 'rgba(255,107,107,0.05)',
    border: 'rgba(255,107,107,0.1)',
    gradient: 'from-orange-500 to-red-500',
    gradientHover: 'hover:shadow-orange-500/50',
    ring: 'ring-orange-500',
    text: 'text-orange-400'
  },
  forest: {
    name: 'Forest',
    primary: '#10B981',
    secondary: '#34D399',
    accent: '#059669',
    bg: '#0A1A0F',
    surface: 'rgba(16,185,129,0.05)',
    border: 'rgba(16,185,129,0.1)',
    gradient: 'from-green-500 to-emerald-500',
    gradientHover: 'hover:shadow-green-500/50',
    ring: 'ring-green-500',
    text: 'text-green-400'
  },
  ocean: {
    name: 'Ocean',
    primary: '#3B82F6',
    secondary: '#60A5FA',
    accent: '#2563EB',
    bg: '#0A0F1A',
    surface: 'rgba(59,130,246,0.05)',
    border: 'rgba(59,130,246,0.1)',
    gradient: 'from-blue-500 to-indigo-500',
    gradientHover: 'hover:shadow-blue-500/50',
    ring: 'ring-blue-500',
    text: 'text-blue-400'
  },
  purple: {
    name: 'Purple Haze',
    primary: '#A855F7',
    secondary: '#C084FC',
    accent: '#9333EA',
    bg: '#130A1A',
    surface: 'rgba(168,85,247,0.05)',
    border: 'rgba(168,85,247,0.1)',
    gradient: 'from-purple-500 to-pink-500',
    gradientHover: 'hover:shadow-purple-500/50',
    ring: 'ring-purple-500',
    text: 'text-purple-400'
  },
  monochrome: {
    name: 'Monochrome',
    primary: '#FFFFFF',
    secondary: '#E5E7EB',
    accent: '#9CA3AF',
    bg: '#0A0A0A',
    surface: 'rgba(255,255,255,0.03)',
    border: 'rgba(255,255,255,0.08)',
    gradient: 'from-slate-400 to-slate-600',
    gradientHover: 'hover:shadow-slate-500/50',
    ring: 'ring-slate-500',
    text: 'text-slate-400'
  }
};

interface ThemeContextType {
  theme: keyof typeof THEMES;
  setTheme: (theme: keyof typeof THEMES) => void;
  currentTheme: typeof THEMES[keyof typeof THEMES];
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<keyof typeof THEMES>('cyber');

  useEffect(() => {
    const saved = localStorage.getItem('arkhe-theme') as keyof typeof THEMES;
    if (saved && THEMES[saved]) {
      setTheme(saved);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('arkhe-theme', theme);
    const currentTheme = THEMES[theme];
    document.documentElement.style.setProperty('--color-primary', currentTheme.primary);
    document.documentElement.style.setProperty('--color-secondary', currentTheme.secondary);
    document.documentElement.style.setProperty('--color-accent', currentTheme.accent);
    document.body.style.backgroundColor = currentTheme.bg;
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme, currentTheme: THEMES[theme] }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}
