export default function Sidebar({ user = { xp: 450, level: 1, streak: 3 } }) {
    const links = [
        { name: 'Dashboard', icon: '󰕒', active: true },
        { name: 'Portfolio', icon: '󰲋', active: false },
        { name: 'Intelligence', icon: '󰒓', active: false },
    ];

    const levels = [
        { level: 1, minXp: 0, title: "Newbie" },
        { level: 2, minXp: 1000, title: "Hobbyist" }
    ];

    const currentLevel = levels.findLast(l => user.xp >= l.minXp) || levels[0];
    const nextLevel = levels[currentLevel.level] || { minXp: currentLevel.minXp * 2 };
    const progress = ((user.xp - currentLevel.minXp) / (nextLevel.minXp - currentLevel.minXp)) * 100;

    return (
        <div className="glass-surface animate-slide-right" style={{
            width: '280px',
            height: 'calc(100vh - 40px)',
            position: 'sticky',
            top: '20px',
            left: '20px',
            padding: '30px 20px',
            display: 'flex',
            flexDirection: 'column',
            gap: '40px',
            borderRadius: '24px',
            border: '1px solid var(--border-glass)',
            background: 'rgba(15, 23, 42, 0.3)',
        }}>
            <div style={{ padding: '0 10px' }}>
                <h1 className="gradient-text" style={{ fontSize: '1.8rem', margin: 0 }}>Arkhe</h1>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '12px' }}>
                    <span style={{
                        fontSize: '0.65rem',
                        fontWeight: 800,
                        padding: '2px 6px',
                        borderRadius: '4px',
                        background: 'var(--accent-primary)',
                        color: 'var(--bg-dark)'
                    }}>
                        LVL {user.level}
                    </span>
                    <span style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-vibrant)' }}>{currentLevel.title}</span>
                </div>

                {/* XP Bar */}
                <div style={{ marginTop: '12px' }}>
                    <div style={{ height: '6px', background: 'rgba(255,255,255,0.05)', borderRadius: '3px', overflow: 'hidden' }}>
                        <div style={{ width: `${progress}%`, height: '100%', background: 'linear-gradient(90deg, var(--accent-primary), var(--accent-secondary))' }} />
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '6px', fontSize: '0.65rem', color: 'var(--text-muted)' }}>
                        <span>{user.xp} XP</span>
                        <span>{nextLevel.minXp} XP</span>
                    </div>
                </div>
            </div>

            <nav style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {links.map((link) => (
                    <div
                        key={link.name}
                        style={{
                            padding: '12px 16px',
                            borderRadius: '12px',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '12px',
                            transition: 'var(--transition-premium)',
                            background: link.active ? 'rgba(56, 189, 248, 0.1)' : 'transparent',
                            color: link.active ? 'var(--accent-primary)' : 'var(--text-clinical)',
                            border: link.active ? '1px solid var(--border-active)' : '1px solid transparent',
                        }}
                    >
                        <span style={{ fontSize: '1.2rem' }}>{link.icon}</span>
                        <span style={{ fontWeight: 500 }}>{link.name}</span>
                    </div>
                ))}
            </nav>

            <div style={{ marginTop: 'auto', padding: '20px', borderRadius: '16px', background: 'rgba(56, 189, 248, 0.05)', border: '1px solid var(--border-glass)' }}>
                <p style={{ fontSize: '0.75rem', color: 'var(--text-clinical)', marginBottom: '8px', display: 'flex', justifyContent: 'space-between' }}>
                    <span>Ship Streak</span>
                    <span style={{ color: '#fbbf24' }}>🔥 {user.streak} Days</span>
                </p>
                <div style={{ display: 'flex', gap: '4px' }}>
                    {[1, 2, 3, 4, 5, 6, 7].map(i => (
                        <div key={i} style={{
                            flex: 1,
                            height: '4px',
                            borderRadius: '2px',
                            background: i <= user.streak ? '#fbbf24' : 'rgba(255,255,255,0.1)'
                        }} />
                    ))}
                </div>
            </div>
        </div>
    );
}
