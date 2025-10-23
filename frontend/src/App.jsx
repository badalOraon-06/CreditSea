import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <header className="app-header">
          <h1>🏦 CreditSea</h1>
          <p>Credit Report Analyzer</p>
        </header>

        <main className="app-main">
          <Routes>
            <Route path="/" element={
              <div className="welcome-section">
                <h2>Welcome to CreditSea</h2>
                <p>Upload and analyze Experian credit reports</p>
                <div className="feature-cards">
                  <div className="card">
                    <h3>📤 Upload XML</h3>
                    <p>Upload Experian XML files securely</p>
                  </div>
                  <div className="card">
                    <h3>📊 Analyze</h3>
                    <p>Extract and process credit data</p>
                  </div>
                  <div className="card">
                    <h3>📈 Report</h3>
                    <p>View comprehensive credit reports</p>
                  </div>
                </div>
              </div>
            } />
            {/* We'll add more routes later */}
          </Routes>
        </main>

        <footer className="app-footer">
          <p>CreditSea © 2025 - MERN Stack Project</p>
        </footer>
      </div>
    </Router>
  );
}

export default App;
