/**
 * Upload Controller
 * Handles XML file upload and validation
 */

// Handle XML file upload
export const uploadXML = async (req, res) => {
  try {
    // Check if file was uploaded
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: 'No file uploaded. Please select an XML file.'
      });
    }

    // Get uploaded file details
    const file = req.file;

    console.log('📁 File uploaded successfully:');
    console.log('   - Filename:', file.filename);
    console.log('   - Original name:', file.originalname);
    console.log('   - Size:', (file.size / 1024).toFixed(2), 'KB');
    console.log('   - Path:', file.path);

    // Return success response
    res.status(200).json({
      success: true,
      message: 'XML file uploaded successfully!',
      data: {
        filename: file.filename,
        originalname: file.originalname,
        size: file.size,
        path: file.path,
        uploadedAt: new Date()
      }
    });

  } catch (error) {
    console.error('❌ Upload error:', error.message);
    res.status(500).json({
      success: false,
      message: 'Error uploading file',
      error: error.message
    });
  }
};

// Get upload status/info
export const getUploadInfo = (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Upload endpoint is ready',
    acceptedFormats: ['.xml'],
    maxFileSize: '10MB',
    endpoint: 'POST /api/upload'
  });
};
