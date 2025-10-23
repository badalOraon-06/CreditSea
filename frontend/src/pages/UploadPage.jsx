import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { uploadXML } from '../services/api';
import './UploadPage.css';

const UploadPage = () => {
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  const [reportData, setReportData] = useState(null);
  const navigate = useNavigate();

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    
    // Reset states
    setError('');
    setSuccess(false);
    setReportData(null);
    
    if (selectedFile) {
      // Validate file type
      if (!selectedFile.name.endsWith('.xml')) {
        setError('Please select a valid XML file');
        setFile(null);
        return;
      }
      
      // Validate file size (10MB max)
      if (selectedFile.size > 10 * 1024 * 1024) {
        setError('File size must be less than 10MB');
        setFile(null);
        return;
      }
      
      setFile(selectedFile);
      console.log('File selected:', selectedFile.name);
    }
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    
    if (!file) {
      setError('Please select a file first');
      return;
    }
    
    setUploading(true);
    setError('');
    setSuccess(false);
    
    try {
      console.log('Uploading file:', file.name);
      const response = await uploadXML(file);
      
      console.log('Upload successful:', response);
      setSuccess(true);
      setReportData(response.data);
      
      // Reset file input
      setFile(null);
      document.getElementById('file-input').value = '';
      
      // Show success message for 2 seconds, then navigate
      setTimeout(() => {
        navigate(`/reports/${response.data.reportId}`);
      }, 2000);
      
    } catch (err) {
      console.error('Upload failed:', err);
      setError(err.message || 'Failed to upload file. Please try again.');
    } finally {
      setUploading(false);
    }
  };

  const handleReset = () => {
    setFile(null);
    setError('');
    setSuccess(false);
    setReportData(null);
    document.getElementById('file-input').value = '';
  };

  return (
    <div className="upload-page">
      <div className="upload-container">
        <div className="upload-header">
          <h1>📤 Upload Credit Report</h1>
          <p>Upload an Experian XML file to analyze credit data</p>
        </div>

        <form onSubmit={handleUpload} className="upload-form">
          <div className="file-input-wrapper">
            <input
              id="file-input"
              type="file"
              accept=".xml"
              onChange={handleFileChange}
              disabled={uploading}
              className="file-input"
            />
            <label htmlFor="file-input" className="file-label">
              {file ? (
                <>
                  <span className="file-icon">📄</span>
                  <span className="file-name">{file.name}</span>
                  <span className="file-size">
                    ({(file.size / 1024).toFixed(2)} KB)
                  </span>
                </>
              ) : (
                <>
                  <span className="file-icon">📁</span>
                  <span>Choose XML File</span>
                  <span className="file-hint">or drag and drop</span>
                </>
              )}
            </label>
          </div>

          {file && (
            <div className="file-info">
              <div className="info-item">
                <strong>Selected File:</strong> {file.name}
              </div>
              <div className="info-item">
                <strong>Size:</strong> {(file.size / 1024).toFixed(2)} KB
              </div>
              <div className="info-item">
                <strong>Type:</strong> XML Document
              </div>
            </div>
          )}

          <div className="button-group">
            <button
              type="submit"
              disabled={!file || uploading}
              className="btn btn-primary"
            >
              {uploading ? (
                <>
                  <span className="spinner"></span>
                  Uploading...
                </>
              ) : (
                <>
                  <span>Upload & Analyze</span>
                  <span className="btn-icon">🚀</span>
                </>
              )}
            </button>

            {file && !uploading && (
              <button
                type="button"
                onClick={handleReset}
                className="btn btn-secondary"
              >
                Reset
              </button>
            )}
          </div>
        </form>

        {/* Success Message */}
        {success && reportData && (
          <div className="alert alert-success">
            <div className="alert-icon">✅</div>
            <div className="alert-content">
              <h3>Upload Successful!</h3>
              <p>Credit report analyzed successfully</p>
              <div className="report-preview">
                <div className="preview-item">
                  <strong>Name:</strong> {reportData.creditReport?.basicDetails?.fullName}
                </div>
                <div className="preview-item">
                  <strong>Credit Score:</strong> {reportData.creditReport?.creditScore?.score}
                </div>
                <div className="preview-item">
                  <strong>Total Accounts:</strong> {reportData.creditReport?.totalAccounts}
                </div>
              </div>
              <p className="redirect-message">Redirecting to report...</p>
            </div>
          </div>
        )}

        {/* Error Message */}
        {error && (
          <div className="alert alert-error">
            <div className="alert-icon">❌</div>
            <div className="alert-content">
              <h3>Upload Failed</h3>
              <p>{error}</p>
            </div>
          </div>
        )}

        {/* Instructions */}
        <div className="upload-instructions">
          <h3>📝 Instructions</h3>
          <ul>
            <li>Select an Experian credit report XML file</li>
            <li>File size must be less than 10MB</li>
            <li>Only .xml files are accepted</li>
            <li>Data will be analyzed and stored securely</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default UploadPage;
