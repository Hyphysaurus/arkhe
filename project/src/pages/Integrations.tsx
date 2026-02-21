import { useState } from 'react';
import { Link2, Check, ExternalLink, Zap } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { INTEGRATIONS, getCategoryLabel, Integration } from '../data/integrations';

export function Integrations() {
  const { currentTheme } = useTheme();
  const [selectedCategory, setSelectedCategory] = useState<Integration['category'] | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const categories: Array<Integration['category'] | 'all'> = ['all', 'ai', 'development', 'analytics', 'productivity', 'communication'];

  const filteredIntegrations = INTEGRATIONS.filter(integration => {
    const matchesCategory = selectedCategory === 'all' || integration.category === selectedCategory;
    const matchesSearch = integration.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         integration.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const connectedCount = INTEGRATIONS.filter(i => i.connected).length;

  return (
    <div className="p-8">
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2 font-mono">Integrations</h1>
            <p className="text-slate-400">
              Connect ARKHE with your favorite tools and services
            </p>
          </div>
          <div className="flex items-center gap-3">
            <div className={`px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg`}>
              <span className="text-sm text-slate-400">Connected: </span>
              <span className={`text-sm font-bold ${currentTheme.text}`}>{connectedCount}/{INTEGRATIONS.length}</span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-4 mb-6">
          <input
            type="text"
            placeholder="Search integrations..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="flex-1 px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-900"
            style={{ '--tw-ring-color': currentTheme.primary } as any}
          />
        </div>

        <div className="flex gap-2 flex-wrap">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-lg font-medium transition ${
                selectedCategory === cat
                  ? `bg-gradient-to-r ${currentTheme.gradient} text-white shadow-lg`
                  : 'bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700'
              }`}
            >
              {cat === 'all' ? 'All' : getCategoryLabel(cat)}
            </button>
          ))}
        </div>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredIntegrations.map((integration) => (
          <div
            key={integration.id}
            className="group relative p-6 bg-slate-900/50 border border-slate-800 rounded-xl hover:border-slate-700 transition"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className={`w-12 h-12 bg-gradient-to-br ${currentTheme.gradient} rounded-lg flex items-center justify-center text-2xl relative overflow-hidden`}>
                  <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  {integration.icon}
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white">{integration.name}</h3>
                  <span className={`text-xs px-2 py-0.5 rounded-full ${
                    integration.pricing === 'free'
                      ? 'bg-green-500/20 text-green-400'
                      : integration.pricing === 'freemium'
                      ? 'bg-blue-500/20 text-blue-400'
                      : 'bg-orange-500/20 text-orange-400'
                  }`}>
                    {integration.pricing}
                  </span>
                </div>
              </div>
              {integration.connected && (
                <div className={`p-1.5 bg-green-500/20 rounded-full`}>
                  <Check className="w-4 h-4 text-green-400" />
                </div>
              )}
            </div>

            <p className="text-sm text-slate-400 mb-4 line-clamp-2">
              {integration.description}
            </p>

            <div className="flex items-center gap-2 mb-4">
              {integration.apiAvailable && (
                <span className="text-xs px-2 py-1 bg-slate-800 text-slate-300 rounded">
                  API
                </span>
              )}
              {integration.costTracking && (
                <span className="text-xs px-2 py-1 bg-slate-800 text-slate-300 rounded">
                  Cost Tracking
                </span>
              )}
            </div>

            <button
              className={`w-full flex items-center justify-center gap-2 px-4 py-2 rounded-lg font-medium transition ${
                integration.connected
                  ? 'bg-slate-800 text-slate-400 hover:bg-slate-700'
                  : `bg-gradient-to-r ${currentTheme.gradient} text-white hover:shadow-lg ${currentTheme.gradientHover}`
              }`}
            >
              {integration.connected ? (
                <>
                  <Check className="w-4 h-4" />
                  Connected
                </>
              ) : (
                <>
                  <Link2 className="w-4 h-4" />
                  Connect
                </>
              )}
            </button>
          </div>
        ))}
      </div>

      {filteredIntegrations.length === 0 && (
        <div className="text-center py-16">
          <p className="text-slate-400 mb-4">No integrations found</p>
          <button
            onClick={() => {
              setSearchQuery('');
              setSelectedCategory('all');
            }}
            className="text-sm text-cyan-400 hover:text-cyan-300 transition"
          >
            Clear filters
          </button>
        </div>
      )}

      <div className="mt-12 p-8 bg-gradient-to-br from-slate-900/50 to-slate-800/50 border border-slate-700 rounded-xl">
        <div className="flex items-start gap-4">
          <div className={`p-3 bg-gradient-to-br ${currentTheme.gradient} rounded-lg`}>
            <Zap className="w-6 h-6 text-white" />
          </div>
          <div className="flex-1">
            <h3 className="text-xl font-bold text-white mb-2">Missing an integration?</h3>
            <p className="text-slate-400 mb-4">
              Let us know which tools you'd like to connect with ARKHE. We're constantly adding new integrations based on community feedback.
            </p>
            <button className={`flex items-center gap-2 px-6 py-3 bg-gradient-to-r ${currentTheme.gradient} text-white font-semibold rounded-lg hover:shadow-lg ${currentTheme.gradientHover} transition`}>
              <ExternalLink className="w-4 h-4" />
              Request Integration
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
