import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getAllReports } from '../services/api';
import './ReportListPage.css';

const ReportListPage = () => {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    fetchReports();
  }, [page]);

  const fetchReports = async () => {
    setLoading(true);
    setError('');
    
    try {
      const response = await getAllReports({ page, limit: 10 });
      setReports(response.data);
      setTotalPages(response.pages);
      console.log('Reports loaded:', response.count);
    } catch (err) {
      console.error('Error fetching reports:', err);
      setError('Failed to load reports. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const getCreditScoreColor = (score) => {
    if (score >= 750) return 'excellent';
    if (score >= 650) return 'good';
    if (score >= 550) return 'fair';
    return 'poor';
  };

  const getCreditScoreLabel = (score) => {
    if (score >= 750) return 'Excellent';
    if (score >= 650) return 'Good';
    if (score >= 550) return 'Fair';
    return 'Needs Improvement';
  };

  if (loading) {
    return (
      <div className="report-list-page">
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Loading reports...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="report-list-page">
        <div className="error-container">
          <div className="error-icon">❌</div>
          <h2>Error Loading Reports</h2>
          <p>{error}</p>
          <button onClick={fetchReports} className="btn btn-primary">
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="report-list-page">
      <div className="reports-container">
        <div className="reports-header">
          <h1>📊 Credit Reports</h1>
          <p>View all uploaded credit reports</p>
        </div>

        {reports.length === 0 ? (
          <div className="no-reports">
            <div className="no-reports-icon">📭</div>
            <h2>No Reports Found</h2>
            <p>Upload an XML file to get started</p>
            <Link to="/upload" className="btn btn-primary">
              Upload Report
            </Link>
          </div>
        ) : (
          <>
            <div className="reports-grid">
              {reports.map((report) => (
                <Link
                  key={report._id}
                  to={`/reports/${report._id}`}
                  className="report-card"
                >
                  <div className="report-card-header">
                    <div className="report-name">
                      <h3>{report.basicDetails.fullName}</h3>
                      <p className="report-pan">{report.basicDetails.pan}</p>
                    </div>
                    <div className={`credit-score ${getCreditScoreColor(report.creditScore.score)}`}>
                      <div className="score-value">{report.creditScore.score}</div>
                      <div className="score-label">{getCreditScoreLabel(report.creditScore.score)}</div>
                    </div>
                  </div>

                  <div className="report-card-body">
                    <div className="report-stat">
                      <span className="stat-icon">💳</span>
                      <div className="stat-content">
                        <div className="stat-value">{report.reportSummary.totalAccounts}</div>
                        <div className="stat-label">Total Accounts</div>
                      </div>
                    </div>

                    <div className="report-stat">
                      <span className="stat-icon">✅</span>
                      <div className="stat-content">
                        <div className="stat-value">{report.reportSummary.activeAccounts}</div>
                        <div className="stat-label">Active</div>
                      </div>
                    </div>

                    <div className="report-stat">
                      <span className="stat-icon">💰</span>
                      <div className="stat-content">
                        <div className="stat-value">
                          ₹{(report.reportSummary.currentBalance / 1000).toFixed(0)}K
                        </div>
                        <div className="stat-label">Balance</div>
                      </div>
                    </div>
                  </div>

                  <div className="report-card-footer">
                    <span className="report-date">
                      📅 {new Date(report.uploadDate).toLocaleDateString('en-IN', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric'
                      })}
                    </span>
                    <span className="report-link-icon">→</span>
                  </div>
                </Link>
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="pagination">
                <button
                  onClick={() => setPage(p => Math.max(1, p - 1))}
                  disabled={page === 1}
                  className="btn btn-secondary"
                >
                  ← Previous
                </button>
                <span className="page-info">
                  Page {page} of {totalPages}
                </span>
                <button
                  onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                  disabled={page === totalPages}
                  className="btn btn-secondary"
                >
                  Next →
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default ReportListPage;
