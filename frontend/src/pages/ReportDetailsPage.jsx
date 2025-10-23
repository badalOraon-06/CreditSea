import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getReportById, deleteReport } from '../services/api';
import './ReportDetailsPage.css';

const ReportDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [report, setReport] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    fetchReport();
  }, [id]);

  const fetchReport = async () => {
    setLoading(true);
    setError('');
    
    try {
      const response = await getReportById(id);
      setReport(response.data);
      console.log('Report loaded:', response.data.basicDetails.fullName);
    } catch (err) {
      console.error('Error fetching report:', err);
      setError('Failed to load report. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm('Are you sure you want to delete this report?')) {
      return;
    }

    setDeleting(true);
    try {
      await deleteReport(id);
      console.log('Report deleted successfully');
      navigate('/reports');
    } catch (err) {
      console.error('Error deleting report:', err);
      alert('Failed to delete report. Please try again.');
      setDeleting(false);
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

  const getAccountStatusBadge = (status) => {
    const statusMap = {
      'ACTIVE': { class: 'active', label: '✓ Active' },
      'CLOSED': { class: 'closed', label: '✗ Closed' },
      'SETTLED': { class: 'settled', label: '✓ Settled' }
    };
    return statusMap[status] || { class: 'unknown', label: status };
  };

  if (loading) {
    return (
      <div className="report-details-page">
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Loading report...</p>
        </div>
      </div>
    );
  }

  if (error || !report) {
    return (
      <div className="report-details-page">
        <div className="error-container">
          <div className="error-icon">❌</div>
          <h2>Error Loading Report</h2>
          <p>{error || 'Report not found'}</p>
          <button onClick={() => navigate('/reports')} className="btn btn-primary">
            Back to Reports
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="report-details-page">
      <div className="details-container">
        {/* Header */}
        <div className="details-header">
          <button onClick={() => navigate('/reports')} className="back-button">
            ← Back to Reports
          </button>
          <button 
            onClick={handleDelete} 
            className="delete-button"
            disabled={deleting}
          >
            {deleting ? '⏳ Deleting...' : '🗑️ Delete Report'}
          </button>
        </div>

        {/* Basic Details Card */}
        <div className="card basic-details-card">
          <div className="card-header">
            <h2>👤 Basic Details</h2>
            <div className={`credit-score-badge ${getCreditScoreColor(report.creditScore.score)}`}>
              <div className="score-value">{report.creditScore.score}</div>
              <div className="score-label">{getCreditScoreLabel(report.creditScore.score)}</div>
            </div>
          </div>
          <div className="card-body">
            <div className="detail-row">
              <span className="detail-label">Full Name</span>
              <span className="detail-value">{report.basicDetails.fullName}</span>
            </div>
            <div className="detail-row">
              <span className="detail-label">PAN</span>
              <span className="detail-value pan-value">{report.basicDetails.pan}</span>
            </div>
            {report.basicDetails.dateOfBirth && (
              <div className="detail-row">
                <span className="detail-label">Date of Birth</span>
                <span className="detail-value">
                  {new Date(report.basicDetails.dateOfBirth).toLocaleDateString('en-IN')}
                </span>
              </div>
            )}
            {report.basicDetails.gender && (
              <div className="detail-row">
                <span className="detail-label">Gender</span>
                <span className="detail-value">{report.basicDetails.gender}</span>
              </div>
            )}
            {report.basicDetails.mobilePhone && (
              <div className="detail-row">
                <span className="detail-label">Mobile</span>
                <span className="detail-value">{report.basicDetails.mobilePhone}</span>
              </div>
            )}
            {report.basicDetails.emailAddress && (
              <div className="detail-row">
                <span className="detail-label">Email</span>
                <span className="detail-value">{report.basicDetails.emailAddress}</span>
              </div>
            )}
          </div>
        </div>

        {/* Report Summary Card */}
        <div className="card summary-card">
          <div className="card-header">
            <h2>📊 Report Summary</h2>
          </div>
          <div className="card-body">
            <div className="summary-grid">
              <div className="summary-stat">
                <div className="stat-icon">💳</div>
                <div className="stat-content">
                  <div className="stat-value">{report.reportSummary.totalAccounts}</div>
                  <div className="stat-label">Total Accounts</div>
                </div>
              </div>
              <div className="summary-stat">
                <div className="stat-icon">✅</div>
                <div className="stat-content">
                  <div className="stat-value">{report.reportSummary.activeAccounts}</div>
                  <div className="stat-label">Active Accounts</div>
                </div>
              </div>
              <div className="summary-stat">
                <div className="stat-icon">❌</div>
                <div className="stat-content">
                  <div className="stat-value">{report.reportSummary.closedAccounts}</div>
                  <div className="stat-label">Closed Accounts</div>
                </div>
              </div>
              <div className="summary-stat">
                <div className="stat-icon">💰</div>
                <div className="stat-content">
                  <div className="stat-value">₹{report.reportSummary.currentBalance.toLocaleString('en-IN')}</div>
                  <div className="stat-label">Current Balance</div>
                </div>
              </div>
              <div className="summary-stat">
                <div className="stat-icon">🔒</div>
                <div className="stat-content">
                  <div className="stat-value">₹{report.reportSummary.securedAccountsAmount.toLocaleString('en-IN')}</div>
                  <div className="stat-label">Secured Amount</div>
                </div>
              </div>
              <div className="summary-stat">
                <div className="stat-icon">🔓</div>
                <div className="stat-content">
                  <div className="stat-value">₹{report.reportSummary.unsecuredAccountsAmount.toLocaleString('en-IN')}</div>
                  <div className="stat-label">Unsecured Amount</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Credit Accounts */}
        <div className="card accounts-card">
          <div className="card-header">
            <h2>💳 Credit Accounts ({report.creditAccounts.length})</h2>
          </div>
          <div className="card-body">
            {report.creditAccounts.length === 0 ? (
              <p className="no-data">No credit accounts found</p>
            ) : (
              <div className="accounts-list">
                {report.creditAccounts.map((account, index) => (
                  <div key={index} className="account-item">
                    <div className="account-header">
                      <div className="account-title">
                        <h3>{account.accountType}</h3>
                        <span className={`status-badge ${getAccountStatusBadge(account.accountStatus).class}`}>
                          {getAccountStatusBadge(account.accountStatus).label}
                        </span>
                      </div>
                      <div className="account-institution">{account.bank}</div>
                    </div>
                    
                    <div className="account-details">
                      <div className="account-detail">
                        <span className="label">Account Number</span>
                        <span className="value">{account.accountNumber}</span>
                      </div>
                      <div className="account-detail">
                        <span className="label">Current Balance</span>
                        <span className="value">₹{account.currentBalance.toLocaleString('en-IN')}</span>
                      </div>
                      <div className="account-detail">
                        <span className="label">Credit Limit</span>
                        <span className="value">₹{account.creditLimit.toLocaleString('en-IN')}</span>
                      </div>
                      {account.amountOverdue > 0 && (
                        <div className="account-detail overdue">
                          <span className="label">⚠️ Amount Overdue</span>
                          <span className="value">₹{account.amountOverdue.toLocaleString('en-IN')}</span>
                        </div>
                      )}
                      {account.openDate && (
                        <div className="account-detail">
                          <span className="label">Opened On</span>
                          <span className="value">{account.openDate}</span>
                        </div>
                      )}
                      {account.closedDate && (
                        <div className="account-detail">
                          <span className="label">Closed On</span>
                          <span className="value">{account.closedDate}</span>
                        </div>
                      )}
                      {account.dateReported && (
                        <div className="account-detail">
                          <span className="label">Last Reported</span>
                          <span className="value">{account.dateReported}</span>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Addresses */}
        {report.addresses && report.addresses.length > 0 && (
          <div className="card addresses-card">
            <div className="card-header">
              <h2>📍 Addresses ({report.addresses.length})</h2>
            </div>
            <div className="card-body">
              <div className="addresses-list">
                {report.addresses.map((address, index) => (
                  <div key={index} className="address-item">
                    <div className="address-type">{address.type || 'Address'}</div>
                    <div className="address-text">
                      {[
                        address.line1,
                        address.line2,
                        address.line3,
                        address.city,
                        address.state,
                        address.postalCode
                      ].filter(Boolean).join(', ')}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Upload Info */}
        <div className="upload-info">
          <span>📅 Uploaded on {new Date(report.uploadDate).toLocaleString('en-IN')}</span>
        </div>
      </div>
    </div>
  );
};

export default ReportDetailsPage;
