import ProfitRadar from "./ProfitRadar";

export default function ProjectCard({ project }) {
    const statusConfig = {
        Building: { color: '#94a3b8', bg: 'rgba(148, 163, 184, 0.1)' },
        Testing: { color: '#fbbf24', bg: 'rgba(251, 191, 36, 0.1)' },
        Shipped: { color: '#38bdf8', bg: 'rgba(56, 189, 248, 0.1)' },
        Earning: { color: '#34d399', bg: 'rgba(52, 211, 153, 0.1)' },
        Archived: { color: '#ef4444', bg: 'rgba(239, 68, 68, 0.1)' },
    };

    const config = statusConfig[project.status] || statusConfig.Building;

    const totalCosts = project.transactions?.filter(t => t.type === 'Cost').reduce((sum, t) => sum + t.amount, 0) || 0;
    const totalRevenue = project.transactions?.filter(t => t.type === 'Revenue').reduce((sum, t) => sum + t.amount, 0) || 0;
    const profit = totalRevenue - totalCosts;

    const budgetProgress = project.monthly_budget > 0 ? (totalCosts / project.monthly_budget) * 100 : 0;
    const isOverBudget = totalCosts > project.monthly_budget && project.monthly_budget > 0;

<<<<<<< HEAD
    // Override config for over-budget alert
    const displayConfig = isOverBudget ? {
        color: '#ef4444',
        bg: 'rgba(239, 68, 68, 0.1)',
        glow: 'rgba(239, 68, 68, 0.4)'
    } : {
        ...config,
        glow: `${config.color}33`
    };

=======
>>>>>>> 9ae60d9221524837ae9c85de99a786d113e8ea81
    return (
        <div className="glass-surface animate-fade-up" style={{
            padding: '24px',
            display: 'flex',
            flexDirection: 'column',
            gap: '20px',
            position: 'relative',
<<<<<<< HEAD
            overflow: 'hidden',
            border: isOverBudget ? '1px solid rgba(239, 68, 68, 0.3)' : '1px solid var(--border-glass)'
=======
            overflow: 'hidden'
>>>>>>> 9ae60d9221524837ae9c85de99a786d113e8ea81
        }}>
            {/* Status Glow Halo */}
            <div className="liquid-halo" style={{
                position: 'absolute',
                top: '-20px',
                right: '-20px',
                width: '120px',
                height: '120px',
<<<<<<< HEAD
                background: `radial-gradient(circle, ${displayConfig.glow} 0%, transparent 70%)`,
=======
                background: `radial-gradient(circle, ${config.color}33 0%, transparent 70%)`,
>>>>>>> 9ae60d9221524837ae9c85de99a786d113e8ea81
                filter: 'blur(20px)',
                zIndex: 0
            }} />
            <div style={{ position: 'relative', zIndex: 1 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
                    <h3 style={{ fontSize: '1.4rem', color: 'var(--text-vibrant)' }}>{project.name}</h3>
<<<<<<< HEAD
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        {isOverBudget && (
                            <span style={{ fontSize: '1.2rem', color: '#ef4444', animation: 'pulse 2s infinite' }} title="Over Budget">
                                ⚠
                            </span>
                        )}
                        <span style={{
                            fontSize: '0.65rem',
                            fontWeight: 800,
                            padding: '4px 10px',
                            borderRadius: '20px',
                            color: config.color,
                            background: config.bg,
                            border: `1px solid ${config.color}44`,
                            textTransform: 'uppercase',
                            letterSpacing: '0.05em'
                        }}>
                            {project.status}
                        </span>
                    </div>
=======
                    <span style={{
                        fontSize: '0.65rem',
                        fontWeight: 800,
                        padding: '4px 10px',
                        borderRadius: '20px',
                        color: config.color,
                        background: config.bg,
                        border: `1px solid ${config.color}44`,
                        textTransform: 'uppercase',
                        letterSpacing: '0.05em'
                    }}>
                        {project.status}
                    </span>
>>>>>>> 9ae60d9221524837ae9c85de99a786d113e8ea81
                </div>

                {/* Financial Snapshot */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '12px' }}>
                    <div>
                        <p style={{ fontSize: '0.7rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Profit / Loss</p>
                        <p style={{ fontSize: '1.2rem', fontWeight: 700, color: profit >= 0 ? 'var(--accent-success)' : '#f87171' }}>
                            {profit >= 0 ? '+' : ''}${profit.toLocaleString()}
                        </p>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                        <p style={{ fontSize: '0.7rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Revenue</p>
                        <p style={{ fontSize: '1.2rem', fontWeight: 700, color: 'var(--text-vibrant)' }}>
                            ${totalRevenue.toLocaleString()}
                        </p>
                    </div>
                </div>

                {/* Burn Rate / Budget Bar */}
                <div style={{ marginTop: '16px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.7rem', color: 'var(--text-clinical)', marginBottom: '6px' }}>
                        <span>Burn Rate</span>
                        <span style={{ color: isOverBudget ? '#ef4444' : 'var(--text-muted)' }}>
                            ${totalCosts} / ${project.monthly_budget}
                        </span>
                    </div>
                    <div style={{ height: '4px', background: 'rgba(255,255,255,0.05)', borderRadius: '2px', overflow: 'hidden' }}>
                        <div style={{
                            width: `${Math.min(budgetProgress, 100)}%`,
                            height: '100%',
                            background: isOverBudget ? '#ef4444' : 'var(--accent-primary)'
                        }} />
                    </div>
                </div>

                <ProfitRadar project={project} />
            </div>

            <div style={{
                marginTop: '10px',
                paddingTop: '20px',
                borderTop: '1px solid var(--border-glass)',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                position: 'relative',
                zIndex: 1
            }}>
                <div style={{ display: 'flex', gap: '8px', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                    <span>✅ {project.checklist?.filter(i => i.done).length || 0} Tasked</span>
                    {project.prediction && (
                        <span style={{
                            color: project.prediction.status === 'critical' ? '#ef4444' :
                                project.prediction.status === 'warning' ? '#fbbf24' : 'var(--text-muted)',
                            fontWeight: 600
                        }}>
                            • {project.prediction.message}
                        </span>
                    )}
                </div>
<<<<<<< HEAD
                <div style={{ display: 'flex', gap: '8px' }}>
                    {project.url && (
                        <a
                            href={project.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{
                                background: 'rgba(56, 189, 248, 0.1)',
                                border: '1px solid var(--border-glass)',
                                color: 'var(--accent-primary)',
                                padding: '6px 12px',
                                borderRadius: '10px',
                                fontSize: '0.75rem',
                                fontWeight: 600,
                                textDecoration: 'none',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '4px',
                                transition: 'var(--transition-premium)'
                            }}
                        >
                            <span>󰖟</span> Visit
                        </a>
                    )}
                    <button style={{
                        background: 'rgba(255,255,255,0.03)',
                        border: '1px solid var(--border-glass)',
                        color: 'var(--text-clinical)',
                        padding: '6px 16px',
                        borderRadius: '10px',
                        fontSize: '0.75rem',
                        fontWeight: 600,
                        cursor: 'pointer',
                        transition: 'var(--transition-premium)'
                    }}>
                        Manage
                    </button>
                </div>
=======
                <button style={{
                    background: 'rgba(255,255,255,0.03)',
                    border: '1px solid var(--border-glass)',
                    color: 'var(--text-clinical)',
                    padding: '6px 16px',
                    borderRadius: '10px',
                    fontSize: '0.75rem',
                    fontWeight: 600,
                    cursor: 'pointer',
                    transition: 'var(--transition-premium)'
                }}>
                    Manage
                </button>
>>>>>>> 9ae60d9221524837ae9c85de99a786d113e8ea81
            </div>
        </div>
    );
}
