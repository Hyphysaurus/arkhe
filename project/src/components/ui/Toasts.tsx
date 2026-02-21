import { CheckCircle, Info, AlertTriangle, XCircle, Sparkles } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { useTheme } from '../../context/ThemeContext';

export function Toasts() {
  const { toasts, dismissToast } = useApp();
  const { currentTheme } = useTheme();

  const getToastStyles = (type: string) => {
    switch (type) {
      case 'success':
        return 'border-green-500/50 bg-gradient-to-r from-green-900/80 to-green-800/60';
      case 'error':
        return 'border-red-500/50 bg-gradient-to-r from-red-900/80 to-red-800/60';
      case 'warning':
        return 'border-yellow-500/50 bg-gradient-to-r from-yellow-900/80 to-yellow-800/60';
      case 'info':
        return 'border-blue-500/50 bg-gradient-to-r from-blue-900/80 to-blue-800/60';
      default:
        return 'border-slate-700 bg-gradient-to-r from-slate-900 to-slate-800';
    }
  };

  const getToastIcon = (type: string) => {
    switch (type) {
      case 'success':
        return <CheckCircle className="w-5 h-5 text-green-400" />;
      case 'error':
        return <XCircle className="w-5 h-5 text-red-400" />;
      case 'warning':
        return <AlertTriangle className="w-5 h-5 text-yellow-400" />;
      case 'info':
        return <Info className="w-5 h-5 text-blue-400" />;
      default:
        return <Sparkles className="w-5 h-5 text-cyan-400" />;
    }
  };

  return (
    <div className="fixed top-4 right-4 z-50 space-y-3 max-w-md">
      {toasts.map(toast => (
        <div
          key={toast.id}
          className={`animate-slideIn ${getToastStyles(toast.type)} border rounded-xl px-5 py-4 shadow-2xl backdrop-blur-xl cursor-pointer group relative overflow-hidden`}
          onClick={() => dismissToast(toast.id)}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-white/5 via-white/10 to-white/5 opacity-0 group-hover:opacity-100 transition-opacity shimmer-effect" />

          {toast.type === 'xp' && (
            <div className="flex items-center gap-3 relative z-10">
              <div className={`flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-br ${currentTheme.gradient} flex items-center justify-center shadow-lg`}>
                <span className="text-white font-bold text-sm">+{toast.xp}</span>
              </div>
              <div className="flex-1">
                <p className="text-sm font-semibold text-white">{toast.message}</p>
                <p className={`text-xs ${currentTheme.text} font-medium`}>+{toast.xp} XP Earned</p>
              </div>
              <Sparkles className={`w-5 h-5 ${currentTheme.text} animate-pulse`} />
            </div>
          )}

          {toast.type === 'achievement' && toast.achievement && (
            <div className="flex items-center gap-3 relative z-10">
              <div
                className="flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center text-2xl shadow-lg ring-2 ring-white/20"
                style={{ backgroundColor: `${toast.achievement.color}30` }}
              >
                {toast.achievement.icon}
              </div>
              <div className="flex-1">
                <p className="text-xs font-bold text-yellow-400 uppercase tracking-wider mb-0.5">
                  🏆 Achievement Unlocked!
                </p>
                <p className="text-sm font-bold text-white">{toast.message}</p>
                <p className="text-xs text-slate-400 mt-0.5">{toast.achievement.description}</p>
              </div>
            </div>
          )}

          {(toast.type === 'success' || toast.type === 'error' || toast.type === 'warning' || toast.type === 'info') && (
            <div className="flex items-center gap-3 relative z-10">
              <div className="flex-shrink-0">
                {getToastIcon(toast.type)}
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-white">{toast.message}</p>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

export function showToast(
  message: string,
  type: 'success' | 'error' | 'warning' | 'info' = 'info'
) {
  return { message, type, id: Date.now().toString() };
}
