import { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { ChevronLeft, Check, DollarSign, TrendingUp, Code, Trash2 } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { ProgressRing } from '../components/ui/ProgressRing';
import { CHECKLIST_TEMPLATES, SERVICE_PRESETS, REVENUE_SOURCES, PROJECT_STATUSES } from '../data/constants';

export default function ProjectDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { projects, updateChecklist, addCost, deleteCost, addRevenue, deleteRevenue, updateProject, deleteProject } = useApp();
  const [activeTab, setActiveTab] = useState('ship');

  const project = projects.find(p => p.id === id);

  if (!project) {
    return (
      <div className="p-8">
        <p className="text-white">Project not found</p>
        <Link to="/" className="text-cyan-400 hover:underline">Go back</Link>
      </div>
    );
  }

  const completedItems = Object.values(project.checklist).filter(Boolean).length;
  const progress = (completedItems / CHECKLIST_TEMPLATES.length) * 100;

  const totalCost = project.costs.reduce((sum, c) => sum + c.amount, 0);
  const totalRevenue = project.revenues.reduce((sum, r) => sum + r.amount, 0);
  const netPL = totalRevenue - totalCost;

  const groupedChecklist = CHECKLIST_TEMPLATES.reduce((acc, item) => {
    if (!acc[item.category]) acc[item.category] = [];
    acc[item.category].push(item);
    return acc;
  }, {} as Record<string, typeof CHECKLIST_TEMPLATES>);

  const handleDeleteProject = () => {
    if (confirm('Delete this project?')) {
      deleteProject(project.id);
      navigate('/');
    }
  };

  return (
    <div className="p-8">
      <div className="max-w-6xl mx-auto">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-slate-400 hover:text-cyan-400 transition mb-6"
        >
          <ChevronLeft className="w-4 h-4" />
          Back to Dashboard
        </Link>

        <div className="flex items-start justify-between mb-8">
          <div className="flex items-center gap-4">
            <span className="text-6xl">{project.emoji}</span>
            <div>
              <h1 className="text-3xl font-bold text-white mb-2">{project.name}</h1>
              <div className="flex items-center gap-3">
                <select
                  value={project.status}
                  onChange={(e) => updateProject(project.id, { status: e.target.value })}
                  className="px-3 py-1 bg-slate-800 border border-slate-700 rounded-lg text-sm font-semibold text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
                >
                  {PROJECT_STATUSES.map(status => (
                    <option key={status.key} value={status.key}>{status.label}</option>
                  ))}
                </select>
                <button
                  onClick={handleDeleteProject}
                  className="text-slate-400 hover:text-red-400 transition"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
          <ProgressRing progress={progress} size={100} strokeWidth={8} />
        </div>

        <div className="grid grid-cols-3 gap-4 mb-8">
          <div className="bg-slate-900/30 border border-slate-800 rounded-xl p-4">
            <p className="text-slate-400 text-sm mb-1">Costs</p>
            <p className="text-2xl font-bold text-red-400">${totalCost.toFixed(2)}</p>
          </div>
          <div className="bg-slate-900/30 border border-slate-800 rounded-xl p-4">
            <p className="text-slate-400 text-sm mb-1">Revenue</p>
            <p className="text-2xl font-bold text-green-400">${totalRevenue.toFixed(2)}</p>
          </div>
          <div className="bg-slate-900/30 border border-slate-800 rounded-xl p-4">
            <p className="text-slate-400 text-sm mb-1">Net P&L</p>
            <p className={`text-2xl font-bold ${netPL >= 0 ? 'text-green-400' : 'text-red-400'}`}>
              ${netPL.toFixed(2)}
            </p>
          </div>
        </div>

        <div className="border-b border-slate-800 mb-6">
          <div className="flex gap-1">
            {[
              { key: 'ship', label: 'Ship Checklist', icon: Check },
              { key: 'costs', label: 'Costs', icon: DollarSign },
              { key: 'revenue', label: 'Revenue', icon: TrendingUp },
              { key: 'review', label: 'Code Review', icon: Code }
            ].map(tab => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`flex items-center gap-2 px-4 py-3 font-semibold transition relative ${
                  activeTab === tab.key
                    ? 'text-cyan-400'
                    : 'text-slate-400 hover:text-slate-300'
                }`}
              >
                <tab.icon className="w-4 h-4" />
                {tab.label}
                {activeTab === tab.key && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-cyan-500 to-teal-500" />
                )}
              </button>
            ))}
          </div>
        </div>

        {activeTab === 'ship' && (
          <div className="space-y-6">
            {Object.entries(groupedChecklist).map(([category, items]) => (
              <div key={category}>
                <h3 className="text-lg font-bold text-white mb-3">{category}</h3>
                <div className="space-y-2">
                  {items.map(item => (
                    <label
                      key={item.id}
                      className="flex items-center gap-3 p-3 bg-slate-900/30 border border-slate-800 rounded-lg hover:border-slate-700 cursor-pointer transition"
                    >
                      <input
                        type="checkbox"
                        checked={project.checklist[item.id] || false}
                        onChange={(e) => updateChecklist(project.id, item.id, e.target.checked)}
                        className="w-5 h-5 rounded border-slate-600 text-cyan-500 focus:ring-cyan-500 focus:ring-offset-slate-900"
                      />
                      <span className="flex-1 text-white">{item.label}</span>
                      <span
                        className={`px-2 py-1 rounded text-xs font-semibold ${
                          item.priority === 'high'
                            ? 'bg-red-500/20 text-red-400'
                            : item.priority === 'medium'
                            ? 'bg-yellow-500/20 text-yellow-400'
                            : 'bg-slate-500/20 text-slate-400'
                        }`}
                      >
                        {item.priority}
                      </span>
                    </label>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'costs' && (
          <CostTab project={project} addCost={addCost} deleteCost={deleteCost} />
        )}

        {activeTab === 'revenue' && (
          <RevenueTab project={project} addRevenue={addRevenue} deleteRevenue={deleteRevenue} />
        )}

        {activeTab === 'review' && (
          <CodeReviewTab projectId={project.id} />
        )}
      </div>
    </div>
  );
}

function CostTab({ project, addCost, deleteCost }: any) {
  const [service, setService] = useState('Claude API');
  const [amount, setAmount] = useState('');
  const [note, setNote] = useState('');

  const handleAdd = () => {
    if (!amount || isNaN(parseFloat(amount))) return;
    addCost(project.id, {
      service,
      amount: parseFloat(amount),
      date: new Date().toISOString().split('T')[0],
      note
    });
    setAmount('');
    setNote('');
  };

  return (
    <div className="space-y-6">
      <div className="bg-slate-900/30 border border-slate-800 rounded-xl p-6">
        <h3 className="text-lg font-bold text-white mb-4">Log Cost</h3>
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium text-slate-400 mb-2">Service</label>
            <select
              value={service}
              onChange={(e) => setService(e.target.value)}
              className="w-full px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
            >
              {SERVICE_PRESETS.map(s => (
                <option key={s.name} value={s.name}>{s.icon} {s.name}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-400 mb-2">Amount ($)</label>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="w-full px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
              placeholder="25.00"
            />
          </div>
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-slate-400 mb-2">Note (optional)</label>
          <input
            type="text"
            value={note}
            onChange={(e) => setNote(e.target.value)}
            className="w-full px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
            placeholder="What was this for?"
          />
        </div>
        <button
          onClick={handleAdd}
          className="w-full px-4 py-2 bg-gradient-to-r from-cyan-500 to-teal-500 text-white font-semibold rounded-lg hover:shadow-lg hover:shadow-cyan-500/50 transition"
        >
          Add Cost
        </button>
      </div>

      <div className="space-y-2">
        {project.costs.map((cost: any) => (
          <div key={cost.id} className="flex items-center gap-4 p-4 bg-slate-900/30 border border-slate-800 rounded-xl">
            <div className="flex-1">
              <p className="font-semibold text-white">{cost.service}</p>
              <p className="text-sm text-slate-400">{cost.note}</p>
              <p className="text-xs text-slate-500">{cost.date}</p>
            </div>
            <p className="text-xl font-bold text-red-400">${cost.amount.toFixed(2)}</p>
            <button
              onClick={() => deleteCost(project.id, cost.id)}
              className="text-slate-400 hover:text-red-400 transition"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

function RevenueTab({ project, addRevenue, deleteRevenue }: any) {
  const [source, setSource] = useState('Stripe');
  const [amount, setAmount] = useState('');
  const [note, setNote] = useState('');

  const handleAdd = () => {
    if (!amount || isNaN(parseFloat(amount))) return;
    addRevenue(project.id, {
      source,
      amount: parseFloat(amount),
      date: new Date().toISOString().split('T')[0],
      note
    });
    setAmount('');
    setNote('');
  };

  return (
    <div className="space-y-6">
      <div className="bg-slate-900/30 border border-slate-800 rounded-xl p-6">
        <h3 className="text-lg font-bold text-white mb-4">Log Revenue</h3>
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium text-slate-400 mb-2">Source</label>
            <select
              value={source}
              onChange={(e) => setSource(e.target.value)}
              className="w-full px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
            >
              {REVENUE_SOURCES.map(s => (
                <option key={s.name} value={s.name}>{s.icon} {s.name}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-400 mb-2">Amount ($)</label>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="w-full px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
              placeholder="49.00"
            />
          </div>
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-slate-400 mb-2">Note (optional)</label>
          <input
            type="text"
            value={note}
            onChange={(e) => setNote(e.target.value)}
            className="w-full px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
            placeholder="Customer name or source"
          />
        </div>
        <button
          onClick={handleAdd}
          className="w-full px-4 py-2 bg-gradient-to-r from-cyan-500 to-teal-500 text-white font-semibold rounded-lg hover:shadow-lg hover:shadow-cyan-500/50 transition"
        >
          Add Revenue
        </button>
      </div>

      <div className="space-y-2">
        {project.revenues.map((revenue: any) => (
          <div key={revenue.id} className="flex items-center gap-4 p-4 bg-slate-900/30 border border-slate-800 rounded-xl">
            <div className="flex-1">
              <p className="font-semibold text-white">{revenue.source}</p>
              <p className="text-sm text-slate-400">{revenue.note}</p>
              <p className="text-xs text-slate-500">{revenue.date}</p>
            </div>
            <p className="text-xl font-bold text-green-400">${revenue.amount.toFixed(2)}</p>
            <button
              onClick={() => deleteRevenue(project.id, revenue.id)}
              className="text-slate-400 hover:text-red-400 transition"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

function CodeReviewTab({ projectId }: { projectId: string }) {
  const { projects, addCodeReview } = useApp();
  const [code, setCode] = useState('');
  const [loading, setLoading] = useState(false);

  const project = projects.find(p => p.id === projectId);

  const handleReview = async () => {
    if (!code.trim()) return;
    setLoading(true);

    setTimeout(() => {
      const score = Math.floor(Math.random() * 4) + 7;
      addCodeReview(projectId, {
        code,
        score,
        summary: score >= 8 ? 'Great code quality!' : 'Good, with room for improvement',
        issues: [
          { type: 'warning', message: 'Consider adding error handling', severity: 'medium' },
          { type: 'info', message: 'Variable naming could be more descriptive', severity: 'low' }
        ],
        strengths: ['Clean structure', 'Good performance'],
        fixes: ['Add try-catch blocks', 'Use const instead of let where possible']
      });
      setCode('');
      setLoading(false);
    }, 1500);
  };

  return (
    <div className="space-y-6">
      <div className="bg-slate-900/30 border border-slate-800 rounded-xl p-6">
        <h3 className="text-lg font-bold text-white mb-4">Submit Code for Review</h3>
        <textarea
          value={code}
          onChange={(e) => setCode(e.target.value)}
          className="w-full h-64 px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-white font-mono text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500 resize-none"
          placeholder="Paste your code here..."
        />
        <button
          onClick={handleReview}
          disabled={loading || !code.trim()}
          className="mt-4 w-full px-4 py-2 bg-gradient-to-r from-cyan-500 to-teal-500 text-white font-semibold rounded-lg hover:shadow-lg hover:shadow-cyan-500/50 transition disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? 'Reviewing...' : 'Review Code'}
        </button>
      </div>

      <div className="space-y-4">
        {project?.codeReviews.map((review: any) => (
          <div key={review.id} className="bg-slate-900/30 border border-slate-800 rounded-xl p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div
                  className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-xl ${
                    review.score >= 9
                      ? 'bg-green-500/20 text-green-400'
                      : review.score >= 7
                      ? 'bg-yellow-500/20 text-yellow-400'
                      : 'bg-red-500/20 text-red-400'
                  }`}
                >
                  {review.score}
                </div>
                <div>
                  <p className="font-semibold text-white">{review.summary}</p>
                  <p className="text-xs text-slate-500">{new Date(review.date).toLocaleString()}</p>
                </div>
              </div>
            </div>
            <div className="space-y-2">
              <p className="text-sm text-slate-400">Strengths: {review.strengths.join(', ')}</p>
              <p className="text-sm text-slate-400">Suggested fixes: {review.fixes.join(', ')}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
