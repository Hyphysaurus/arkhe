import { useState, useEffect, useCallback } from "react";

export default function CommandPalette({ isOpen, onClose, projects, onAction }) {
    const [query, setQuery] = useState("");
    const [selectedIndex, setSelectedIndex] = useState(0);

    const actions = [
        { id: 'new-project', name: 'Launch New Project', icon: '🚀', category: 'Actions' },
        { id: 'log-cost', name: 'Log Expense/Burn', icon: '💸', category: 'Finance' },
        { id: 'log-revenue', name: 'Log Revenue/Win', icon: '💰', category: 'Finance' },
        ...projects.map(p => ({ id: `proj-${p.id}`, name: `Manage ${p.name}`, icon: '🔨', category: 'Projects', project: p }))
    ];

    const filteredActions = actions.filter(a =>
        a.name.toLowerCase().includes(query.toLowerCase()) ||
        a.category.toLowerCase().includes(query.toLowerCase())
    );

    const handleKeyDown = useCallback((e) => {
        if (e.key === "ArrowDown") {
            setSelectedIndex(prev => (prev + 1) % filteredActions.length);
        } else if (e.key === "ArrowUp") {
            setSelectedIndex(prev => (prev - 1 + filteredActions.length) % filteredActions.length);
        } else if (e.key === "Enter") {
            onAction(filteredActions[selectedIndex]);
            onClose();
        } else if (e.key === "Escape") {
            onClose();
        }
    }, [filteredActions, selectedIndex, onAction, onClose]);

    useEffect(() => {
        if (isOpen) {
            window.addEventListener("keydown", handleKeyDown);
            setQuery("");
            setSelectedIndex(0);
        }
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [isOpen, handleKeyDown]);

    if (!isOpen) return null;

    return (
        <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            background: 'rgba(2, 6, 23, 0.4)',
            backdropFilter: 'blur(4px)',
            display: 'flex',
            alignItems: 'flex-start',
            justifyContent: 'center',
            paddingTop: '15vh',
            zIndex: 10000
        }} onClick={onClose}>
            <div
                className="glass-surface"
                style={{
                    width: '600px',
                    background: 'rgba(15, 23, 42, 0.95)',
                    padding: '8px',
                    boxShadow: '0 20px 50px rgba(0,0,0,0.5)',
                    border: '1px solid rgba(255,255,255,0.1)'
                }}
                onClick={e => e.stopPropagation()}
            >
                <div style={{ padding: '16px', display: 'flex', alignItems: 'center', gap: '12px', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                    <span style={{ fontSize: '1.2rem', color: 'var(--accent-primary)' }}>󰍉</span>
                    <input
                        autoFocus
                        placeholder="Type a command or search projects..."
                        value={query}
                        onChange={e => setQuery(e.target.value)}
                        style={{
                            background: 'transparent',
                            border: 'none',
                            color: 'white',
                            fontSize: '1.1rem',
                            outline: 'none',
                            width: '100%'
                        }}
                    />
                </div>

                <div style={{ maxHeight: '400px', overflowY: 'auto', padding: '8px' }}>
                    {filteredActions.map((action, index) => (
                        <div
                            key={action.id}
                            style={{
                                padding: '12px 16px',
                                borderRadius: '8px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                                cursor: 'pointer',
                                background: index === selectedIndex ? 'rgba(56, 189, 248, 0.1)' : 'transparent',
                                transition: 'var(--transition-premium)'
                            }}
                            onMouseEnter={() => setSelectedIndex(index)}
                            onClick={() => {
                                onAction(action);
                                onClose();
                            }}
                        >
                            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                <span style={{ fontSize: '1.2rem' }}>{action.icon}</span>
                                <div>
                                    <p style={{ color: 'white', fontWeight: 500, fontSize: '0.95rem' }}>{action.name}</p>
                                    <p style={{ color: 'var(--text-muted)', fontSize: '0.75rem' }}>{action.category}</p>
                                </div>
                            </div>
                            {index === selectedIndex && (
                                <span style={{ fontSize: '0.7rem', color: 'var(--accent-primary)', fontWeight: 800 }}>ENTER 󰌑</span>
                            )}
                        </div>
                    ))}
                    {filteredActions.length === 0 && (
                        <p style={{ padding: '20px', textAlign: 'center', color: 'var(--text-muted)' }}>No commands found.</p>
                    )}
                </div>

                <div style={{ padding: '12px 16px', borderTop: '1px solid rgba(255,255,255,0.05)', display: 'flex', gap: '16px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                        <span style={{ padding: '2px 4px', background: 'rgba(255,255,255,0.1)', borderRadius: '4px', fontSize: '0.7rem' }}>↑↓</span>
                        <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>Navigate</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                        <span style={{ padding: '2px 4px', background: 'rgba(255,255,255,0.1)', borderRadius: '4px', fontSize: '0.7rem' }}>ESC</span>
                        <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>Close</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
