import { useState } from "react";

export default function BudgetModal({ currentBudget, onUpdate, onClose }) {
    const [amount, setAmount] = useState(currentBudget || 1000);

    const handleSubmit = (e) => {
        e.preventDefault();
        onUpdate({ monthly_budget: parseInt(amount, 10) });
        onClose();
    };

    return (
        <div style={{
            position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh',
            background: 'rgba(2, 6, 23, 0.6)', backdropFilter: 'blur(4px)',
            display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 3000
        }} onClick={onClose}>
            <div className="glass-surface animate-fade-up" style={{
                padding: '32px', width: '400px', background: 'rgba(15, 23, 42, 0.95)',
                border: '1px solid rgba(255,255,255,0.1)', borderRadius: '20px'
            }} onClick={e => e.stopPropagation()}>
                <h2 style={{ fontSize: '1.5rem', marginBottom: '8px' }}>Set Global Burn Limit</h2>
                <p style={{ color: 'var(--text-muted)', marginBottom: '24px' }}>
                    What is your maximum safe monthly spend across all projects?
                </p>

                <form onSubmit={handleSubmit}>
                    <div style={{ marginBottom: '24px' }}>
                        <label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--text-clinical)', marginBottom: '8px' }}>MONTHLY BUDGET (USD)</label>
                        <input
                            type="number"
                            value={amount}
                            onChange={e => setAmount(e.target.value)}
                            className="premium-input"
                            autoFocus
                            style={{
                                width: '100%', padding: '12px', background: 'rgba(255,255,255,0.03)',
                                border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px',
                                color: 'white', fontSize: '1.2rem', fontFamily: 'monospace'
                            }}
                        />
                    </div>

                    <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end' }}>
                        <button type="button" onClick={onClose} className="premium-btn" style={{ background: 'transparent', border: '1px solid rgba(255,255,255,0.1)' }}>
                            Cancel
                        </button>
                        <button type="submit" className="premium-btn pulse-primary">
                            Update Limit
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
