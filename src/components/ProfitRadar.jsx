export default function ProfitRadar({ project }) {
    const costs = project.transactions?.filter(t => t.type === 'Cost') || [];
    const revenues = project.transactions?.filter(t => t.type === 'Revenue') || [];

    const totalCost = costs.reduce((sum, t) => sum + t.amount, 0);
    const totalRevenue = revenues.reduce((sum, t) => sum + t.amount, 0);
    const budget = project.monthly_budget || 100;

    // Visual scaling
    const max = Math.max(budget, totalCost, totalRevenue, 1);
    const scale = (val) => (val / max) * 100;

    return (
        <div style={{ marginTop: '20px', padding: '16px', background: 'rgba(255,255,255,0.02)', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.05)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
                <span style={{ fontSize: '0.65rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Forecast Radar</span>
                <span style={{ fontSize: '0.65rem', color: totalRevenue > totalCost ? 'var(--accent-success)' : 'var(--accent-primary)' }}>
                    {totalRevenue > totalCost ? 'PROFITABLE' : 'GROWTH PHASE'}
                </span>
            </div>

            <svg viewBox="0 0 100 20" style={{ width: '100%', height: '30px', overflow: 'visible' }}>
                {/* Background Track */}
                <rect x="0" y="8" width="100" height="4" rx="2" fill="rgba(255,255,255,0.05)" />

                {/* Budget Marker */}
                <line x1={scale(budget)} y1="4" x2={scale(budget)} y2="16" stroke="rgba(255,255,255,0.2)" strokeWidth="1" strokeDasharray="2,2" />

                {/* Cost Line */}
                <rect x="0" y="8" width={scale(totalCost)} height="4" rx="2" fill="var(--accent-primary)" opacity="0.6" />

                {/* Revenue Glow Line */}
                <rect x="0" y="9" width={scale(totalRevenue)} height="2" rx="1" fill="var(--accent-success)" style={{ filter: 'drop-shadow(0 0 4px var(--accent-success))' }} />

                {/* Tooltip-like markers */}
                <circle cx={scale(totalCost)} cy="10" r="2" fill="var(--accent-primary)" />
                <circle cx={scale(totalRevenue)} cy="10" r="2" fill="var(--accent-success)" />
            </svg>

            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '8px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--accent-primary)' }} />
                    <span style={{ fontSize: '0.6rem', color: 'var(--text-clinical)' }}>Burn</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--accent-success)' }} />
                    <span style={{ fontSize: '0.6rem', color: 'var(--text-clinical)' }}>Revenue</span>
                </div>
            </div>
        </div>
    );
}
