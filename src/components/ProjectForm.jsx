import { useState } from "react";

export default function ProjectForm({ onAdd, onCancel }) {
    const [name, setName] = useState("");
    const [budget, setBudget] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!name) return;
        onAdd({
            name,
            budget: Number(budget) || 0,
            status: "Planning",
            tasks: []
        });
    };

    return (
        <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            background: 'rgba(2, 6, 23, 0.8)',
            backdropFilter: 'blur(8px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000,
            padding: '20px'
        }}>
            <div className="glass-surface" style={{
                maxWidth: '500px',
                width: '100%',
                padding: '40px',
                background: 'var(--bg-dark)',
                boxShadow: '0 0 100px rgba(56, 189, 248, 0.1)'
            }}>
                <h2 style={{ fontSize: '2rem', marginBottom: '8px' }}>New Initiative</h2>
                <p style={{ color: 'var(--text-muted)', marginBottom: '32px' }}>Define the parameters for your next SaaS venture.</p>

                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                        <label style={{ color: 'var(--text-clinical)', fontSize: '0.85rem', fontWeight: 500 }}>PROJECT NAME</label>
                        <input
                            type="text"
                            autoFocus
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="e.g. Project Arkhe"
                            style={{
                                background: 'rgba(255, 255, 255, 0.03)',
                                border: '1px solid var(--border-glass)',
                                borderRadius: '12px',
                                padding: '14px',
                                color: 'white',
                                fontSize: '1rem',
                                outline: 'none',
                                transition: 'var(--transition-premium)'
                            }}
                            onFocus={e => e.target.style.borderColor = 'var(--accent-primary)'}
                            onBlur={e => e.target.style.borderColor = 'var(--border-glass)'}
                        />
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                        <label style={{ color: 'var(--text-clinical)', fontSize: '0.85rem', fontWeight: 500 }}>MONTHLY BUDGET ($)</label>
                        <input
                            type="number"
                            value={budget}
                            onChange={(e) => setBudget(e.target.value)}
                            placeholder="100"
                            style={{
                                background: 'rgba(255, 255, 255, 0.03)',
                                border: '1px solid var(--border-glass)',
                                borderRadius: '12px',
                                padding: '14px',
                                color: 'white',
                                fontSize: '1rem',
                                outline: 'none'
                            }}
                        />
                    </div>

                    <div style={{ display: 'flex', gap: '16px', marginTop: '12px' }}>
                        <button type="submit" className="premium-btn" style={{ flex: 2, justifyContent: 'center' }}>
                            Launch Mission
                        </button>
                        <button
                            type="button"
                            onClick={onCancel}
                            style={{
                                flex: 1,
                                background: 'transparent',
                                border: '1px solid var(--border-glass)',
                                color: 'var(--text-clinical)',
                                borderRadius: '12px',
                                cursor: 'pointer',
                                fontWeight: 600
                            }}
                        >
                            Abort
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
