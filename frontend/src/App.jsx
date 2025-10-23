import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import UploadPage from './pages/UploadPage';
import ReportListPage from './pages/ReportListPage';
import ReportDetailsPage from './pages/ReportDetailsPage';
import './App.css';

function App() {
  return (
    <Router>
      <div className="app">
        {/* Navigation */}
        <nav className="navbar">
          <div className="navbar-container">
            <Link to="/" className="navbar-logo">
              📊 CreditSea
            </Link>
            <div className="navbar-menu">
              <Link to="/" className="navbar-link">
                Home
              </Link>
              <Link to="/upload" className="navbar-link">
                Upload
              </Link>
              <Link to="/reports" className="navbar-link">
                Reports
              </Link>
            </div>
          </div>
        </nav>

        {/* Routes */}
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/upload" element={<UploadPage />} />
          <Route path="/reports" element={<ReportListPage />} />
          <Route path="/reports/:id" element={<ReportDetailsPage />} />
        </Routes>
      </div>
    </Router>
  );
}

// Home Page Component
function HomePage() {
  return (
    <div className="home-page">
      <div className="home-container">
        <div className="home-content">
          <h1 className="home-title">
            Welcome to <span className="gradient-text">CreditSea</span>
          </h1>
          <p className="home-subtitle">
            Analyze Experian XML Credit Reports with Ease
          </p>
          
          <div className="features">
            <div className="feature-card">
              <div className="feature-icon">📤</div>
              <h3>Upload XML</h3>
              <p>Upload your Experian credit report XML files securely</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🔍</div>
              <h3>Parse Data</h3>
              <p>Automatically extract and structure credit information</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">📊</div>
              <h3>View Reports</h3>
              <p>Visualize credit scores, accounts, and payment history</p>
            </div>
          </div>

          <div className="cta-buttons">
            <Link to="/upload" className="btn btn-primary btn-large">
              🚀 Upload Your First Report
            </Link>
            <Link to="/reports" className="btn btn-secondary btn-large">
              � View All Reports
            </Link>
          </div>

          <div className="info-section">
            <h2>How It Works</h2>
            <div className="steps">
              <div className="step">
                <div className="step-number">1</div>
                <div className="step-content">
                  <h4>Upload XML File</h4>
                  <p>Select and upload your Experian XML credit report</p>
                </div>
              </div>
              <div className="step">
                <div className="step-number">2</div>
                <div className="step-content">
                  <h4>Automatic Processing</h4>
                  <p>Our system parses and extracts all credit information</p>
                </div>
              </div>
              <div className="step">
                <div className="step-number">3</div>
                <div className="step-content">
                  <h4>View Insights</h4>
                  <p>Access detailed credit reports and analysis</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
