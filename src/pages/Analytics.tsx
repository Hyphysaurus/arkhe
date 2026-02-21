import { useMemo } from 'react';
import { TrendingUp, TrendingDown, DollarSign, Target, Calendar, Award } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { PROJECT_STATUSES, getLevel } from '../data/constants';

export default function Analytics() {
  const { projects, profile } = useApp();

  const stats = useMemo(() => {
    const totalSpend = projects.reduce((sum, p) =>
      sum + p.costs.reduce((s, c) => s + c.amount, 0), 0
    );
    const totalRevenue = projects.reduce((sum, p) =>
      sum + p.revenues.reduce((s, r) => s + r.amount, 0), 0
    );
    const netPL = totalRevenue - totalSpend;
    const profitMargin = totalRevenue > 0 ? (netPL / totalRevenue) * 100 : 0;

    const projectsByStatus = PROJECT_STATUSES.map(status => ({
      status: status.label,
      count: projects.filter(p => p.status === status.key).length,
      color: status.color
    }));

    const avgShipReadiness = projects.length > 0
      ? projects.reduce((sum, p) => {
          const completed = Object.values(p.checklist).filter(Boolean).length;
          return sum + (completed / 22) * 100;
        }, 0) / projects.length
      : 0;

    const monthlyTrend = [];
    const now = new Date();
    for (let i = 5; i >= 0; i--) {
      const month = new Date(now.getFullYear(), now.getMonth() - i, 1);
      const monthStr = month.toISOString().slice(0, 7);

      const monthRevenue = projects.reduce((sum, p) =>
        sum + p.revenues
          .filter(r => r.date.startsWith(monthStr))
          .reduce((s, r) => s + r.amount, 0), 0
      );

      const monthCosts = projects.reduce((sum, p) =>
        sum + p.costs
          .filter(c => c.date.startsWith(monthStr))
          .reduce((s, c) => s + c.amount, 0), 0
      );

      monthlyTrend.push({
        month: month.toLocaleDateString('en-US', { month: 'short' }),
        revenue: monthRevenue,
        costs: monthCosts,
        profit: monthRevenue - monthCosts
      });
    }

    const topServices = projects
      .flatMap(p => p.costs)
      .reduce((acc, cost) => {
        acc[cost.service] = (acc[cost.service] || 0) + cost.amount;
        return acc;
      }, {} as Record<string, number>);

    const topServicesArray = Object.entries(topServices)
      .map(([service, amount]) => ({ service, amount }))
      .sort((a, b) => b.amount - a.amount)
      .slice(0, 5);

    return {
      totalSpend,
      totalRevenue,
      netPL,
      profitMargin,
      projectsByStatus,
      avgShipReadiness,
      monthlyTrend,
      topServices: topServicesArray
    };
  }, [projects]);

  const currentLevel = getLevel(profile.xp);

  return (
    <div className="p-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-2 font-mono">Analytics</h1>
          <p className="text-slate-400">Deep insights into your building journey</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="p-6 bg-slate-900/30 border border-slate-800 rounded-xl">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-red-500/20 rounded-lg">
                <TrendingDown className="w-5 h-5 text-red-400" />
              </div>
              <span className="text-xs text-slate-500">Total</span>
            </div>
            <p className="text-3xl font-bold text-red-400 mb-1">${stats.totalSpend.toFixed(0)}</p>
            <p className="text-sm text-slate-400">Total Spend</p>
          </div>

          <div className="p-6 bg-slate-900/30 border border-slate-800 rounded-xl">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-green-500/20 rounded-lg">
                <TrendingUp className="w-5 h-5 text-green-400" />
              </div>
              <span className="text-xs text-slate-500">Total</span>
            </div>
            <p className="text-3xl font-bold text-green-400 mb-1">${stats.totalRevenue.toFixed(0)}</p>
            <p className="text-sm text-slate-400">Total Revenue</p>
          </div>

          <div className="p-6 bg-slate-900/30 border border-slate-800 rounded-xl">
            <div className="flex items-center justify-between mb-4">
              <div className={`p-3 ${stats.netPL >= 0 ? 'bg-green-500/20' : 'bg-red-500/20'} rounded-lg`}>
                <DollarSign className={`w-5 h-5 ${stats.netPL >= 0 ? 'text-green-400' : 'text-red-400'}`} />
              </div>
              <span className={`text-xs font-semibold ${stats.profitMargin >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                {stats.profitMargin >= 0 ? '+' : ''}{stats.profitMargin.toFixed(1)}%
              </span>
            </div>
            <p className={`text-3xl font-bold ${stats.netPL >= 0 ? 'text-green-400' : 'text-red-400'} mb-1`}>
              ${Math.abs(stats.netPL).toFixed(0)}
            </p>
            <p className="text-sm text-slate-400">Net P&L</p>
          </div>

          <div className="p-6 bg-slate-900/30 border border-slate-800 rounded-xl">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-cyan-500/20 rounded-lg">
                <Target className="w-5 h-5 text-cyan-400" />
              </div>
              <span className="text-xs text-slate-500">Avg</span>
            </div>
            <p className="text-3xl font-bold text-cyan-400 mb-1">{stats.avgShipReadiness.toFixed(0)}%</p>
            <p className="text-sm text-slate-400">Ship Readiness</p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-8">
          <div className="bg-slate-900/30 border border-slate-800 rounded-xl p-6">
            <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
              <Calendar className="w-5 h-5 text-cyan-400" />
              6-Month Trend
            </h3>
            <div className="space-y-4">
              {stats.monthlyTrend.map((month, i) => (
                <div key={i}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-slate-400">{month.month}</span>
                    <span className={`text-sm font-bold ${month.profit >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                      ${Math.abs(month.profit).toFixed(0)}
                    </span>
                  </div>
                  <div className="relative h-8 bg-slate-800 rounded overflow-hidden">
                    {month.revenue > 0 && (
                      <div
                        className="absolute top-0 left-0 h-full bg-gradient-to-r from-green-500/30 to-green-500/50 border-r-2 border-green-400"
                        style={{ width: `${(month.revenue / Math.max(...stats.monthlyTrend.map(m => Math.max(m.revenue, m.costs)))) * 100}%` }}
                      />
                    )}
                    {month.costs > 0 && (
                      <div
                        className="absolute top-0 left-0 h-full bg-gradient-to-r from-red-500/30 to-red-500/50 border-r-2 border-red-400"
                        style={{ width: `${(month.costs / Math.max(...stats.monthlyTrend.map(m => Math.max(m.revenue, m.costs)))) * 100}%` }}
                      />
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-slate-900/30 border border-slate-800 rounded-xl p-6">
            <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-cyan-400" />
              Top Services by Spend
            </h3>
            <div className="space-y-4">
              {stats.topServices.map((service, i) => {
                const maxAmount = stats.topServices[0]?.amount || 1;
                const percentage = (service.amount / maxAmount) * 100;
                return (
                  <div key={i}>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-white">{service.service}</span>
                      <span className="text-sm font-bold text-red-400">${service.amount.toFixed(2)}</span>
                    </div>
                    <div className="h-2 bg-slate-800 rounded overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-red-500 to-orange-500 transition-all"
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-slate-900/30 border border-slate-800 rounded-xl p-6">
            <h3 className="text-lg font-bold text-white mb-6">Projects by Status</h3>
            <div className="space-y-3">
              {stats.projectsByStatus.map((item, i) => (
                <div key={i} className="flex items-center justify-between p-3 bg-slate-800/50 rounded-lg">
                  <span className="text-sm font-medium text-white">{item.status}</span>
                  <span
                    className="text-lg font-bold"
                    style={{ color: item.color }}
                  >
                    {item.count}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-slate-900/30 border border-slate-800 rounded-xl p-6">
            <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
              <Award className="w-5 h-5 text-cyan-400" />
              Your Progress
            </h3>
            <div className="space-y-4">
              <div className="p-4 bg-slate-800/50 rounded-lg">
                <p className="text-sm text-slate-400 mb-2">Current Level</p>
                <p className="text-2xl font-bold" style={{ color: currentLevel.color }}>
                  Level {currentLevel.level}: {currentLevel.title}
                </p>
              </div>
              <div className="p-4 bg-slate-800/50 rounded-lg">
                <p className="text-sm text-slate-400 mb-2">Total XP</p>
                <p className="text-2xl font-bold text-cyan-400">{profile.xp.toLocaleString()}</p>
              </div>
              <div className="p-4 bg-slate-800/50 rounded-lg">
                <p className="text-sm text-slate-400 mb-2">Achievements Unlocked</p>
                <p className="text-2xl font-bold text-green-400">{profile.achievements.length}/12</p>
              </div>
              <div className="p-4 bg-slate-800/50 rounded-lg">
                <p className="text-sm text-slate-400 mb-2">Current Streak</p>
                <p className="text-2xl font-bold text-orange-400">{profile.streak_days} days 🔥</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
