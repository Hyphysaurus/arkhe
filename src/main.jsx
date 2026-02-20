import { StrictMode, Component } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'

// Global error handler for module-level crashes/imports
window.onerror = function (message, source, lineno, colno, error) {
  document.body.innerHTML = `
    <div style="background: #450a0a; color: #fca5a5; padding: 20px; font-family: monospace; height: 100vh;">
      <h1>CRITICAL FAILURE</h1>
      <h3>${message}</h3>
      <p>${source}:${lineno}:${colno}</p>
      <pre>${error?.stack || ''}</pre>
    </div>
  `;
};

import App from './App.jsx'

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    this.setState({ error, errorInfo });
    console.error("Uncaught error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ padding: '40px', color: '#fff', background: '#020617', minHeight: '100vh', fontFamily: 'monospace' }}>
          <h1 style={{ color: '#ef4444' }}>Something went wrong.</h1>
          <details style={{ whiteSpace: 'pre-wrap' }}>
            {this.state.error && this.state.error.toString()}
            <br />
            {this.state.errorInfo && this.state.errorInfo.componentStack}
          </details>
        </div>
      );
    }

    return this.props.children;
  }
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </StrictMode>,
)
