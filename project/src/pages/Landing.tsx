import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, Zap, TrendingUp, Code, CheckCircle, ArrowRight, Play, Target, Clock, DollarSign, Award } from 'lucide-react';
import { useTheme, THEMES } from '../context/ThemeContext';

export default function Landing() {
  const [email, setEmail] = useState('');
  const { theme, setTheme, currentTheme } = useTheme();
  const [activeDemo, setActiveDemo] = useState(0);
  const [liveStats, setLiveStats] = useState({
    projects: 1247,
    revenue: 284950,
    users: 2340
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setLiveStats(prev => ({
        projects: prev.projects + Math.floor(Math.random() * 3),
        revenue: prev.revenue + Math.floor(Math.random() * 500),
        users: prev.users + Math.floor(Math.random() * 2)
      }));
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const demos = [
    {
      title: 'Cost Tracking',
      desc: 'Track every dollar spent on AI tools',
      stats: [
        { label: 'Claude API', value: '$47.20', color: 'text-orange-400' },
        { label: 'Cursor Pro', value: '$20.00', color: 'text-purple-400' },
        { label: 'Vercel', value: '$0.00', color: 'text-green-400' }
      ]
    },
    {
      title: 'Revenue Analytics',
      desc: 'See your profit in real-time',
      stats: [
        { label: 'Total Revenue', value: '$1,247', color: 'text-green-400' },
        { label: 'Total Costs', value: '$342', color: 'text-red-400' },
        { label: 'Net Profit', value: '$905', color: 'text-cyan-400' }
      ]
    },
    {
      title: 'Ship Progress',
      desc: 'Never miss a launch step',
      stats: [
        { label: 'Completed', value: '18/22', color: 'text-cyan-400' },
        { label: 'Critical', value: '2 left', color: 'text-yellow-400' },
        { label: 'Ready', value: '82%', color: 'text-green-400' }
      ]
    }
  ];

  const handleWaitlist = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      alert('Thanks! We\'ll notify you at launch.');
      setEmail('');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(0,255,178,0.05),transparent_50%)] pointer-events-none" />

      <nav className="relative border-b border-slate-800 bg-slate-950/50 backdrop-blur sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className={`w-10 h-10 bg-gradient-to-br ${currentTheme.gradient} rounded-lg flex items-center justify-center`}>
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-white font-mono tracking-wider">ΑΡΧΗ</h1>
                <p className="text-xs text-slate-500">First Principle</p>
              </div>
            </div>
            <div className="flex items-center gap-6">
              <a href="#features" className="text-slate-400 hover:text-white transition text-sm">Features</a>
              <a href="#demo" className="text-slate-400 hover:text-white transition text-sm">Demo</a>
              <Link to="/learn" className="text-slate-400 hover:text-white transition text-sm">Learn</Link>
              <a href="#pricing" className="text-slate-400 hover:text-white transition text-sm">Pricing</a>
              <Link
                to="/dashboard"
                className={`px-6 py-2 bg-gradient-to-r ${currentTheme.gradient} text-white font-semibold rounded-lg hover:shadow-lg ${currentTheme.gradientHover} transition text-sm`}
              >
                Launch Demo
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <section className="relative pt-32 pb-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-slate-800/50 border border-slate-700 rounded-full mb-8 animate-fadeIn">
              <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              <span className="text-sm font-semibold text-slate-300">
                <span className={currentTheme.text}>{liveStats.users.toLocaleString()}</span> builders shipping with ARKHE
              </span>
            </div>

            <h1 className="text-7xl font-bold text-white mb-6 font-mono leading-tight tracking-tight">
              The <span className={`bg-gradient-to-r ${currentTheme.gradient} bg-clip-text text-transparent`}>Origin</span><br />
              of Your Success
            </h1>

            <p className="text-2xl text-slate-400 mb-4 max-w-3xl mx-auto">
              ARKHE (Ἀρχή) - The Greek principle meaning <span className="text-white font-semibold">origin</span>, <span className="text-white font-semibold">beginning</span>, and <span className="text-white font-semibold">foundation</span>.
            </p>

            <p className="text-xl text-slate-500 mb-12 max-w-3xl mx-auto">
              The command center for AI-powered developers. Track costs, ship faster, build smarter.
            </p>

            <div className="flex items-center justify-center gap-4 mb-16">
              <Link
                to="/dashboard"
                className={`group px-8 py-4 bg-gradient-to-r ${currentTheme.gradient} text-white font-bold rounded-xl hover:shadow-2xl ${currentTheme.gradientHover} transition flex items-center gap-2 text-lg relative overflow-hidden obsidian-button`}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-700" />
                <Play className="w-5 h-5 relative z-10" />
                <span className="relative z-10">Try Interactive Demo</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition relative z-10" />
              </Link>
            </div>

            <div className="grid grid-cols-3 gap-8 max-w-3xl mx-auto">
              <div className="text-center">
                <p className={`text-4xl font-bold ${currentTheme.text} mb-2 font-mono`}>
                  {liveStats.projects.toLocaleString()}+
                </p>
                <p className="text-sm text-slate-500">Projects Shipped</p>
              </div>
              <div className="text-center">
                <p className={`text-4xl font-bold ${currentTheme.text} mb-2 font-mono`}>
                  ${(liveStats.revenue / 1000).toFixed(0)}K+
                </p>
                <p className="text-sm text-slate-500">Revenue Tracked</p>
              </div>
              <div className="text-center">
                <p className={`text-4xl font-bold ${currentTheme.text} mb-2 font-mono`}>
                  4.9/5
                </p>
                <p className="text-sm text-slate-500">User Rating</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="demo" className="relative py-20 px-6 bg-slate-950/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-white mb-4 font-mono">See It In Action</h2>
            <p className="text-xl text-slate-400">Interactive demo - no signup required</p>
          </div>

          <div className="grid md:grid-cols-3 gap-4 mb-8">
            {demos.map((demo, i) => (
              <button
                key={i}
                onClick={() => setActiveDemo(i)}
                className={`p-6 rounded-xl border-2 transition text-left ${
                  activeDemo === i
                    ? `border-slate-600 bg-slate-800/50`
                    : 'border-slate-800 bg-slate-900/30 hover:border-slate-700'
                }`}
              >
                <h3 className="text-lg font-bold text-white mb-2">{demo.title}</h3>
                <p className="text-sm text-slate-400">{demo.desc}</p>
              </button>
            ))}
          </div>

          <div className="glass-card relative rounded-2xl p-12">
            <div className="grid md:grid-cols-3 gap-8 relative z-10">
              {demos[activeDemo].stats.map((stat, i) => (
                <div key={i} className="text-center p-6 obsidian-glass rounded-xl relative overflow-hidden group">
                  <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  <p className="text-sm text-slate-400 mb-2 relative z-10">{stat.label}</p>
                  <p className={`text-4xl font-bold ${stat.color} font-mono relative z-10`}>{stat.value}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="relative py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-white mb-4 font-mono">Choose Your Theme</h2>
            <p className="text-xl text-slate-400">Customize ARKHE to match your vibe</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {(Object.keys(THEMES) as Array<keyof typeof THEMES>).map((key) => {
              const t = THEMES[key];
              return (
                <button
                  key={key}
                  onClick={() => setTheme(key)}
                  className={`group p-4 rounded-xl border-2 transition ${
                    theme === key
                      ? `border-slate-600 bg-slate-800 ${t.ring}`
                      : 'border-slate-800 bg-slate-900/30 hover:border-slate-700'
                  }`}
                >
                  <div className={`w-full h-24 rounded-lg bg-gradient-to-br ${t.gradient} mb-3 group-hover:scale-105 transition`} />
                  <p className="text-sm font-semibold text-white text-center">{t.name}</p>
                  {theme === key && (
                    <div className="mt-2 flex justify-center">
                      <CheckCircle className={`w-4 h-4 ${t.text}`} />
                    </div>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      <section id="features" className="relative py-20 px-6 bg-slate-950/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4 font-mono">Built for AI Builders</h2>
            <p className="text-xl text-slate-400">Everything you need to ship faster and smarter</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: DollarSign, title: 'Cost Tracking', desc: 'Track AI tool spending across Claude, Cursor, OpenAI' },
              { icon: TrendingUp, title: 'Revenue Analytics', desc: 'Real-time P&L with Stripe integration ready' },
              { icon: Target, title: 'Ship Checklist', desc: '22-point launch readiness system' },
              { icon: Code, title: 'Code Reviews', desc: 'AI-powered quality scoring' },
              { icon: Clock, title: 'Time Tracking', desc: 'Log hours per project and feature' },
              { icon: Award, title: 'Gamification', desc: 'XP, levels, and achievements' },
              { icon: Zap, title: 'Keyboard Shortcuts', desc: 'Power user features' },
              { icon: Sparkles, title: '6 Themes', desc: 'Customize your dashboard' }
            ].map((feature, i) => (
              <div key={i} className="p-6 obsidian-glass rounded-xl hover:border-slate-600 transition group relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className={`w-12 h-12 bg-gradient-to-br ${currentTheme.gradient} rounded-lg flex items-center justify-center mb-4 shadow-lg group-hover:scale-110 transition-transform relative z-10`}>
                  <feature.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-bold text-white mb-2 relative z-10">{feature.title}</h3>
                <p className="text-sm text-slate-400 relative z-10">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="pricing" className="relative py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4 font-mono">Simple Pricing</h2>
            <p className="text-xl text-slate-400">Start free, scale when ready</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="p-8 bg-slate-900/30 border border-slate-800 rounded-2xl">
              <h3 className="text-2xl font-bold text-white mb-2">Free</h3>
              <p className="text-slate-400 mb-6">For side projects</p>
              <p className="text-5xl font-bold text-white mb-8">$0</p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center gap-2 text-slate-300">
                  <CheckCircle className={`w-5 h-5 ${currentTheme.text}`} />
                  3 projects
                </li>
                <li className="flex items-center gap-2 text-slate-300">
                  <CheckCircle className={`w-5 h-5 ${currentTheme.text}`} />
                  Basic analytics
                </li>
                <li className="flex items-center gap-2 text-slate-300">
                  <CheckCircle className={`w-5 h-5 ${currentTheme.text}`} />
                  5 code reviews/mo
                </li>
              </ul>
              <Link
                to="/dashboard"
                className="block w-full px-6 py-3 bg-slate-800 border border-slate-700 text-white font-semibold rounded-lg hover:bg-slate-700 transition text-center"
              >
                Start Free
              </Link>
            </div>

            <div className="p-8 bg-gradient-to-br from-slate-900 to-slate-800 border-2 border-slate-700 rounded-2xl relative scale-105">
              <div className={`absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-gradient-to-r ${currentTheme.gradient} text-white text-sm font-bold rounded-full`}>
                Most Popular
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">Pro</h3>
              <p className="text-slate-400 mb-6">For serious builders</p>
              <p className="text-5xl font-bold text-white mb-8">
                $29<span className="text-xl text-slate-400">/mo</span>
              </p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center gap-2 text-slate-300">
                  <CheckCircle className={`w-5 h-5 ${currentTheme.text}`} />
                  Unlimited projects
                </li>
                <li className="flex items-center gap-2 text-slate-300">
                  <CheckCircle className={`w-5 h-5 ${currentTheme.text}`} />
                  Advanced analytics
                </li>
                <li className="flex items-center gap-2 text-slate-300">
                  <CheckCircle className={`w-5 h-5 ${currentTheme.text}`} />
                  Unlimited reviews
                </li>
                <li className="flex items-center gap-2 text-slate-300">
                  <CheckCircle className={`w-5 h-5 ${currentTheme.text}`} />
                  All themes
                </li>
              </ul>
              <button className={`w-full px-6 py-3 bg-gradient-to-r ${currentTheme.gradient} text-white font-bold rounded-lg hover:shadow-lg ${currentTheme.gradientHover} transition`}>
                Get Pro
              </button>
            </div>

            <div className="p-8 bg-slate-900/30 border border-slate-800 rounded-2xl">
              <h3 className="text-2xl font-bold text-white mb-2">Team</h3>
              <p className="text-slate-400 mb-6">For agencies</p>
              <p className="text-5xl font-bold text-white mb-8">
                $99<span className="text-xl text-slate-400">/mo</span>
              </p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center gap-2 text-slate-300">
                  <CheckCircle className={`w-5 h-5 ${currentTheme.text}`} />
                  Everything in Pro
                </li>
                <li className="flex items-center gap-2 text-slate-300">
                  <CheckCircle className={`w-5 h-5 ${currentTheme.text}`} />
                  10 team members
                </li>
                <li className="flex items-center gap-2 text-slate-300">
                  <CheckCircle className={`w-5 h-5 ${currentTheme.text}`} />
                  Collaboration
                </li>
                <li className="flex items-center gap-2 text-slate-300">
                  <CheckCircle className={`w-5 h-5 ${currentTheme.text}`} />
                  Priority support
                </li>
              </ul>
              <button className="w-full px-6 py-3 bg-slate-800 border border-slate-700 text-white font-semibold rounded-lg hover:bg-slate-700 transition">
                Contact Sales
              </button>
            </div>
          </div>
        </div>
      </section>

      <section className="relative py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <div className="p-12 bg-gradient-to-br from-slate-900 to-slate-800 border border-slate-700 rounded-2xl">
            <h2 className="text-4xl font-bold text-white mb-4 font-mono">
              Begin at the Origin
            </h2>
            <p className="text-xl text-slate-400 mb-8">
              Join builders using ARKHE to ship faster and track smarter
            </p>
            <form onSubmit={handleWaitlist} className="flex gap-3 max-w-md mx-auto">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                className="flex-1 px-6 py-4 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-900"
                style={{ '--tw-ring-color': currentTheme.primary } as any}
              />
              <button
                type="submit"
                className={`px-8 py-4 bg-gradient-to-r ${currentTheme.gradient} text-white font-bold rounded-lg hover:shadow-lg ${currentTheme.gradientHover} transition`}
              >
                Get Started
              </button>
            </form>
          </div>
        </div>
      </section>

      <footer className="relative border-t border-slate-800 bg-slate-950/50 py-12 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className={`w-10 h-10 bg-gradient-to-br ${currentTheme.gradient} rounded-lg flex items-center justify-center`}>
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="font-bold text-white font-mono text-xl tracking-wider">ΑΡΧΗ</p>
                <p className="text-xs text-slate-500">The First Principle</p>
              </div>
            </div>
            <p className="text-slate-400 text-sm">
              Built by builders, for builders. © 2026 ARKHE. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
