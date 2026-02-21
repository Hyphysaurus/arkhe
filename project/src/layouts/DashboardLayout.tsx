import { useState } from 'react';
import { Outlet, Link, useNavigate, useLocation } from 'react-router-dom';
import { Sparkles, LayoutDashboard, BarChart3, Trophy, Settings, Plus, Command, Plug, Code2, BookOpen } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { useTheme } from '../context/ThemeContext';
import { getLevel, getNextLevel, getLevelProgress } from '../data/constants';
import { Toasts } from '../components/ui/Toasts';
import { ThemeSwitcher } from '../components/ThemeSwitcher';
import { KeyboardShortcuts, useKeyboardShortcuts } from '../components/KeyboardShortcuts';

export function DashboardLayout() {
  const { profile } = useApp();
  const { currentTheme } = useTheme();
  const navigate = useNavigate();
  const location = useLocation();
  const currentLevel = getLevel(profile.xp);
  const nextLevel = getNextLevel(profile.xp);
  const progress = getLevelProgress(profile.xp);

  const [showNewProjectModal, setShowNewProjectModal] = useState(false);

  const { showShortcuts, setShowShortcuts } = useKeyboardShortcuts(
    () => setShowNewProjectModal(true),
    (path) => navigate(path)
  );

  const navItems = [
    { path: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
    { path: '/analytics', icon: BarChart3, label: 'Analytics' },
    { path: '/achievements', icon: Trophy, label: 'Achievements' },
    { path: '/integrations', icon: Plug, label: 'Integrations' },
    { path: '/snippets', icon: Code2, label: 'Snippets' },
    { path: '/learn', icon: BookOpen, label: 'Learn' },
    { path: '/settings', icon: Settings, label: 'Settings' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(0,255,178,0.05),transparent_50%)] pointer-events-none" />

      <header className="relative border-b border-slate-800 bg-slate-950/50 backdrop-blur">
        <div className="max-w-7xl mx-auto px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-8">
              <Link to="/dashboard" className="flex items-center gap-3 group">
                <div className={`w-10 h-10 bg-gradient-to-br ${currentTheme.gradient} rounded-lg flex items-center justify-center group-hover:shadow-lg ${currentTheme.gradientHover} transition relative overflow-hidden`}>
                  <div className="absolute inset-0 bg-gradient-to-br from-white/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  <Sparkles className="w-5 h-5 text-white relative z-10" />
                </div>
                <div>
                  <h1 className="text-xl font-bold text-white font-mono tracking-wider relative group-hover:scale-105 transition-transform">
                    <span className="bg-gradient-to-r from-white via-slate-100 to-white bg-clip-text text-transparent">
                      ΑΡΧΗ
                    </span>
                  </h1>
                  <p className="text-xs text-slate-400">The First Principle</p>
                </div>
              </Link>

              <nav className="flex items-center gap-1">
                {navItems.map((item) => {
                  const isActive = location.pathname === item.path;
                  return (
                    <Link
                      key={item.path}
                      to={item.path}
                      className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition ${
                        isActive
                          ? `bg-slate-800 ${currentTheme.text}`
                          : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
                      }`}
                    >
                      <item.icon className="w-4 h-4" />
                      {item.label}
                    </Link>
                  );
                })}
              </nav>
            </div>

            <div className="flex items-center gap-4">
              <button
                onClick={() => setShowNewProjectModal(true)}
                className={`group flex items-center gap-2 px-4 py-2 bg-gradient-to-r ${currentTheme.gradient} text-white font-semibold rounded-lg hover:shadow-lg ${currentTheme.gradientHover} transition relative overflow-hidden obsidian-button`}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-700" />
                <Plus className="w-4 h-4 relative z-10" />
                <span className="relative z-10">New</span>
              </button>

              {profile.streak_days > 0 && (
                <div className="flex items-center gap-2 px-3 py-1 bg-orange-500/20 border border-orange-500/50 rounded-full">
                  <span className="text-orange-400 text-lg">🔥</span>
                  <span className="text-sm font-bold text-orange-400">{profile.streak_days}</span>
                </div>
              )}

              <div className="flex items-center gap-3">
                <div className="text-right">
                  <p className="text-xs text-slate-400">Level {currentLevel.level}</p>
                  <p className="text-sm font-bold" style={{ color: currentLevel.color }}>
                    {currentLevel.title}
                  </p>
                </div>
                <div className="w-32 h-2 bg-slate-800 rounded-full overflow-hidden">
                  <div
                    className={`h-full bg-gradient-to-r ${currentTheme.gradient} transition-all duration-500`}
                    style={{ width: `${progress}%` }}
                  />
                </div>
                <p className="text-sm font-mono text-slate-400">
                  {profile.xp}
                  {nextLevel && <span className="text-slate-600"> / {nextLevel.xp}</span>}
                </p>
              </div>

              <ThemeSwitcher />

              <button
                onClick={() => setShowShortcuts(true)}
                className="p-2 bg-slate-900/50 border border-slate-800 rounded-lg hover:border-slate-700 transition"
                title="Keyboard shortcuts"
              >
                <Command className="w-5 h-5 text-slate-400" />
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="relative">
        <Outlet context={{ showNewProjectModal, setShowNewProjectModal }} />
      </main>

      <Toasts />
      <KeyboardShortcuts isOpen={showShortcuts} onClose={() => setShowShortcuts(false)} />
    </div>
  );
}
