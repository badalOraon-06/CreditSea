/**
 * Upload Controller
 * Handles XML file upload and validation
 */

import { parseXMLFile } from '../utils/xmlParser.js';
import CreditReport from '../models/CreditReport.js';

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
    console.log('   - Original name:', file.originalname);
    console.log('   - Size:', (file.size / 1024).toFixed(2), 'KB');
    console.log('   - Memory buffer:', file.buffer ? 'Yes' : 'No');

    // Parse the XML file from memory buffer
    console.log('🔍 Parsing XML file from buffer...');
    const parsedData = await parseXMLFile(file.buffer);
    console.log('✅ XML parsed successfully');
    console.log('   - Name:', parsedData.basicDetails.fullName);
    console.log('   - Credit Score:', parsedData.creditScore.score);
    console.log('   - Total Accounts:', parsedData.reportSummary.totalAccounts);

    // Generate unique filename for reference
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const filename = `${file.originalname.replace('.xml', '')}-${uniqueSuffix}.xml`;

    // Save to MongoDB
    console.log('💾 Saving to database...');
    const creditReport = new CreditReport({
      fileName: filename,
      originalFileName: file.originalname,
      fileSize: file.size,
      reportDate: parsedData.reportDate,
      reportNumber: parsedData.reportNumber,
      basicDetails: parsedData.basicDetails,
      creditScore: parsedData.creditScore,
      reportSummary: parsedData.reportSummary,
      creditAccounts: parsedData.creditAccounts,
      addresses: parsedData.addresses,
      enquiries: parsedData.enquiries,
    });

    await creditReport.save();

    console.log('✅ Credit report saved to database!');
    console.log('   - Report ID:', creditReport._id);

    // Return success response with parsed data
    res.status(201).json({
      success: true,
      message: 'XML file uploaded, parsed, and saved successfully!',
      data: {
        reportId: creditReport._id,
        file: {
          filename: filename,
          originalname: file.originalname,
          size: file.size,
          uploadedAt: creditReport.uploadDate
        },
        creditReport: {
          basicDetails: creditReport.basicDetails,
          creditScore: creditReport.creditScore,
          reportSummary: creditReport.reportSummary,
          totalAccounts: creditReport.creditAccounts.length,
          totalAddresses: creditReport.addresses.length,
        }
      }
    });

  } catch (error) {
    console.error('❌ Upload error:', error.message);
    res.status(500).json({
      success: false,
      message: 'Error uploading or parsing file',
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
