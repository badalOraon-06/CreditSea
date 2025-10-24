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
  const [isDragging, setIsDragging] = useState(false);
  const navigate = useNavigate();

  const validateFile = (selectedFile) => {
    // Validate file type
    if (!selectedFile.name.endsWith('.xml')) {
      setError('Please select a valid XML file');
      return false;
    }
    
    // Validate file size (10MB max)
    if (selectedFile.size > 10 * 1024 * 1024) {
      setError('File size must be less than 10MB');
      return false;
    }
    
    return true;
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    
    // Reset states
    setError('');
    setSuccess(false);
    setReportData(null);
    
    if (selectedFile && validateFile(selectedFile)) {
      setFile(selectedFile);
      console.log('File selected:', selectedFile.name);
    } else if (selectedFile) {
      setFile(null);
    }
  };

  const handleDragEnter = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    // Reset states
    setError('');
    setSuccess(false);
    setReportData(null);

    const droppedFile = e.dataTransfer.files[0];
    
    if (droppedFile && validateFile(droppedFile)) {
      setFile(droppedFile);
      console.log('File dropped:', droppedFile.name);
    } else if (droppedFile) {
      setFile(null);
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
          <h1>Upload Credit Report</h1>
          <p>Select an Experian XML file</p>
        </div>

        <form onSubmit={handleUpload} className="upload-form">
          <div 
            className={`file-input-wrapper ${isDragging ? 'dragging' : ''}`}
            onDragEnter={handleDragEnter}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
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
                    {(file.size / 1024).toFixed(2)} KB
                  </span>
                </>
              ) : (
                <>
                  <span className="file-icon">📁</span>
                  <span>Choose XML File or Drag & Drop</span>
                  <span className="file-hint">Click to browse or drag files here</span>
                </>
              )}
            </label>
          </div>

          <div className="button-group">
            <button
              type="submit"
              disabled={!file || uploading}
              className="btn btn-primary"
            >
              {uploading ? (
                <>
                  <span className="spinner"></span>
                  <span>Processing...</span>
                </>
              ) : (
                <>
                  <span>Upload</span>
                </>
              )}
            </button>

            {file && !uploading && (
              <button
                type="button"
                onClick={handleReset}
                className="btn btn-secondary"
              >
                Clear
              </button>
            )}
          </div>
        </form>

        {/* Success Modal */}
        {success && reportData && (
          <div className="success-modal-overlay">
            <div className="success-modal">
              <div className="success-animation">
                <div className="success-checkmark">
                  <svg className="checkmark" viewBox="0 0 52 52">
                    <circle className="checkmark-circle" cx="26" cy="26" r="25" fill="none"/>
                    <path className="checkmark-check" fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8"/>
                  </svg>
                </div>
              </div>
              <h3>Upload Successful!</h3>
              <p>Processing your credit report...</p>
              <div className="loading-dots">
                <span></span>
                <span></span>
                <span></span>
              </div>
            </div>
          </div>
        )}

        {/* Error Message */}
        {error && (
          <div className="alert alert-error">
            <div className="alert-icon">✕</div>
            <div className="alert-content">
              <h3>Error</h3>
              <p>{error}</p>
            </div>
          </div>
        )}

        {/* File Requirements */}
        <div className="upload-requirements">
          <h3>File Requirements</h3>
          <ul>
            <li>Format: XML only</li>
            <li>Max size: 10MB</li>
            <li>Source: Experian credit report</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default UploadPage;
