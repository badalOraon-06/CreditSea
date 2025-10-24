/**
 * Reports Controller
 * Handles credit report retrieval and queries
 */

import CreditReport from '../models/CreditReport.js';
import connectDB from '../config/database.js';

/**
 * Get all credit reports
 * @route GET /api/reports
 */
export const getAllReports = async (req, res) => {
  try {
    // Connect to database (lazy connection for serverless)
    await connectDB();

    const { page = 1, limit = 10, pan, mobile } = req.query;
    
    // Build query
    const query = { isActive: true };
    
    if (pan) {
      query['basicDetails.pan'] = pan.toUpperCase();
    }
    
    if (mobile) {
      query['basicDetails.mobilePhone'] = mobile;
    }
    
    // Pagination
    const skip = (parseInt(page) - 1) * parseInt(limit);
    
    // Get reports
    const reports = await CreditReport.find(query)
      .sort({ uploadDate: -1 })
      .skip(skip)
      .limit(parseInt(limit))
      .select('-__v'); // Exclude version key
    
    // Get total count
    const total = await CreditReport.countDocuments(query);
    
    console.log(`📊 Retrieved ${reports.length} reports (Total: ${total})`);
    
    res.status(200).json({
      success: true,
      count: reports.length,
      total,
      page: parseInt(page),
      pages: Math.ceil(total / parseInt(limit)),
      data: reports
    });
    
  } catch (error) {
    console.error('❌ Error fetching reports:', error.message);
    res.status(500).json({
      success: false,
      message: 'Error fetching credit reports',
      error: error.message
    });
  }
};

/**
 * Get credit report by ID
 * @route GET /api/reports/:id
 */
export const getReportById = async (req, res) => {
  try {
    await connectDB();
    const { id} = req.params;
    
    const report = await CreditReport.findById(id).select('-__v');
    
    if (!report) {
      return res.status(404).json({
        success: false,
        message: 'Credit report not found'
      });
    }
    
    console.log('📄 Retrieved report:', report._id);
    console.log('   - Name:', report.basicDetails.fullName);
    console.log('   - Score:', report.creditScore.score);
    
    res.status(200).json({
      success: true,
      data: report
    });
    
  } catch (error) {
    console.error('❌ Error fetching report:', error.message);
    
    // Handle invalid MongoDB ObjectId
    if (error.name === 'CastError') {
      return res.status(400).json({
        success: false,
        message: 'Invalid report ID format'
      });
    }
    
    res.status(500).json({
      success: false,
      message: 'Error fetching credit report',
      error: error.message
    });
  }
};

/**
 * Get reports by PAN
 * @route GET /api/reports/pan/:pan
 */
export const getReportsByPAN = async (req, res) => {
  try {
    await connectDB();
    const { pan } = req.params;
    
    const reports = await CreditReport.findByPAN(pan);
    
    console.log(`🔍 Found ${reports.length} reports for PAN: ${pan}`);
    
    res.status(200).json({
      success: true,
      count: reports.length,
      data: reports
    });
    
  } catch (error) {
    console.error('❌ Error fetching reports by PAN:', error.message);
    res.status(500).json({
      success: false,
      message: 'Error fetching reports by PAN',
      error: error.message
    });
  }
};

/**
 * Get reports by mobile number
 * @route GET /api/reports/mobile/:mobile
 */
export const getReportsByMobile = async (req, res) => {
  try {
    await connectDB();
    const { mobile } = req.params;
    
    const reports = await CreditReport.findByMobile(mobile);
    
    console.log(`📱 Found ${reports.length} reports for Mobile: ${mobile}`);
    
    res.status(200).json({
      success: true,
      count: reports.length,
      data: reports
    });
    
  } catch (error) {
    console.error('❌ Error fetching reports by mobile:', error.message);
    res.status(500).json({
      success: false,
      message: 'Error fetching reports by mobile',
      error: error.message
    });
  }
};

/**
 * Delete credit report
 * @route DELETE /api/reports/:id
 */
export const deleteReport = async (req, res) => {
  try {
    await connectDB();
    const { id } = req.params;
    
    const report = await CreditReport.findById(id);
    
    if (!report) {
      return res.status(404).json({
        success: false,
        message: 'Credit report not found'
      });
    }
    
    // Soft delete - mark as inactive
    report.isActive = false;
    await report.save();
    
    console.log('🗑️ Report marked as inactive:', id);
    
    res.status(200).json({
      success: true,
      message: 'Credit report deleted successfully',
      data: { id }
    });
    
  } catch (error) {
    console.error('❌ Error deleting report:', error.message);
    
    if (error.name === 'CastError') {
      return res.status(400).json({
        success: false,
        message: 'Invalid report ID format'
      });
    }
    
    res.status(500).json({
      success: false,
      message: 'Error deleting credit report',
      error: error.message
    });
  }
};

/**
 * Get credit report statistics
 * @route GET /api/reports/stats
 */
export const getReportStats = async (req, res) => {
  try {
    await connectDB();
    const totalReports = await CreditReport.countDocuments({ isActive: true });
    const avgCreditScore = await CreditReport.aggregate([
      { $match: { isActive: true } },
      { $group: { _id: null, avgScore: { $avg: '$creditScore.score' } } }
    ]);
    
    const stats = {
      totalReports,
      averageCreditScore: avgCreditScore[0]?.avgScore || 0,
    };
    
    console.log('📈 Report statistics:', stats);
    
    res.status(200).json({
      success: true,
      data: stats
    });
    
  } catch (error) {
    console.error('❌ Error fetching stats:', error.message);
    res.status(500).json({
      success: false,
      message: 'Error fetching statistics',
      error: error.message
    });
  }
};
