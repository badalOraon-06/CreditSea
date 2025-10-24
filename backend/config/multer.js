/**
 * Multer Configuration for File Uploads
 * Handles XML file upload with validation
 * Using memory storage for Vercel serverless compatibility
 */

import multer from 'multer';
import path from 'path';

// Use memory storage for Vercel serverless (no persistent file system)
const storage = multer.memoryStorage();

// File filter - only allow XML files
const fileFilter = (req, file, cb) => {
  console.log('📋 Validating file:', file.originalname);
  
  // Check file extension
  const ext = path.extname(file.originalname).toLowerCase();
  
  // Check MIME type
  const allowedMimeTypes = ['text/xml', 'application/xml'];
  
  if (ext === '.xml' || allowedMimeTypes.includes(file.mimetype)) {
    console.log('✅ File validation passed');
    cb(null, true);
  } else {
    console.log('❌ File validation failed - not an XML file');
    cb(new Error('Only XML files are allowed!'), false);
  }
};

// Configure multer
const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB limit
  }
});

export default upload;
