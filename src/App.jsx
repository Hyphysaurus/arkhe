import { useState, useEffect } from "react";
import Sidebar from "./components/Sidebar";
import ProjectCard from "./components/ProjectCard";
import ProjectForm from "./components/ProjectForm";
import CommandPalette from "./components/CommandPalette";
import ServiceConnector from "./components/ServiceConnector";
import { XP_CONFIG, LEVELS, SHIP_CHECKLIST, ACHIEVEMENTS } from "./constants";

export default function App() {
  // --- State Management ---
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false);
  const [isServiceModalOpen, setIsServiceModalOpen] = useState(false);
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem("arkhe-user-v3");
    return saved ? JSON.parse(saved) : { xp: 0, level: 1, streak: 1, achievements: [] };
  });

  const [projects, setProjects] = useState(() => {
    const saved = localStorage.getItem("arkhe-projects-v3");
    return saved ? JSON.parse(saved) : [
      {
        id: "1",
        name: "Arkhe Core",
        status: "In Progress",
        monthly_budget: 100,
        transactions: [
          { type: 'Cost', amount: 15, description: 'Vercel Pro' },
          { type: 'Cost', amount: 32, description: 'OpenAI API' },
          { type: 'Revenue', amount: 200, description: 'Stripe Payout' }
        ],
        checklist: SHIP_CHECKLIST.flatMap(c => c.items.map(i => ({ task: i, done: false })))
      }
    ];
  });

  const [showForm, setShowForm] = useState(false);
  const [notifications, setNotifications] = useState([]);

  // --- Persistence ---
  useEffect(() => {
    localStorage.setItem("arkhe-user-v3", JSON.stringify(user));
  }, [user]);

  useEffect(() => {
    localStorage.setItem("arkhe-projects-v3", JSON.stringify(projects));
  }, [projects]);

  useEffect(() => {
    const handleGlobalKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setIsCommandPaletteOpen(true);
      }
    };
    window.addEventListener("keydown", handleGlobalKeyDown);
    return () => window.removeEventListener("keydown", handleGlobalKeyDown);
  }, []);

  // --- Gamification Logic ---
  const addXp = (amount, reason) => {
    setUser(prev => {
      const newXp = prev.xp + amount;
      const newLevel = LEVELS.findLast(l => newXp >= l.minXp)?.level || 1;

      if (newLevel > prev.level) {
        notify(`UPGRADED TO LEVEL ${newLevel}! 🚀`, "Level Up");
      }

      return { ...prev, xp: newXp, level: newLevel };
    });
    notify(`+${amount} XP: ${reason}`, "XP Gained");
  };

  const notify = (message, title) => {
    const id = Date.now();
    setNotifications(prev => [...prev.slice(-2), { id, message, title }]);
    setTimeout(() => setNotifications(prev => prev.filter(n => n.id !== id)), 4000);
  };

  const checkAchievements = () => {
    ACHIEVEMENTS.forEach(ach => {
      if (user.achievements.includes(ach.key)) return;

      let unlocked = false;
      if (ach.key === 'first_ship' && projects.some(p => p.status === 'Shipped')) unlocked = true;
      if (ach.key === 'profit_mode' && projects.some(p => {
        const costs = p.transactions.filter(t => t.type === 'Cost').reduce((sum, t) => sum + t.amount, 0);
        const revenue = p.transactions.filter(t => t.type === 'Revenue').reduce((sum, t) => sum + t.amount, 0);
        return revenue > costs && revenue > 0;
      })) unlocked = true;

      if (unlocked) {
        setUser(prev => ({ ...prev, achievements: [...prev.achievements, ach.key] }));
        notify(`Achievement Unlocked: ${ach.name}`, "Trophy Earned 🏆");
        addXp(500, `Achievement: ${ach.name}`);
      }
    });
  };

  // --- Feature Actions ---
  const getPredictiveData = (project) => {
    const costs = project.transactions.filter(t => t.type === 'Cost');
    if (costs.length < 2) return { status: 'stable', message: 'Gathering data...' };

    const totalSpent = costs.reduce((sum, t) => sum + t.amount, 0);
    const dayDiff = (new Date() - new Date(project.id)) / (1000 * 60 * 60 * 24) || 1;
    const burnRate = totalSpent / dayDiff;

    if (burnRate === 0) return { status: 'stable', message: 'Zero burn' };

    const daysRemaining = (project.monthly_budget - totalSpent) / burnRate;

    if (daysRemaining < 0) return { status: 'critical', message: 'Budget Exceeded' };
    if (daysRemaining < 7) return { status: 'warning', message: `Budget hit in ${Math.round(daysRemaining)} days` };
    return { status: 'healthy', message: 'On track' };
  };

  const addProject = (newProject) => {
    setProjects([{ ...newProject, id: Date.now().toString(), transactions: [], checklist: [] }, ...projects]);
    setShowForm(false);
    addXp(XP_CONFIG.CHECKLIST_ITEM, "New Initiative Launched");
  };

  // --- Global Stats ---
  const totalSpend = projects.reduce((sum, p) =>
    sum + p.transactions.filter(t => t.type === 'Cost').reduce((s, t) => s + t.amount, 0), 0
  );
  const totalRevenue = projects.reduce((sum, p) =>
    sum + p.transactions.filter(t => t.type === 'Revenue').reduce((s, t) => s + t.amount, 0), 0
  );

  return (
    <div style={{ display: 'flex', minHeight: '100vh', padding: '20px', gap: '20px', maxWidth: '1600px', margin: '0 auto' }}>
      <Sidebar user={user} />

      <main style={{ flex: 1, padding: '20px 40px', position: 'relative' }}>
        {/* Notifications */}
        <div style={{ position: 'fixed', top: '40px', right: '40px', display: 'flex', flexDirection: 'column', gap: '12px', zIndex: 2000 }}>
          {notifications.map(n => (
            <div key={n.id} className="glass-surface" style={{
              padding: '16px 24px',
              background: 'var(--bg-dark)',
              borderLeft: '4px solid var(--accent-primary)',
              animation: 'slideIn 0.3s ease-out'
            }}>
              <p style={{ fontSize: '0.65rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>{n.title}</p>
              <p style={{ fontWeight: 600, color: 'var(--text-vibrant)' }}>{n.message}</p>
            </div>
          ))}
        </div>

        <header className="animate-fade-up" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '60px' }}>
          <div>
            <h1 style={{ fontSize: '2.5rem', margin: 0 }}>Vibe Command</h1>
            <p style={{ color: 'var(--text-muted)', marginTop: '8px' }}>Tracking your ascent to SaaS dominance.</p>
          </div>
          <button className="premium-btn pulse-primary" onClick={() => setShowForm(true)}>
            <span>󰐕</span> New Project
          </button>
        </header>

        {/* Global Financial Ledger */}
        <section className="glass-surface animate-fade-up stagger-1" style={{ padding: '32px', marginBottom: '40px', display: 'flex', gap: '60px' }}>
          <div>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginBottom: '8px' }}>Monthly Burn</p>
            <p style={{ fontSize: '2rem', fontWeight: 800, color: '#f87171' }}>${totalSpend.toLocaleString()}</p>
          </div>
          <div style={{ width: '1px', background: 'var(--border-glass)' }} />
          <div>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginBottom: '8px' }}>Net Revenue</p>
            <p style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--accent-success)' }}>${totalRevenue.toLocaleString()}</p>
          </div>
          <div style={{ width: '1px', background: 'var(--border-glass)' }} />
          <div>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginBottom: '8px' }}>Total P&L</p>
            <p style={{ fontSize: '2rem', fontWeight: 800, color: (totalRevenue - totalSpend) >= 0 ? 'var(--accent-primary)' : '#ef4444' }}>
              {(totalRevenue - totalSpend) >= 0 ? '+' : ''}${(totalRevenue - totalSpend).toLocaleString()}
            </p>
          </div>
        </section>

        <div className="animate-fade-up stagger-2" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(380px, 1fr))', gap: '30px' }}>
          {projects.map(project => (
            <ProjectCard
              key={project.id}
              project={{ ...project, prediction: getPredictiveData(project) }}
            />
          ))}
        </div>

        {showForm && <ProjectForm onAdd={addProject} onCancel={() => setShowForm(false)} />}

        <CommandPalette
          isOpen={isCommandPaletteOpen}
          onClose={() => setIsCommandPaletteOpen(false)}
          projects={projects}
          onAction={(action) => {
            if (action.id === 'new-project') setShowForm(true);
            if (action.id === 'log-cost') setIsServiceModalOpen(true);
            if (action.id === 'log-revenue') setIsServiceModalOpen(true);
          }}
        />

        <ServiceConnector
          isOpen={isServiceModalOpen}
          onClose={() => setIsServiceModalOpen(false)}
          onConnect={(service) => {
            notify(`Connected to ${service.name}. Syncing vibe data...`, "Engine Synced");
            setIsServiceModalOpen(false);
          }}
        />
      </main>

      <style>{`
        @keyframes slideIn {
          from { transform: translateX(100%); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }
      `}</style>
    </div>
  );
}
