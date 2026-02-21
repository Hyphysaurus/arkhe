import { useState } from 'react';
import { Save, Download, Upload, Trash2, AlertCircle } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { useTheme, THEMES } from '../context/ThemeContext';

export default function Settings() {
  const { projects, profile } = useApp();
  const { theme, setTheme } = useTheme();
  const [exportSuccess, setExportSuccess] = useState(false);

  const handleExportData = () => {
    const data = {
      projects,
      profile,
      exportDate: new Date().toISOString(),
      version: '1.0'
    };

    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `arkhe-backup-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    setExportSuccess(true);
    setTimeout(() => setExportSuccess(false), 3000);
  };

  const handleClearData = () => {
    if (confirm('This will delete all your data. This action cannot be undone. Continue?')) {
      localStorage.clear();
      window.location.reload();
    }
  };

  return (
    <div className="p-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-2 font-mono">Settings</h1>
          <p className="text-slate-400">Manage your preferences and data</p>
        </div>

        <div className="space-y-6">
          <div className="bg-slate-900/30 border border-slate-800 rounded-xl p-6">
            <h2 className="text-xl font-bold text-white mb-4">Theme Preference</h2>
            <p className="text-slate-400 mb-6">Choose your preferred color scheme</p>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {(Object.keys(THEMES) as Array<keyof typeof THEMES>).map((key) => {
                const t = THEMES[key];
                return (
                  <button
                    key={key}
                    onClick={() => setTheme(key)}
                    className={`p-4 rounded-lg border-2 transition ${
                      theme === key
                        ? 'border-cyan-500 bg-slate-800'
                        : 'border-slate-800 bg-slate-900/50 hover:border-slate-700'
                    }`}
                  >
                    <div className={`w-full h-16 rounded-lg bg-gradient-to-br ${t.gradient} mb-3`} />
                    <p className="text-sm font-semibold text-white">{t.name}</p>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="bg-slate-900/30 border border-slate-800 rounded-xl p-6">
            <h2 className="text-xl font-bold text-white mb-4">Data Management</h2>
            <p className="text-slate-400 mb-6">Export, import, or delete your data</p>

            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-slate-800/50 rounded-lg">
                <div>
                  <p className="font-semibold text-white mb-1">Export Data</p>
                  <p className="text-sm text-slate-400">Download all your projects and progress as JSON</p>
                </div>
                <button
                  onClick={handleExportData}
                  className="flex items-center gap-2 px-4 py-2 bg-cyan-500/20 border border-cyan-500/50 text-cyan-400 font-semibold rounded-lg hover:bg-cyan-500/30 transition"
                >
                  <Download className="w-4 h-4" />
                  Export
                </button>
              </div>

              {exportSuccess && (
                <div className="p-4 bg-green-500/20 border border-green-500/50 rounded-lg flex items-center gap-3">
                  <AlertCircle className="w-5 h-5 text-green-400" />
                  <p className="text-sm text-green-400">Data exported successfully!</p>
                </div>
              )}

              <div className="flex items-center justify-between p-4 bg-slate-800/50 rounded-lg">
                <div>
                  <p className="font-semibold text-white mb-1">Import Data</p>
                  <p className="text-sm text-slate-400">Restore from a previous backup file</p>
                </div>
                <button
                  disabled
                  className="flex items-center gap-2 px-4 py-2 bg-slate-700 border border-slate-600 text-slate-400 font-semibold rounded-lg cursor-not-allowed opacity-50"
                >
                  <Upload className="w-4 h-4" />
                  Import
                </button>
              </div>

              <div className="flex items-center justify-between p-4 bg-red-500/10 border border-red-500/30 rounded-lg">
                <div>
                  <p className="font-semibold text-red-400 mb-1">Clear All Data</p>
                  <p className="text-sm text-slate-400">Permanently delete all projects and progress</p>
                </div>
                <button
                  onClick={handleClearData}
                  className="flex items-center gap-2 px-4 py-2 bg-red-500/20 border border-red-500/50 text-red-400 font-semibold rounded-lg hover:bg-red-500/30 transition"
                >
                  <Trash2 className="w-4 h-4" />
                  Clear
                </button>
              </div>
            </div>
          </div>

          <div className="bg-slate-900/30 border border-slate-800 rounded-xl p-6">
            <h2 className="text-xl font-bold text-white mb-4">Account</h2>
            <p className="text-slate-400 mb-6">Currently running in demo mode</p>

            <div className="p-6 bg-gradient-to-br from-cyan-500/10 to-teal-500/10 border border-cyan-500/30 rounded-lg">
              <h3 className="text-lg font-bold text-white mb-2">🚀 Coming Soon: Cloud Sync</h3>
              <p className="text-slate-400 mb-4">
                Sign up to sync your data across devices, collaborate with teams, and unlock Pro features.
              </p>
              <button
                disabled
                className="px-6 py-2 bg-slate-700 border border-slate-600 text-slate-400 font-semibold rounded-lg cursor-not-allowed"
              >
                Create Account (Soon)
              </button>
            </div>
          </div>

          <div className="bg-slate-900/30 border border-slate-800 rounded-xl p-6">
            <h2 className="text-xl font-bold text-white mb-4">About</h2>
            <div className="space-y-3 text-sm text-slate-400">
              <div className="flex items-center justify-between">
                <span>Version</span>
                <span className="font-mono text-white">1.0.0-demo</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Total Projects</span>
                <span className="font-mono text-white">{projects.length}</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Total XP</span>
                <span className="font-mono text-white">{profile.xp}</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Achievements</span>
                <span className="font-mono text-white">{profile.achievements.length}/12</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
