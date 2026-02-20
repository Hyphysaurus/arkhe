import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./components/Login";

export default function App() {
  return (
    <BrowserRouter>
      {/* 
        NO CONTEXT PROVIDER YET.
        Just testing if Routes + Login Component can mount without crashing.
      */}
      <div style={{ background: '#0f172a', minHeight: '100vh', color: 'white' }}>
        <Routes>
          <Route path="/" element={
            <div style={{ padding: 50 }}>
              <h1>ROUTER IS WORKING</h1>
              <p>Path is /</p>
              <a href="/login" style={{ color: 'skyblue' }}>Go to Login</a>
            </div>
          } />
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}
