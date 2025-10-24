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
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-background">
          <div className="gradient-orb orb-1"></div>
          <div className="gradient-orb orb-2"></div>
          <div className="gradient-orb orb-3"></div>
        </div>
        
        <div className="hero-content">
          <div className="hero-badge">
            <span className="badge-icon">✨</span>
            <span>Credit Report Analysis</span>
          </div>
          
          <h1 className="hero-title">
            Credit Report
            <span className="gradient-text"> Analysis Tool</span>
          </h1>
          
          <p className="hero-description">
            Upload and analyze Experian XML credit reports with ease.
          </p>
          
          <div className="hero-buttons">
            <Link to="/upload" className="btn btn-hero-primary">
              <span className="btn-icon">�</span>
              <span>Upload Report</span>
            </Link>
            <Link to="/reports" className="btn btn-hero-secondary">
              <span className="btn-icon">📊</span>
              <span>View Reports</span>
            </Link>
          </div>
          
          <div className="hero-stats">
            <div className="stat-item">
              <div className="stat-number">Secure</div>
              <div className="stat-label">Data Storage</div>
            </div>
            <div className="stat-divider"></div>
            <div className="stat-item">
              <div className="stat-number">Fast</div>
              <div className="stat-label">Processing</div>
            </div>
            <div className="stat-divider"></div>
            <div className="stat-item">
              <div className="stat-number">Detailed</div>
              <div className="stat-label">Analysis</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <div className="section-container">
          <div className="section-header">
            <h2 className="section-title">Key Features</h2>
            <p className="section-subtitle">
              Everything you need for credit report analysis
            </p>
          </div>
          
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-card-inner">
                <div className="feature-icon-wrapper">
                  <div className="feature-icon">📤</div>
                </div>
                <h3 className="feature-title">Upload XML Files</h3>
                <p className="feature-description">
                  Upload Experian credit report XML files up to 10MB.
                </p>
              </div>
            </div>

            <div className="feature-card feature-card-highlighted">
              <div className="feature-card-inner">
                <div className="feature-icon-wrapper">
                  <div className="feature-icon">🔍</div>
                </div>
                <h3 className="feature-title">Parse Data</h3>
                <p className="feature-description">
                  Automatically extract credit scores, accounts, and payment history.
                </p>
              </div>
            </div>

            <div className="feature-card">
              <div className="feature-card-inner">
                <div className="feature-icon-wrapper">
                  <div className="feature-icon">�</div>
                </div>
                <h3 className="feature-title">View Reports</h3>
                <p className="feature-description">
                  Access detailed credit information in an easy-to-read format.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="how-it-works-section">
        <div className="section-container">
          <div className="section-header">
            <h2 className="section-title">How It Works</h2>
            <p className="section-subtitle">
              Three simple steps to analyze your credit report
            </p>
          </div>
          
          <div className="steps-container">
            <div className="step-card">
              <div className="step-number-wrapper">
                <div className="step-number">1</div>
                <div className="step-line"></div>
              </div>
              <div className="step-content">
                <div className="step-icon">📁</div>
                <h4 className="step-title">Upload XML File</h4>
                <p className="step-description">
                  Select your Experian credit report XML file.
                </p>
              </div>
            </div>

            <div className="step-card">
              <div className="step-number-wrapper">
                <div className="step-number">2</div>
                <div className="step-line"></div>
              </div>
              <div className="step-content">
                <div className="step-icon">⚙️</div>
                <h4 className="step-title">Process Data</h4>
                <p className="step-description">
                  System extracts credit information automatically.
                </p>
              </div>
            </div>

            <div className="step-card">
              <div className="step-number-wrapper">
                <div className="step-number">3</div>
              </div>
              <div className="step-content">
                <div className="step-icon">📈</div>
                <h4 className="step-title">View Results</h4>
                <p className="step-description">
                  Access your complete credit report analysis.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="cta-container">
          <div className="cta-content">
            <h2 className="cta-title">Start Analyzing</h2>
            <p className="cta-description">
              Upload your credit report and get detailed insights
            </p>
            <Link to="/upload" className="btn btn-cta">
              <span>Upload Now</span>
              <span className="btn-arrow">→</span>
            </Link>
          </div>
          <div className="cta-decoration">
            <div className="decoration-circle circle-1"></div>
            <div className="decoration-circle circle-2"></div>
            <div className="decoration-circle circle-3"></div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default App;
