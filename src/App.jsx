import { HashRouter, Routes, Route, Navigate } from "react-router-dom";
// import Login from "./components/Login";

export default function App() {
  return (
    <HashRouter>
      <div style={{ background: '#0f172a', minHeight: '100vh', color: 'white' }}>
        <Routes>
          <Route path="/" element={
            <div style={{ padding: 50 }}>
              <h1>HASH ROUTER WORKING</h1>
              <p>React Router v7 + Vite 5</p>
            </div>
          } />
          {/* <Route path="/login" element={<Login />} /> */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </HashRouter>
  );
}
