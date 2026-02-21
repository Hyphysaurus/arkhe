import { useState, useEffect } from 'react';
import { Plus } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { ProjectCard } from '../components/ProjectCard';
import { PROJECT_EMOJIS } from '../data/constants';
import { useNavigate, useOutletContext } from 'react-router-dom';

export function Dashboard() {
  const { projects, createProject } = useApp();
  const { showNewProjectModal, setShowNewProjectModal } = useOutletContext<any>();
  const [projectName, setProjectName] = useState('');
  const [selectedEmoji, setSelectedEmoji] = useState('🚀');
  const [budget, setBudget] = useState('');
  const navigate = useNavigate();

  const totalSpend = projects.reduce((sum, p) =>
    sum + p.costs.reduce((s, c) => s + c.amount, 0), 0
  );
  const totalRevenue = projects.reduce((sum, p) =>
    sum + p.revenues.reduce((s, r) => s + r.amount, 0), 0
  );
  const netPL = totalRevenue - totalSpend;

  const handleCreateProject = () => {
    if (!projectName.trim()) return;
    const id = createProject(projectName, selectedEmoji, parseFloat(budget) || 0);
    setShowNewProjectModal(false);
    setProjectName('');
    setSelectedEmoji('🚀');
    setBudget('');
    navigate(`/project/${id}`);
  };

  useEffect(() => {
    if (!showNewProjectModal) {
      setProjectName('');
      setSelectedEmoji('🚀');
      setBudget('');
    }
  }, [showNewProjectModal]);

  return (
    <div className="p-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-4 font-mono">ARKHE Dashboard</h1>
          <p className="text-slate-400">Track, ship, and vibe-code like a pro</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="bg-slate-900/30 border border-slate-800 rounded-xl p-6">
            <p className="text-slate-400 text-sm mb-1">Total Spend</p>
            <p className="text-3xl font-bold text-red-400">${totalSpend.toFixed(2)}</p>
          </div>
          <div className="bg-slate-900/30 border border-slate-800 rounded-xl p-6">
            <p className="text-slate-400 text-sm mb-1">Total Revenue</p>
            <p className="text-3xl font-bold text-green-400">${totalRevenue.toFixed(2)}</p>
          </div>
          <div className="bg-slate-900/30 border border-slate-800 rounded-xl p-6">
            <p className="text-slate-400 text-sm mb-1">Net P&L</p>
            <p className={`text-3xl font-bold ${netPL >= 0 ? 'text-green-400' : 'text-red-400'}`}>
              ${netPL.toFixed(2)}
            </p>
          </div>
        </div>

        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-white">Projects</h2>
          <button
            onClick={() => setShowNewProjectModal(true)}
            className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-cyan-500 to-teal-500 text-white font-semibold rounded-lg hover:shadow-lg hover:shadow-cyan-500/50 transition"
          >
            <Plus className="w-4 h-4" />
            New Project
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {projects.map(project => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>

        {showNewProjectModal && (
          <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
            <div className="bg-slate-900 border border-slate-700 rounded-xl p-6 max-w-md w-full">
              <h3 className="text-xl font-bold text-white mb-4">New Project</h3>

              <div className="mb-4">
                <label className="block text-sm font-medium text-slate-400 mb-2">Project Name</label>
                <input
                  type="text"
                  value={projectName}
                  onChange={(e) => setProjectName(e.target.value)}
                  className="w-full px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
                  placeholder="My Awesome Project"
                  autoFocus
                />
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-slate-400 mb-2">Emoji</label>
                <div className="grid grid-cols-6 gap-2">
                  {PROJECT_EMOJIS.map(emoji => (
                    <button
                      key={emoji}
                      onClick={() => setSelectedEmoji(emoji)}
                      className={`text-2xl p-2 rounded-lg transition ${
                        selectedEmoji === emoji
                          ? 'bg-cyan-500/20 ring-2 ring-cyan-500'
                          : 'bg-slate-800 hover:bg-slate-700'
                      }`}
                    >
                      {emoji}
                    </button>
                  ))}
                </div>
              </div>

              <div className="mb-6">
                <label className="block text-sm font-medium text-slate-400 mb-2">Budget (optional)</label>
                <input
                  type="number"
                  value={budget}
                  onChange={(e) => setBudget(e.target.value)}
                  className="w-full px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
                  placeholder="100"
                />
              </div>

              <div className="flex gap-3">
                <button
                  onClick={handleCreateProject}
                  disabled={!projectName.trim()}
                  className="flex-1 px-4 py-2 bg-gradient-to-r from-cyan-500 to-teal-500 text-white font-semibold rounded-lg hover:shadow-lg hover:shadow-cyan-500/50 transition disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Create
                </button>
                <button
                  onClick={() => setShowNewProjectModal(false)}
                  className="flex-1 px-4 py-2 bg-slate-800 border border-slate-700 text-white font-semibold rounded-lg hover:bg-slate-700 transition"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
