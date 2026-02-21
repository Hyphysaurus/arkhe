import { useEffect, useState } from 'react';
import { Command, X } from 'lucide-react';

interface Shortcut {
  keys: string[];
  description: string;
}

const shortcuts: Shortcut[] = [
  { keys: ['⌘', 'K'], description: 'Quick search' },
  { keys: ['⌘', 'N'], description: 'New project' },
  { keys: ['⌘', 'D'], description: 'Go to dashboard' },
  { keys: ['⌘', 'A'], description: 'Go to analytics' },
  { keys: ['⌘', 'T'], description: 'Change theme' },
  { keys: ['⌘', '/'], description: 'Show shortcuts' },
  { keys: ['ESC'], description: 'Close modal' }
];

interface KeyboardShortcutsProps {
  isOpen: boolean;
  onClose: () => void;
}

export function KeyboardShortcuts({ isOpen, onClose }: KeyboardShortcutsProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/80" onClick={onClose} />
      <div className="relative bg-slate-900 border border-slate-800 rounded-2xl p-8 max-w-2xl w-full">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-cyan-500 to-teal-500 rounded-lg flex items-center justify-center">
              <Command className="w-5 h-5 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-white">Keyboard Shortcuts</h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-white transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          {shortcuts.map((shortcut, i) => (
            <div
              key={i}
              className="flex items-center justify-between p-4 bg-slate-800/50 border border-slate-700 rounded-lg"
            >
              <span className="text-slate-300">{shortcut.description}</span>
              <div className="flex items-center gap-1">
                {shortcut.keys.map((key, j) => (
                  <kbd
                    key={j}
                    className="px-2 py-1 bg-slate-700 border border-slate-600 rounded text-xs font-mono text-white"
                  >
                    {key}
                  </kbd>
                ))}
              </div>
            </div>
          ))}
        </div>

        <p className="mt-6 text-sm text-slate-400 text-center">
          Press <kbd className="px-2 py-1 bg-slate-800 border border-slate-700 rounded text-xs font-mono">ESC</kbd> to close
        </p>
      </div>
    </div>
  );
}

export function useKeyboardShortcuts(onNewProject: () => void, onNavigate: (path: string) => void) {
  const [showShortcuts, setShowShortcuts] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const isMac = navigator.platform.toUpperCase().indexOf('MAC') >= 0;
      const modKey = isMac ? e.metaKey : e.ctrlKey;

      if (modKey && e.key === 'k') {
        e.preventDefault();
      }

      if (modKey && e.key === 'n') {
        e.preventDefault();
        onNewProject();
      }

      if (modKey && e.key === 'd') {
        e.preventDefault();
        onNavigate('/dashboard');
      }

      if (modKey && e.key === 'a') {
        e.preventDefault();
        onNavigate('/analytics');
      }

      if (modKey && e.key === '/') {
        e.preventDefault();
        setShowShortcuts(true);
      }

      if (e.key === 'Escape') {
        setShowShortcuts(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onNewProject, onNavigate]);

  return { showShortcuts, setShowShortcuts };
}
