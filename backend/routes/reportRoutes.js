/**
 * Report Routes
 * Defines endpoints for credit report retrieval
 */

import express from 'express';
import {
  getAllReports,
  getReportById,
  getReportsByPAN,
  getReportsByMobile,
  deleteReport,
  getReportStats
} from '../controllers/reportController.js';

const router = express.Router();

/**
 * @route   GET /api/reports/stats
 * @desc    Get credit report statistics
 * @access  Public
 */
router.get('/stats', getReportStats);

/**
 * @route   GET /api/reports/pan/:pan
 * @desc    Get reports by PAN number
 * @access  Public
 */
router.get('/pan/:pan', getReportsByPAN);

/**
 * @route   GET /api/reports/mobile/:mobile
 * @desc    Get reports by mobile number
 * @access  Public
 */
router.get('/mobile/:mobile', getReportsByMobile);

/**
 * @route   GET /api/reports
 * @desc    Get all credit reports (with pagination and filters)
 * @access  Public
 * @query   page, limit, pan, mobile
 */
router.get('/', getAllReports);

/**
 * @route   GET /api/reports/:id
 * @desc    Get specific credit report by ID
 * @access  Public
 */
router.get('/:id', getReportById);

/**
 * @route   DELETE /api/reports/:id
 * @desc    Delete credit report (soft delete)
 * @access  Public
 */
router.delete('/:id', deleteReport);

export default router;
