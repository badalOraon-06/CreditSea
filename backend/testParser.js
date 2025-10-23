/**
 * Test XML Parser
 * Run this file to test the XML parser independently
 */

import { parseXMLFile } from './utils/xmlParser.js';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Test the parser
const testParser = async () => {
  try {
    console.log('🧪 Testing XML Parser...\n');
    
    // Path to sample XML file
    const xmlPath = path.join(__dirname, '../sample-xml-files/Sagar_Ugle1.xml');
    
    console.log('📄 Parsing file:', xmlPath);
    console.log('⏳ Please wait...\n');
    
    // Parse the XML
    const result = await parseXMLFile(xmlPath);
    
    // Display results
    console.log('═══════════════════════════════════════════════');
    console.log('📊 CREDIT REPORT SUMMARY');
    console.log('═══════════════════════════════════════════════\n');
    
    console.log('👤 BASIC DETAILS:');
    console.log('   Name:', result.basicDetails.fullName);
    console.log('   Mobile:', result.basicDetails.mobilePhone);
    console.log('   PAN:', result.basicDetails.pan);
    console.log('   DOB:', result.basicDetails.dateOfBirth);
    console.log('');
    
    console.log('💯 CREDIT SCORE:');
    console.log('   Score:', result.creditScore.score);
    console.log('   Confidence:', result.creditScore.confidenceLevel);
    console.log('   Range:', result.creditScore.range);
    console.log('');
    
    console.log('📈 REPORT SUMMARY:');
    console.log('   Total Accounts:', result.reportSummary.totalAccounts);
    console.log('   Active Accounts:', result.reportSummary.activeAccounts);
    console.log('   Closed Accounts:', result.reportSummary.closedAccounts);
    console.log('   Current Balance:', '₹' + result.reportSummary.currentBalance.toLocaleString('en-IN'));
    console.log('   Secured Amount:', '₹' + result.reportSummary.securedAccountsAmount.toLocaleString('en-IN'));
    console.log('   Unsecured Amount:', '₹' + result.reportSummary.unsecuredAccountsAmount.toLocaleString('en-IN'));
    console.log('   Last 7 Days Enquiries:', result.reportSummary.last7DaysCreditEnquiries);
    console.log('');
    
    console.log('💳 CREDIT ACCOUNTS (' + result.creditAccounts.length + ' accounts):');
    result.creditAccounts.forEach((account, index) => {
      console.log(`\n   Account ${index + 1}:`);
      console.log('   ├─ Bank:', account.bank);
      console.log('   ├─ Type:', account.accountType);
      console.log('   ├─ Account Number:', account.accountNumber);
      console.log('   ├─ Status:', account.accountStatus);
      console.log('   ├─ Current Balance:', '₹' + account.currentBalance.toLocaleString('en-IN'));
      console.log('   ├─ Amount Overdue:', '₹' + account.amountOverdue.toLocaleString('en-IN'));
      console.log('   ├─ Credit Limit:', '₹' + account.creditLimit.toLocaleString('en-IN'));
      console.log('   └─ Opened:', account.openDate);
    });
    console.log('');
    
    console.log('📍 ADDRESSES (' + result.addresses.length + ' addresses):');
    result.addresses.forEach((address, index) => {
      console.log(`\n   Address ${index + 1}:`);
      console.log('   ├─', address.line1);
      if (address.line2) console.log('   ├─', address.line2);
      if (address.line3) console.log('   ├─', address.line3);
      console.log('   ├─', address.city);
      console.log('   └─', address.postalCode);
    });
    console.log('');
    
    console.log('═══════════════════════════════════════════════');
    console.log('✅ XML Parser Test Completed Successfully!');
    console.log('═══════════════════════════════════════════════\n');
    
  } catch (error) {
    console.error('\n❌ Test Failed:');
    console.error('   Error:', error.message);
    console.error('\n', error.stack);
  }
};

// Run the test
testParser();
