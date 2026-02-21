import { Lock } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { ACHIEVEMENTS } from '../data/constants';

export function Achievements() {
  const { profile } = useApp();

  return (
    <div className="p-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-2 font-mono">Achievements</h1>
          <p className="text-slate-400">
            {profile.achievements.length} of {ACHIEVEMENTS.length} unlocked
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {ACHIEVEMENTS.map((achievement) => {
            const isUnlocked = profile.achievements.includes(achievement.key);

            return (
              <div
                key={achievement.key}
                className={`relative p-6 rounded-2xl border transition ${
                  isUnlocked
                    ? 'bg-slate-900/50 border-slate-700'
                    : 'bg-slate-900/20 border-slate-800 opacity-60'
                }`}
              >
                {isUnlocked && (
                  <div
                    className="absolute inset-0 rounded-2xl opacity-10"
                    style={{ backgroundColor: achievement.color }}
                  />
                )}

                <div className="relative">
                  <div
                    className={`w-16 h-16 rounded-2xl flex items-center justify-center text-4xl mb-4 ${
                      isUnlocked ? '' : 'grayscale opacity-50'
                    }`}
                    style={isUnlocked ? { backgroundColor: `${achievement.color}20` } : {}}
                  >
                    {isUnlocked ? achievement.icon : <Lock className="w-8 h-8 text-slate-600" />}
                  </div>

                  <h3
                    className={`text-xl font-bold mb-2 ${
                      isUnlocked ? 'text-white' : 'text-slate-600'
                    }`}
                  >
                    {achievement.title}
                  </h3>

                  <p
                    className={`text-sm ${
                      isUnlocked ? 'text-slate-400' : 'text-slate-600'
                    }`}
                  >
                    {achievement.desc}
                  </p>

                  {isUnlocked && (
                    <div className="mt-4 px-3 py-1 bg-green-500/20 border border-green-500/50 rounded-full inline-block">
                      <span className="text-xs font-semibold text-green-400">Unlocked</span>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-12 p-8 bg-gradient-to-br from-slate-900 to-slate-800 border border-slate-700 rounded-2xl">
          <h2 className="text-2xl font-bold text-white mb-4">How to Unlock Achievements</h2>
          <div className="grid md:grid-cols-2 gap-4 text-sm text-slate-400">
            <div>
              <p className="mb-2">🚀 <strong className="text-white">First Ship:</strong> Complete 100% of project checklist</p>
              <p className="mb-2">✨ <strong className="text-white">Clean Code:</strong> Get a 9+ code review score</p>
              <p className="mb-2">💰 <strong className="text-white">Profit Mode:</strong> Earn more than you spend</p>
              <p className="mb-2">🦅 <strong className="text-white">Budget Hawk:</strong> Complete project under budget</p>
              <p className="mb-2">⚡ <strong className="text-white">Speed Demon:</strong> Ship a project in 7 days</p>
              <p>�� <strong className="text-white">Diversified:</strong> Create 5+ projects</p>
            </div>
            <div>
              <p className="mb-2">🪙 <strong className="text-white">Penny Pincher:</strong> Complete project under $10</p>
              <p className="mb-2">🔥 <strong className="text-white">On Fire:</strong> Maintain 3-day work streak</p>
              <p className="mb-2">🔥 <strong className="text-white">Streak Week:</strong> Maintain 7-day streak</p>
              <p className="mb-2">👑 <strong className="text-white">Streak Lord:</strong> Maintain 30-day streak</p>
              <p className="mb-2">🔍 <strong className="text-white">Code Critic:</strong> Complete 10 code reviews</p>
              <p>💸 <strong className="text-white">Investor:</strong> Spend $500+ across all projects</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
