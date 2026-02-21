import { useState } from 'react';
import { Palette, Check } from 'lucide-react';
import { useTheme, THEMES } from '../context/ThemeContext';

export function ThemeSwitcher() {
  const { theme, setTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 bg-slate-900/50 border border-slate-800 rounded-lg hover:border-slate-700 transition"
        title="Change theme"
      >
        <Palette className="w-5 h-5 text-slate-400" />
      </button>

      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-40"
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute right-0 top-12 z-50 w-64 p-3 bg-slate-900 border border-slate-800 rounded-xl shadow-2xl">
            <p className="text-xs font-semibold text-slate-400 uppercase mb-3 px-2">Theme</p>
            <div className="space-y-1">
              {(Object.keys(THEMES) as Array<keyof typeof THEMES>).map((key) => {
                const t = THEMES[key];
                return (
                  <button
                    key={key}
                    onClick={() => {
                      setTheme(key);
                      setIsOpen(false);
                    }}
                    className={`w-full flex items-center gap-3 p-3 rounded-lg transition ${
                      theme === key
                        ? 'bg-slate-800 border border-slate-700'
                        : 'hover:bg-slate-800/50'
                    }`}
                  >
                    <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${t.gradient}`} />
                    <span className="flex-1 text-left text-sm font-medium text-white">
                      {t.name}
                    </span>
                    {theme === key && (
                      <Check className="w-4 h-4 text-green-400" />
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
