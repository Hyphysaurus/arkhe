import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { AppProvider } from './context/AppContext';
import { Landing } from './pages/Landing';
import { DashboardLayout } from './layouts/DashboardLayout';
import { Dashboard } from './pages/Dashboard';
import { ProjectDetail } from './pages/ProjectDetail';
import { Analytics } from './pages/Analytics';
import { Achievements } from './pages/Achievements';
import { Settings } from './pages/Settings';
import { Integrations } from './pages/Integrations';
import { Snippets } from './pages/Snippets';
import Learn from './pages/Learn';

export default function App() {
  return (
    <HashRouter>
      <ThemeProvider>
        <AppProvider>

          <Routes>

            {/* Landing page FIRST */}
            <Route path="/" element={<Landing />} />

            {/* Dashboard Layout wrapper */}
            <Route path="/" element={<DashboardLayout />}>

              <Route path="dashboard" element={<Dashboard />} />
              <Route path="project/:id" element={<ProjectDetail />} />
              <Route path="analytics" element={<Analytics />} />
              <Route path="achievements" element={<Achievements />} />
              <Route path="integrations" element={<Integrations />} />
              <Route path="snippets" element={<Snippets />} />
              <Route path="learn" element={<Learn />} />
              <Route path="settings" element={<Settings />} />

            </Route>

            {/* fallback */}
            <Route path="*" element={<Navigate to="/" replace />} />

          </Routes>

        </AppProvider>
      </ThemeProvider>
    </HashRouter>
  );
}