import { useAuth } from "../context/AuthContext";

export default function Login() {
    const { signInWithGithub } = useAuth();

    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            height: '100vh',
            background: '#020617', // Very dark slate/blue
            color: 'white',
            position: 'relative',
            overflow: 'hidden'
        }}>
            {/* Abstract Background Elements */}
            <div style={{
                position: 'absolute',
                top: '-20%',
                left: '-10%',
                width: '50vw',
                height: '50vw',
                background: 'radial-gradient(circle, rgba(0,255,178,0.03) 0%, transparent 60%)',
                borderRadius: '50%',
                zIndex: 0
            }} />
            <div style={{
                position: 'absolute',
                bottom: '-20%',
                right: '-10%',
                width: '60vw',
                height: '60vw',
                background: 'radial-gradient(circle, rgba(179,98,255,0.03) 0%, transparent 60%)',
                borderRadius: '50%',
                zIndex: 0
            }} />

            {/* Login Card */}
            <div className="glass-surface" style={{
                padding: '4rem',
                borderRadius: '24px',
                border: '1px solid rgba(255,255,255,0.08)',
                backdropFilter: 'blur(20px)',
                background: '#064e3b', // Debug Green

                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '24px',
                maxWidth: '450px',
                width: '90%',
                zIndex: 1,
                boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)'
            }}>
                <div style={{ textAlign: 'center' }}>
                    <h1 className="gradient-text" style={{
                        fontSize: '3.5rem',
                        margin: '0 0 8px 0',
                        letterSpacing: '-0.02em',
                        lineHeight: 1
                    }}>
                        ARKHE
                    </h1>
                    <p style={{
                        color: 'var(--text-muted)',
                        fontSize: '1.1rem',
                        margin: 0,
                        fontWeight: 400
                    }}>
                        Vibe Command Center
                    </p>
                </div>

                <div style={{
                    width: '100%',
                    height: '1px',
                    background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent)',
                    margin: '10px 0'
                }} />

                <button
                    onClick={signInWithGithub}
                    className="pulse-primary"
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '12px',
                        background: 'white',
                        color: '#0f172a',
                        border: 'none',
                        padding: '14px 28px',
                        borderRadius: '12px',
                        fontSize: '1rem',
                        fontWeight: 700,
                        cursor: 'pointer',
                        transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
                        width: '100%',
                        justifyContent: 'center'
                    }}
                    onMouseOver={e => {
                        e.currentTarget.style.transform = 'translateY(-2px)';
                        e.currentTarget.style.boxShadow = '0 10px 20px -5px rgba(255, 255, 255, 0.3)';
                    }}
                    onMouseOut={e => {
                        e.currentTarget.style.transform = 'translateY(0)';
                        e.currentTarget.style.boxShadow = 'none';
                    }}
                >
                    <svg height="24" width="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                    </svg>
                    Sign in with GitHub
                </button>

                <p style={{ fontSize: '0.8rem', color: 'var(--text-clinical)', opacity: 0.6 }}>
                    Zero cost. Open source. Forever vibes.
                </p>
            </div>
        </div>
    );
}
