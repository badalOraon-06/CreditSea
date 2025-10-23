/**
 * XML Parser Utility
 * Extracts credit report data from Experian XML files
 */

import xml2js from 'xml2js';
import fs from 'fs/promises';

/**
 * Parse XML file and extract credit report data
 * @param {string} filePath - Path to the XML file
 * @returns {Promise<Object>} Parsed credit report data
 */
export const parseXMLFile = async (filePath) => {
  try {
    // Read XML file
    const xmlData = await fs.readFile(filePath, 'utf8');
    
    // Parse XML to JavaScript object
    const parser = new xml2js.Parser({ 
      explicitArray: false,
      mergeAttrs: true,
      ignoreAttrs: false
    });
    
    const result = await parser.parseStringPromise(xmlData);
    
    // Extract data from parsed XML
    const creditReport = extractCreditReportData(result);
    
    console.log('✅ XML parsed successfully');
    return creditReport;
    
  } catch (error) {
    console.error('❌ Error parsing XML:', error.message);
    throw new Error(`Failed to parse XML file: ${error.message}`);
  }
};

/**
 * Extract and structure credit report data
 * @param {Object} xmlObj - Parsed XML object
 * @returns {Object} Structured credit report data
 */
const extractCreditReportData = (xmlObj) => {
  try {
    const report = xmlObj.INProfileResponse;
    
    // Extract basic details
    const basicDetails = extractBasicDetails(report);
    
    // Extract report summary
    const reportSummary = extractReportSummary(report);
    
    // Extract credit accounts
    const creditAccounts = extractCreditAccounts(report);
    
    // Extract addresses
    const addresses = extractAddresses(report);
    
    // Extract enquiries
    const enquiries = extractEnquiries(report);
    
    // Extract credit score
    const creditScore = extractCreditScore(report);
    
    return {
      basicDetails,
      creditScore,
      reportSummary,
      creditAccounts,
      addresses,
      enquiries,
      reportDate: report.Header?.ReportDate || '',
      reportNumber: report.CreditProfileHeader?.ReportNumber || ''
    };
    
  } catch (error) {
    console.error('❌ Error extracting data:', error.message);
    throw new Error(`Failed to extract credit report data: ${error.message}`);
  }
};

/**
 * Extract basic personal details
 */
const extractBasicDetails = (report) => {
  const applicant = report.Current_Application?.Current_Application_Details?.Current_Applicant_Details || {};
  const holderDetails = getFirstAccountHolderDetails(report);
  
  return {
    firstName: applicant.First_Name || holderDetails.First_Name_Non_Normalized || '',
    lastName: applicant.Last_Name || holderDetails.Surname_Non_Normalized || '',
    fullName: `${applicant.First_Name || holderDetails.First_Name_Non_Normalized || ''} ${applicant.Last_Name || holderDetails.Surname_Non_Normalized || ''}`.trim(),
    mobilePhone: applicant.MobilePhoneNumber || holderDetails.Telephone_Number || '',
    pan: applicant.IncomeTaxPan || holderDetails.Income_TAX_PAN || '',
    dateOfBirth: formatDate(applicant.Date_Of_Birth_Applicant || holderDetails.Date_of_birth || ''),
    gender: applicant.Gender_Code || holderDetails.Gender_Code || '',
  };
};

/**
 * Extract report summary
 */
const extractReportSummary = (report) => {
  const summary = report.CAIS_Account?.CAIS_Summary || {};
  const creditAccount = summary.Credit_Account || {};
  const outstanding = summary.Total_Outstanding_Balance || {};
  const caps = report.TotalCAPS_Summary || {};
  
  return {
    totalAccounts: parseInt(creditAccount.CreditAccountTotal) || 0,
    activeAccounts: parseInt(creditAccount.CreditAccountActive) || 0,
    closedAccounts: parseInt(creditAccount.CreditAccountClosed) || 0,
    defaultAccounts: parseInt(creditAccount.CreditAccountDefault) || 0,
    currentBalance: parseInt(outstanding.Outstanding_Balance_All) || 0,
    securedAccountsAmount: parseInt(outstanding.Outstanding_Balance_Secured) || 0,
    unsecuredAccountsAmount: parseInt(outstanding.Outstanding_Balance_UnSecured) || 0,
    last7DaysCreditEnquiries: parseInt(caps.TotalCAPSLast7Days) || 0,
    last30DaysCreditEnquiries: parseInt(caps.TotalCAPSLast30Days) || 0,
    last90DaysCreditEnquiries: parseInt(caps.TotalCAPSLast90Days) || 0,
  };
};

/**
 * Extract credit accounts information
 */
const extractCreditAccounts = (report) => {
  const accounts = report.CAIS_Account?.CAIS_Account_DETAILS;
  
  if (!accounts) return [];
  
  // Handle single account vs multiple accounts
  const accountArray = Array.isArray(accounts) ? accounts : [accounts];
  
  return accountArray.map(account => ({
    accountNumber: account.Account_Number || '',
    bank: (account.Subscriber_Name || '').trim(),
    accountType: getAccountType(account.Account_Type),
    portfolioType: getPortfolioType(account.Portfolio_Type),
    openDate: formatDate(account.Open_Date),
    closedDate: formatDate(account.Date_Closed),
    creditLimit: parseInt(account.Credit_Limit_Amount) || 0,
    highestCredit: parseInt(account.Highest_Credit_or_Original_Loan_Amount) || 0,
    currentBalance: parseInt(account.Current_Balance) || 0,
    amountOverdue: parseInt(account.Amount_Past_Due) || 0,
    accountStatus: getAccountStatus(account.Account_Status),
    paymentRating: account.Payment_Rating || '',
    dateReported: formatDate(account.Date_Reported),
    ownershipType: getOwnershipType(account.AccountHoldertypeCode),
    suitFiled: account.SuitFiled_WilfulDefault === '01' ? 'Yes' : 'No',
    writtenOffStatus: account.Written_off_Settled_Status || '00',
  }));
};

/**
 * Extract addresses
 */
const extractAddresses = (report) => {
  const accounts = report.CAIS_Account?.CAIS_Account_DETAILS;
  
  if (!accounts) return [];
  
  const accountArray = Array.isArray(accounts) ? accounts : [accounts];
  const addressSet = new Set();
  const addresses = [];
  
  accountArray.forEach(account => {
    const addressDetails = account.CAIS_Holder_Address_Details;
    if (addressDetails) {
      const addressKey = `${addressDetails.First_Line_Of_Address_non_normalized}-${addressDetails.City_non_normalized}-${addressDetails.ZIP_Postal_Code_non_normalized}`;
      
      if (!addressSet.has(addressKey) && addressDetails.First_Line_Of_Address_non_normalized) {
        addressSet.add(addressKey);
        addresses.push({
          line1: addressDetails.First_Line_Of_Address_non_normalized || '',
          line2: addressDetails.Second_Line_Of_Address_non_normalized || '',
          line3: addressDetails.Third_Line_Of_Address_non_normalized || '',
          city: addressDetails.City_non_normalized || '',
          state: addressDetails.State_non_normalized || '',
          postalCode: addressDetails.ZIP_Postal_Code_non_normalized || '',
        });
      }
    }
  });
  
  return addresses;
};

/**
 * Extract credit enquiries
 */
const extractEnquiries = (report) => {
  // This XML doesn't have detailed enquiries, but we track summary
  const caps = report.TotalCAPS_Summary || {};
  
  return {
    last7Days: parseInt(caps.TotalCAPSLast7Days) || 0,
    last30Days: parseInt(caps.TotalCAPSLast30Days) || 0,
    last90Days: parseInt(caps.TotalCAPSLast90Days) || 0,
    last180Days: parseInt(caps.TotalCAPSLast180Days) || 0,
  };
};

/**
 * Extract credit score
 */
const extractCreditScore = (report) => {
  const score = report.SCORE || {};
  
  return {
    score: parseInt(score.BureauScore) || 0,
    confidenceLevel: score.BureauScoreConfidLevel || '',
    range: '300-900',
  };
};

/**
 * Helper: Get first account holder details
 */
const getFirstAccountHolderDetails = (report) => {
  const accounts = report.CAIS_Account?.CAIS_Account_DETAILS;
  if (!accounts) return {};
  
  const firstAccount = Array.isArray(accounts) ? accounts[0] : accounts;
  return firstAccount?.CAIS_Holder_Details || {};
};

/**
 * Helper: Format date from YYYYMMDD to YYYY-MM-DD
 */
const formatDate = (dateStr) => {
  if (!dateStr || dateStr.length !== 8) return '';
  
  const year = dateStr.substring(0, 4);
  const month = dateStr.substring(4, 6);
  const day = dateStr.substring(6, 8);
  
  return `${year}-${month}-${day}`;
};

/**
 * Helper: Get account type description
 */
const getAccountType = (code) => {
  const types = {
    '10': 'Credit Card',
    '51': 'Personal Loan',
    '52': 'Personal Loan',
    '53': 'Personal Loan',
    '01': 'Auto Loan',
    '02': 'Housing Loan',
    '03': 'Property Loan',
    '04': 'Loan Against Securities',
    '05': 'Loan Against Bank Deposits',
    '06': 'Consumer Loan',
    '31': 'Secured Credit Card',
    '32': 'Two-wheeler Loan',
    '33': 'Construction Equipment Loan',
    '34': 'Tractor Loan',
    '35': 'Corporate Credit Card',
    '36': 'Commercial Vehicle Loan',
    '37': 'Telco - Wireless',
    '38': 'Telco - Broadband',
    '39': 'Telco - Landline',
  };
  
  return types[code] || `Unknown (${code})`;
};

/**
 * Helper: Get portfolio type description
 */
const getPortfolioType = (code) => {
  const types = {
    'R': 'Revolving',
    'I': 'Installment',
    'S': 'Secured',
    'U': 'Unsecured',
  };
  
  return types[code] || code;
};

/**
 * Helper: Get account status description
 */
const getAccountStatus = (code) => {
  const statuses = {
    '11': 'Active',
    '13': 'Closed',
    '53': 'Active - Suit Filed',
    '71': 'Active',
    '82': 'Settled',
    '83': 'Written Off',
  };
  
  return statuses[code] || `Status ${code}`;
};

/**
 * Helper: Get ownership type
 */
const getOwnershipType = (code) => {
  const types = {
    '1': 'Individual',
    '2': 'Joint',
    '3': 'Guarantor',
  };
  
  return types[code] || 'Unknown';
};

export default {
  parseXMLFile,
};
