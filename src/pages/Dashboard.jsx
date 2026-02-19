import { useOutletContext } from "react-router-dom";
import ProjectCard from "../components/ProjectCard";

export default function Dashboard() {
    const { projects, setShowForm } = useOutletContext();

    // --- Feature Actions ---
    const getPredictiveData = (project) => {
        const costs = project.transactions.filter(t => t.type === 'Cost');
        if (costs.length < 2) return { status: 'stable', message: 'Gathering data...' };

        const totalSpent = costs.reduce((sum, t) => Number(sum) + Number(t.amount), 0);
        const dayDiff = (new Date() - new Date(project.created_at)) / (1000 * 60 * 60 * 24) || 1; // Use created_at
        const burnRate = totalSpent / dayDiff;

        if (burnRate === 0) return { status: 'stable', message: 'Zero burn' };

        const daysRemaining = (project.monthly_budget - totalSpent) / burnRate;

        if (daysRemaining < 0) return { status: 'critical', message: 'Budget Exceeded' };
        if (daysRemaining < 7) return { status: 'warning', message: `Budget hit in ${Math.round(daysRemaining)} days` };
        return { status: 'healthy', message: 'On track' };
    };

    // --- Global Stats ---
    const totalSpend = projects.reduce((sum, p) =>
        sum + p.transactions.filter(t => t.type === 'Cost').reduce((s, t) => Number(s) + Number(t.amount), 0), 0
    );
    const totalRevenue = projects.reduce((sum, p) =>
        sum + p.transactions.filter(t => t.type === 'Revenue').reduce((s, t) => Number(s) + Number(t.amount), 0), 0
    );

    return (
        <>
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

            {projects.length === 0 ? (
                <div className="glass-surface animate-fade-up" style={{
                    padding: '80px',
                    textAlign: 'center',
                    border: '1px dashed var(--border-glass)',
                    background: 'linear-gradient(180deg, rgba(255,255,255,0.01) 0%, rgba(2, 6, 23, 0.5) 100%)',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '24px'
                }}>
                    <div style={{
                        fontSize: '4rem',
                        color: 'var(--accent-primary)',
                        opacity: 0.5,
                        textShadow: '0 0 30px rgba(56, 189, 248, 0.3)'
                    }}>
                        󰐕
                    </div>
                    <div>
                        <h3 style={{ marginBottom: '12px', fontSize: '1.8rem', fontWeight: 800, letterSpacing: '-0.02em' }}>
                            The Void Awaits
                        </h3>
                        <p style={{ color: 'var(--text-muted)', maxWidth: '400px', margin: '0 auto', lineHeight: '1.6' }}>
                            Your portfolio is effectively zero. Launch your first initiative to begin the cycle of build, ship, and earn.
                        </p>
                    </div>
                    <button className="premium-btn pulse-primary" onClick={() => setShowForm(true)} style={{ padding: '16px 40px', fontSize: '1.1rem' }}>
                        Initialize Project Protocol
                    </button>
                </div>
            ) : (
                <div className="animate-fade-up stagger-2" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(380px, 1fr))', gap: '30px' }}>
                    {projects.slice(0, 3).map(project => (
                        <ProjectCard
                            key={project.id}
                            project={{ ...project, prediction: getPredictiveData(project) }}
                        />
                    ))}
                </div>
            )}
        </>
    );
}
