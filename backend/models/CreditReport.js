/**
 * Credit Report Model
 * MongoDB schema for storing parsed credit report data
 */

import mongoose from 'mongoose';

// Sub-schema for Credit Accounts
const creditAccountSchema = new mongoose.Schema({
  accountNumber: {
    type: String,
    required: true,
  },
  bank: {
    type: String,
    required: true,
  },
  accountType: {
    type: String,
    required: true,
  },
  portfolioType: String,
  openDate: String,
  closedDate: String,
  creditLimit: {
    type: Number,
    default: 0,
  },
  highestCredit: {
    type: Number,
    default: 0,
  },
  currentBalance: {
    type: Number,
    default: 0,
  },
  amountOverdue: {
    type: Number,
    default: 0,
  },
  accountStatus: String,
  paymentRating: String,
  dateReported: String,
  ownershipType: String,
  suitFiled: {
    type: String,
    default: 'No',
  },
  writtenOffStatus: String,
}, { _id: true });

// Sub-schema for Addresses
const addressSchema = new mongoose.Schema({
  line1: String,
  line2: String,
  line3: String,
  city: String,
  state: String,
  postalCode: String,
}, { _id: false });

// Sub-schema for Basic Details
const basicDetailsSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  fullName: {
    type: String,
    required: true,
  },
  mobilePhone: String,
  pan: {
    type: String,
    required: true,
    uppercase: true,
  },
  dateOfBirth: String,
  gender: String,
}, { _id: false });

// Sub-schema for Credit Score
const creditScoreSchema = new mongoose.Schema({
  score: {
    type: Number,
    required: true,
    min: 300,
    max: 900,
  },
  confidenceLevel: String,
  range: {
    type: String,
    default: '300-900',
  },
}, { _id: false });

// Sub-schema for Report Summary
const reportSummarySchema = new mongoose.Schema({
  totalAccounts: {
    type: Number,
    default: 0,
  },
  activeAccounts: {
    type: Number,
    default: 0,
  },
  closedAccounts: {
    type: Number,
    default: 0,
  },
  defaultAccounts: {
    type: Number,
    default: 0,
  },
  currentBalance: {
    type: Number,
    default: 0,
  },
  securedAccountsAmount: {
    type: Number,
    default: 0,
  },
  unsecuredAccountsAmount: {
    type: Number,
    default: 0,
  },
  last7DaysCreditEnquiries: {
    type: Number,
    default: 0,
  },
  last30DaysCreditEnquiries: {
    type: Number,
    default: 0,
  },
  last90DaysCreditEnquiries: {
    type: Number,
    default: 0,
  },
}, { _id: false });

// Sub-schema for Enquiries
const enquiriesSchema = new mongoose.Schema({
  last7Days: {
    type: Number,
    default: 0,
  },
  last30Days: {
    type: Number,
    default: 0,
  },
  last90Days: {
    type: Number,
    default: 0,
  },
  last180Days: {
    type: Number,
    default: 0,
  },
}, { _id: false });

// Main Credit Report Schema
const creditReportSchema = new mongoose.Schema({
  // File Information
  fileName: {
    type: String,
    required: true,
  },
  originalFileName: {
    type: String,
    required: true,
  },
  fileSize: Number,
  
  // Report Metadata
  reportDate: String,
  reportNumber: String,
  uploadDate: {
    type: Date,
    default: Date.now,
  },
  
  // Credit Report Data
  basicDetails: {
    type: basicDetailsSchema,
    required: true,
  },
  creditScore: {
    type: creditScoreSchema,
    required: true,
  },
  reportSummary: {
    type: reportSummarySchema,
    required: true,
  },
  creditAccounts: [creditAccountSchema],
  addresses: [addressSchema],
  enquiries: enquiriesSchema,
  
  // Status flags
  isActive: {
    type: Boolean,
    default: true,
  },
  
}, {
  timestamps: true, // Adds createdAt and updatedAt automatically
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Indexes for better query performance
creditReportSchema.index({ 'basicDetails.pan': 1 });
creditReportSchema.index({ 'basicDetails.mobilePhone': 1 });
creditReportSchema.index({ uploadDate: -1 });
creditReportSchema.index({ reportNumber: 1 });

// Virtual for account summary
creditReportSchema.virtual('accountSummary').get(function() {
  return {
    total: this.creditAccounts.length,
    active: this.creditAccounts.filter(acc => acc.accountStatus.includes('Active')).length,
    closed: this.creditAccounts.filter(acc => acc.accountStatus === 'Closed').length,
  };
});

// Virtual for total overdue amount
creditReportSchema.virtual('totalOverdue').get(function() {
  return this.creditAccounts.reduce((sum, acc) => sum + acc.amountOverdue, 0);
});

// Instance method to get credit cards only
creditReportSchema.methods.getCreditCards = function() {
  return this.creditAccounts.filter(acc => 
    acc.accountType.toLowerCase().includes('credit card')
  );
};

// Instance method to get loans only
creditReportSchema.methods.getLoans = function() {
  return this.creditAccounts.filter(acc => 
    acc.accountType.toLowerCase().includes('loan')
  );
};

// Static method to find reports by PAN
creditReportSchema.statics.findByPAN = function(pan) {
  return this.find({ 'basicDetails.pan': pan.toUpperCase() })
    .sort({ uploadDate: -1 });
};

// Static method to find reports by mobile
creditReportSchema.statics.findByMobile = function(mobile) {
  return this.find({ 'basicDetails.mobilePhone': mobile })
    .sort({ uploadDate: -1 });
};

// Pre-save middleware - log before saving
creditReportSchema.pre('save', function(next) {
  console.log('💾 Saving credit report to MongoDB...');
  console.log('   - Name:', this.basicDetails.fullName);
  console.log('   - PAN:', this.basicDetails.pan);
  console.log('   - Score:', this.creditScore.score);
  next();
});

// Post-save middleware - log after saving
creditReportSchema.post('save', function(doc) {
  console.log('✅ Credit report saved successfully!');
  console.log('   - Document ID:', doc._id);
});

// Create and export the model
const CreditReport = mongoose.model('CreditReport', creditReportSchema);

export default CreditReport;
