import { useState } from "react";

export default function ServiceConnector({ isOpen, onClose, onConnect }) {
    const services = [
        { id: 'stripe', name: 'Stripe', icon: '󰈀', color: '#635bff', description: 'Auto-track revenue & payouts' },
        { id: 'vercel', name: 'Vercel', icon: '󱓞', color: '#ffffff', description: 'Monitor deployment costs' },
        { id: 'aws', name: 'AWS', icon: '󰅟', color: '#ff9900', description: 'Cloud infrastructure burn' },
        { id: 'openai', name: 'OpenAI', icon: '󰬃', color: '#10a37f', description: 'LLM token consumption' }
    ];

    if (!isOpen) return null;

    return (
        <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            background: 'rgba(2, 6, 23, 0.9)',
            backdropFilter: 'blur(12px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 20000,
            padding: '20px'
        }}>
            <div className="glass-surface animate-fade-up" style={{
                maxWidth: '550px',
                width: '100%',
                padding: '40px',
                background: 'var(--bg-dark)',
                boxShadow: '0 0 100px rgba(56, 189, 248, 0.1)'
            }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                    <h2 style={{ fontSize: '2rem', margin: 0 }}>Service Command</h2>
                    <button onClick={onClose} style={{ background: 'transparent', border: 'none', color: 'var(--text-muted)', fontSize: '1.5rem', cursor: 'pointer' }}>󰅖</button>
                </div>
                <p style={{ color: 'var(--text-muted)', marginBottom: '32px' }}>Link your infrastructure for automated vibe-tracking.</p>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    {services.map(s => (
                        <div
                            key={s.id}
                            className="glass-surface"
                            onClick={() => onConnect(s)}
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '20px',
                                padding: '20px',
                                cursor: 'pointer',
                                transition: 'var(--transition-premium)',
                                border: '1px solid rgba(255,255,255,0.05)',
                                background: 'rgba(255,255,255,0.02)'
                            }}
                        >
                            <div style={{
                                width: '48px',
                                height: '48px',
                                borderRadius: '12px',
                                background: `${s.color}22`,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                fontSize: '1.8rem',
                                color: s.color,
                                border: `1px solid ${s.color}44`
                            }}>
                                {s.icon}
                            </div>
                            <div style={{ flex: 1 }}>
                                <p style={{ fontWeight: 600, color: 'white' }}>{s.name}</p>
                                <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{s.description}</p>
                            </div>
                            <span style={{ color: 'var(--text-muted)', fontSize: '1.2rem' }}>󰁔</span>
                        </div>
                    ))}
                </div>

                <button
                    onClick={onClose}
                    style={{
                        width: '100%',
                        marginTop: '32px',
                        padding: '16px',
                        background: 'transparent',
                        border: '1px solid var(--border-glass)',
                        color: 'var(--text-clinical)',
                        borderRadius: '14px',
                        fontWeight: 600,
                        cursor: 'pointer'
                    }}
                >
                    Close Dashboard
                </button>
            </div>
        </div>
    );
}
