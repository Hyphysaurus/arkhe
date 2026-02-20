import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import DashboardLayout from "./layouts/DashboardLayout";
import Dashboard from "./pages/Dashboard";
import Portfolio from "./pages/Portfolio";
import Intelligence from "./pages/Intelligence";
import Login from "./components/Login";
import { AuthProvider, useAuth } from "./context/AuthContext";

function AuthGate() {
  // const { user, loading } = useAuth();
  const user = null;
  const loading = false;

  /*
    if (loading) return (
      <div style={{ height: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', background: '#1e3a8a', color: 'white', fontFamily: 'monospace' }}>
        <h1>LOADING...</h1>
        <p style={{ opacity: 0.7, marginTop: '20px' }}>Waiting for Supabase Auth...</p>
        <p style={{ fontSize: '0.8rem', opacity: 0.5 }}>If this persists for &gt;3s, a timeout should trigger.</p>
      </div>
    );
  */

  if (!user) return <Login />;

  return (
    <Routes>
      <Route path="/" element={<DashboardLayout />}>
        <Route index element={<Dashboard />} />
        <Route path="portfolio" element={<Portfolio />} />
        <Route path="intelligence" element={<Intelligence />} />
      </Route>
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AuthGate />
      </AuthProvider>
    </BrowserRouter>
  );
}
