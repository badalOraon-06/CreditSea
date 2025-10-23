/**
 * Upload Routes
 * Defines endpoints for XML file upload
 */

import express from 'express';
import upload from '../config/multer.js';
import { uploadXML, getUploadInfo } from '../controllers/uploadController.js';

const router = express.Router();

/**
 * @route   GET /api/upload
 * @desc    Get upload endpoint information
 * @access  Public
 */
router.get('/', getUploadInfo);

/**
 * @route   POST /api/upload
 * @desc    Upload XML file
 * @access  Public
 */
router.post('/', upload.single('xmlFile'), uploadXML);

export default router;
