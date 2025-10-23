/**
 * API Service
 * Centralized API calls using Axios
 */

import axios from 'axios';

// Create axios instance with base configuration
const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
  timeout: 30000, // 30 seconds
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor - log requests
API.interceptors.request.use(
  (config) => {
    console.log(`🌐 ${config.method.toUpperCase()} ${config.url}`);
    return config;
  },
  (error) => {
    console.error('❌ Request error:', error);
    return Promise.reject(error);
  }
);

// Response interceptor - handle errors globally
API.interceptors.response.use(
  (response) => {
    console.log('✅ Response received:', response.status);
    return response;
  },
  (error) => {
    console.error('❌ Response error:', error.response?.status);
    
    // Handle specific error cases
    if (error.response) {
      // Server responded with error
      const message = error.response.data?.message || 'Server error occurred';
      console.error('Server Error:', message);
    } else if (error.request) {
      // Request made but no response
      console.error('Network Error: No response from server');
    } else {
      // Something else happened
      console.error('Error:', error.message);
    }
    
    return Promise.reject(error);
  }
);

/**
 * Upload XML file
 * @param {File} file - XML file to upload
 * @returns {Promise} API response
 */
export const uploadXML = async (file) => {
  try {
    const formData = new FormData();
    formData.append('xmlFile', file);
    
    const response = await API.post('/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

/**
 * Get all credit reports
 * @param {Object} params - Query parameters (page, limit, pan, mobile)
 * @returns {Promise} API response
 */
export const getAllReports = async (params = {}) => {
  try {
    const response = await API.get('/reports', { params });
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

/**
 * Get credit report by ID
 * @param {string} id - Report ID
 * @returns {Promise} API response
 */
export const getReportById = async (id) => {
  try {
    const response = await API.get(`/reports/${id}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

/**
 * Get reports by PAN
 * @param {string} pan - PAN number
 * @returns {Promise} API response
 */
export const getReportsByPAN = async (pan) => {
  try {
    const response = await API.get(`/reports/pan/${pan}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

/**
 * Get reports by mobile
 * @param {string} mobile - Mobile number
 * @returns {Promise} API response
 */
export const getReportsByMobile = async (mobile) => {
  try {
    const response = await API.get(`/reports/mobile/${mobile}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

/**
 * Get report statistics
 * @returns {Promise} API response
 */
export const getReportStats = async () => {
  try {
    const response = await API.get('/reports/stats');
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

/**
 * Delete credit report
 * @param {string} id - Report ID
 * @returns {Promise} API response
 */
export const deleteReport = async (id) => {
  try {
    const response = await API.delete(`/reports/${id}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

export default API;
