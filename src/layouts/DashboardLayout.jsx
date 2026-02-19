import { useState, useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import CommandPalette from "../components/CommandPalette";
import ServiceConnector from "../components/ServiceConnector";
import ProjectForm from "../components/ProjectForm"; // Use ProjectForm here if it's a global modal
import { useAuth } from "../context/AuthContext";
import { useSupabaseData } from "../hooks/useSupabase";
import { XP_CONFIG } from "../constants";

export default function DashboardLayout() {
    const { user: authUser, signOut } = useAuth();
    const { projects, profile, loading: dataLoading, addProject, updateXp } = useSupabaseData(authUser?.id);
    const navigate = useNavigate();

    // --- State Management ---
    const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false);
    const [isServiceModalOpen, setIsServiceModalOpen] = useState(false);
    const [showForm, setShowForm] = useState(false);
    const [notifications, setNotifications] = useState([]);

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

    const notify = (message, title) => {
        const id = Date.now();
        setNotifications(prev => [...prev.slice(-2), { id, message, title }]);
        setTimeout(() => setNotifications(prev => prev.filter(n => n.id !== id)), 4000);
    };

    const handleAddXp = async (amount, reason) => {
        if (profile) {
            const newXp = (profile.xp || 0) + amount;
            await updateXp(newXp);
            notify(`+${amount} XP: ${reason}`, "XP Gained");
        }
    };

    const handleAddProject = async (newProject) => {
        await addProject(newProject);
        setShowForm(false);
        handleAddXp(XP_CONFIG?.CHECKLIST_ITEM || 10, "New Initiative Launched");
    };

    const handleExportData = () => {
        const dataToExport = {
            profile,
            projects,
            exportDate: new Date().toISOString(),
            appVersion: "1.0.0"
        };

        const blob = new Blob([JSON.stringify(dataToExport, null, 2)], { type: "application/json" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `shipstack_export_${new Date().toISOString().split('T')[0]}.json`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
        notify("Data export started", "Exporting...");
    };

    if (dataLoading) {
        return (
            <div style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#020617', color: 'var(--accent-primary)' }}>
                <p className="pulse-primary">INITIALIZING VIBE ENGINE...</p>
            </div>
        );
    }

    return (
        <div className="dashboard-layout">
            <Sidebar
                user={profile || { xp: 0, level: 1, streak: 0 }}
                onExport={handleExportData}
            />

            <main className="main-content">
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
                    <div style={{ display: 'flex', gap: '12px' }}>
                        <button className="premium-btn" onClick={() => signOut()} style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)' }}>
                            Sign Out
                        </button>
                        <button className="premium-btn pulse-primary" onClick={() => setShowForm(true)}>
                            <span>󰐕</span> New Project
                        </button>
                    </div>
                </header>

                {/* Render the specific page content here */}
                <Outlet context={{ projects, profile, notify, setIsServiceModalOpen, setShowForm }} />

                {showForm && <ProjectForm onAdd={handleAddProject} onCancel={() => setShowForm(false)} />}

                <CommandPalette
                    isOpen={isCommandPaletteOpen}
                    onClose={() => setIsCommandPaletteOpen(false)}
                    projects={projects}
                    onAction={(action) => {
                        if (action.id === 'new-project') setShowForm(true);
                        if (action.id === 'log-cost') setIsServiceModalOpen(true);
                        if (action.id === 'log-revenue') setIsServiceModalOpen(true);
                        if (action.id === 'home') navigate("/");
                        if (action.id === 'portfolio') navigate("/portfolio");
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
