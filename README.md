# 🏦 CreditSea - Credit Report Analyzer

> A full-stack MERN application for processing and analyzing Experian XML credit reports.

[![Node.js](https://img.shields.io/badge/Node.js-v16+-green.svg)](https://nodejs.org/)
[![React](https://img.shields.io/badge/React-v18.3-blue.svg)](https://reactjs.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-v5+-green.svg)](https://www.mongodb.com/)
[![License](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

[![Live Demo](https://img.shields.io/badge/Live%20Demo-Vercel-blue?logo=vercel)](https://credit-sea-eight-ruddy.vercel.app/)

---

## 📋 Table of Contents

- [About the Project](#about-the-project)
- [Live Demo](#live-demo)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [API Documentation](#api-documentation)
- [Screenshots](#screenshots)
- [Demo Video](#demo-video)
- [Deployment](#deployment)
- [Data Schema](#data-schema)
- [Troubleshooting](#troubleshooting)
- [Author](#author)

---

## 📖 About the Project

**CreditSea** is a comprehensive credit report management system built as part of a fullstack engineering assignment. The application processes XML files containing soft credit pull data from Experian, extracts relevant information, stores it in MongoDB, and presents it through an intuitive React interface.

### Key Capabilities

✅ **Upload & Parse** - Upload Experian XML files with instant parsing  
✅ **Data Extraction** - Automatically extract all credit information  
✅ **Secure Storage** - Store data in MongoDB with optimized schema  
✅ **Visual Reports** - View comprehensive credit reports with intuitive UI  
✅ **Responsive Design** - Works seamlessly on desktop, tablet, and mobile

---

## 🔗 Live Demo

- App URL: https://credit-sea-eight-ruddy.vercel.app/

Explore the deployed frontend on Vercel. Ensure the backend API is configured per the Deployment guide and the frontend `VITE_API_URL` points to your backend.

## ✨ Features

### Core Features

- 📤 **XML File Upload** - Secure file upload with validation (XML only, max 10MB)
- 🔍 **Intelligent Parsing** - Extracts all relevant data from complex XML structure
- 💾 **MongoDB Storage** - Efficient data storage with indexed queries
- 📊 **Comprehensive Reports** - Display basic details, summaries, and account information
- 🎨 **Modern UI** - Clean, professional interface with smooth navigation
- ⚡ **Real-time Processing** - Instant parsing and display after upload

### Additional Features

- 🔢 **Pagination** - Navigate through multiple reports efficiently
- 🎯 **Credit Score Visualization** - Color-coded scores (Excellent, Good, Fair, Poor)
- 📱 **Responsive Design** - Optimized for all screen sizes
- 🗑️ **Soft Delete** - Remove reports without permanent deletion
- 🔐 **Data Validation** - Comprehensive input validation and error handling
- 📈 **Statistics** - View aggregate credit report statistics

---

## 🛠️ Tech Stack

### Frontend

- **React 18.3** - UI library
- **React Router 6** - Client-side routing
- **Axios** - HTTP client for API calls
- **Vite** - Fast build tool and dev server
- **CSS3** - Custom styling with responsive design

### Backend

- **Node.js** - JavaScript runtime
- **Express.js 4.21** - Web application framework
- **Multer** - File upload middleware
- **xml2js** - XML parsing library
- **CORS** - Cross-origin resource sharing

### Database

- **MongoDB** - NoSQL database
- **Mongoose 8.19** - ODM for MongoDB

### Development Tools

- **Nodemon** - Auto-restart server on changes
- **Git** - Version control

---

## 📁 Project Structure

```
CreditSea/
│
├── backend/                      # Express.js Backend
│   ├── config/
│   │   ├── database.js          # MongoDB connection
│   │   └── multer.js            # File upload configuration
│   ├── controllers/
│   │   ├── uploadController.js  # File upload logic
│   │   └── reportController.js  # Report CRUD operations
│   ├── models/
│   │   └── CreditReport.js      # MongoDB schema
│   ├── routes/
│   │   ├── uploadRoutes.js      # Upload endpoints
│   │   └── reportRoutes.js      # Report endpoints
│   ├── utils/
│   │   └── xmlParser.js         # XML parsing utility (317 lines)
│   ├── uploads/                 # Uploaded XML files storage
│   ├── .env                     # Environment variables
│   ├── package.json             # Backend dependencies
│   └── server.js                # Application entry point
│
├── frontend/                     # React Frontend
│   ├── src/
│   │   ├── components/
│   │   │   ├── BasicDetailsCard.jsx
│   │   │   ├── BasicDetailsCard.css
│   │   │   ├── LoadingSpinner.jsx
│   │   │   └── LoadingSpinner.css
│   │   ├── pages/
│   │   │   ├── UploadPage.jsx        # File upload interface
│   │   │   ├── UploadPage.css
│   │   │   ├── ReportListPage.jsx    # All reports list
│   │   │   ├── ReportListPage.css
│   │   │   ├── ReportDetailsPage.jsx # Detailed report view
│   │   │   └── ReportDetailsPage.css
│   │   ├── services/
│   │   │   └── api.js               # Axios API service
│   │   ├── App.jsx                  # Main app component
│   │   ├── App.css                  # Global styles
│   │   ├── main.jsx                 # React entry point
│   │   └── index.css                # Base CSS
│   ├── index.html
│   ├── package.json                 # Frontend dependencies
│   └── vite.config.js               # Vite configuration
│
├── sample-xml-files/                # Sample Experian XML files
│   └── Sagar_Ugle1.xml
│
├── README.md                        # This file
└── .gitignore                       # Git ignore rules
```

---

## 🚀 Getting Started

### Prerequisites

Ensure you have the following installed on your system:

- **Node.js** (v16 or higher) - [Download](https://nodejs.org/)
- **MongoDB** (v5 or higher) - [Download](https://www.mongodb.com/try/download/community)
- **npm** (comes with Node.js) or **yarn**
- **Git** - [Download](https://git-scm.com/)

### Installation

#### 1️⃣ Clone the Repository

```bash
git clone https://github.com/badalOraon-06/CreditSea.git
cd CreditSea
```

#### 2️⃣ Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file in the `backend` folder:

```env
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/creditsea
MAX_FILE_SIZE=10485760
UPLOAD_DIR=./uploads
```

#### 3️⃣ Frontend Setup

```bash
cd ../frontend
npm install
```

#### 4️⃣ Start MongoDB

**Windows:**

```bash
net start MongoDB
```

**Mac/Linux:**

```bash
sudo systemctl start mongod
# OR
mongod --dbpath /path/to/data/directory
```

Verify MongoDB is running:

```bash
mongosh
# or
mongo
```

### Running the Application

#### Start Backend Server

Open Terminal 1:

```bash
cd backend
npm run dev
```

Expected output:

```
🚀 Server is running on port 5000
✅ MongoDB Connected: localhost
📊 Database: creditsea
```

Backend API: `http://localhost:5000`

#### Start Frontend Server

Open Terminal 2:

```bash
cd frontend
npm run dev
```

Expected output:

```
VITE v5.4.21  ready in XXX ms

➜  Local:   http://localhost:3000/
➜  Network: use --host to expose
```

Frontend App: `http://localhost:3000`

---

## 📡 API Documentation

### Base URL

```
http://localhost:5000/api
```

### Endpoints

#### 1. Health Check

```http
GET /
```

**Response:**

```json
{
  "message": "CreditSea API is running!",
  "version": "1.0.0",
  "endpoints": {
    "upload": "POST /api/upload",
    "reports": "GET /api/reports",
    "report": "GET /api/reports/:id"
  }
}
```

#### 2. Upload XML File

```http
POST /api/upload
Content-Type: multipart/form-data
```

**Request Body:**
| Field | Type | Description |
|-------|------|-------------|
| xmlFile | File | XML file (max 10MB) |

**Response (201):**

```json
{
  "success": true,
  "message": "XML file uploaded, parsed, and saved successfully!",
  "data": {
    "reportId": "68fa40375541622171d217ef",
    "file": {
      "filename": "Sagar_Ugle1-1761225505125.xml",
      "originalname": "Sagar_Ugle1.xml",
      "size": 125648,
      "uploadedAt": "2025-10-23T10:30:00.000Z"
    },
    "creditReport": {
      "basicDetails": { ... },
      "creditScore": { ... },
      "reportSummary": { ... }
    }
  }
}
```

#### 3. Get All Reports

```http
GET /api/reports?page=1&limit=10
```

**Query Parameters:**
| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| page | Number | 1 | Page number |
| limit | Number | 10 | Results per page |
| pan | String | - | Filter by PAN |
| mobile | String | - | Filter by mobile |

**Response (200):**

```json
{
  "success": true,
  "count": 10,
  "total": 25,
  "page": 1,
  "pages": 3,
  "data": [ ... ]
}
```

#### 4. Get Report by ID

```http
GET /api/reports/:id
```

**Response (200):**

```json
{
  "success": true,
  "data": {
    "_id": "68fa40375541622171d217ef",
    "basicDetails": {
      "fullName": "Sagar Ugle",
      "pan": "AOZPB0247S",
      "mobilePhone": "9819137672",
      "dateOfBirth": "1990-01-15",
      "gender": "Male"
    },
    "creditScore": {
      "score": 719,
      "confidenceLevel": "High"
    },
    "reportSummary": {
      "totalAccounts": 4,
      "activeAccounts": 3,
      "closedAccounts": 1,
      "currentBalance": 245000,
      "securedAccountsAmount": 85000,
      "unsecuredAccountsAmount": 160000
    },
    "creditAccounts": [ ... ],
    "addresses": [ ... ]
  }
}
```

#### 5. Delete Report (Soft Delete)

```http
DELETE /api/reports/:id
```

**Response (200):**

```json
{
  "success": true,
  "message": "Credit report deleted successfully",
  "data": {
    "id": "68fa40375541622171d217ef"
  }
}
```

### Error Responses

**400 Bad Request:**

```json
{
  "success": false,
  "message": "No file uploaded. Please select an XML file."
}
```

**404 Not Found:**

```json
{
  "success": false,
  "message": "Credit report not found"
}
```

**500 Internal Server Error:**

```json
{
  "success": false,
  "message": "Error uploading or parsing file",
  "error": "Detailed error message"
}
```

---

## 📸 Screenshots

### 1. Home Page

> Professional landing page with feature overview

_[Screenshot placeholder - Add image after taking screenshot]_

### 2. Upload Page

> Drag-and-drop XML file upload with validation

_[Screenshot placeholder - Add image after taking screenshot]_

### 3. Report List

> View all uploaded credit reports with pagination

_[Screenshot placeholder - Add image after taking screenshot]_

### 4. Report Details - Basic Info

> Comprehensive view of personal details and credit score

_[Screenshot placeholder - Add image after taking screenshot]_

### 5. Report Details - Credit Accounts

> Detailed breakdown of all credit accounts

_[Screenshot placeholder - Add image after taking screenshot]_

---


## 🚀 Deployment

### Deploy to Vercel

This project is ready to deploy on Vercel with minimal configuration.

**📖 Full Deployment Guide:** See [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md) for complete step-by-step instructions.

#### Quick Start:

**1. Deploy Backend:**

- Create Vercel project from GitHub repo
- Set root directory: `backend`
- Add environment variables: `MONGODB_URI`, `PORT`, `NODE_ENV`
- Deploy!

**2. Deploy Frontend:**

- Create another Vercel project from same repo
- Set root directory: `frontend`
- Framework: Vite
- Add environment variable: `VITE_API_URL`
- Deploy!

**3. Setup MongoDB Atlas:**

- Create free cluster at [MongoDB Atlas](https://mongodb.com/cloud/atlas)
- Get connection string
- Add to backend environment variables

**Live Demo:** https://credit-sea-eight-ruddy.vercel.app/

For detailed instructions, database setup, troubleshooting, and best practices, refer to [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md).

---

## 💾 Data Schema

### MongoDB Schema Design

#### CreditReport Model

```javascript
{
  // File Information
  fileName: String,
  originalFileName: String,
  fileSize: Number,
  uploadDate: Date,

  // Basic Details
  basicDetails: {
    firstName: String,
    lastName: String,
    fullName: String (required),
    mobilePhone: String,
    pan: String (required, uppercase),
    dateOfBirth: String,
    gender: String
  },

  // Credit Score
  creditScore: {
    score: Number (300-900, required),
    confidenceLevel: String,
    range: String
  },

  // Report Summary
  reportSummary: {
    totalAccounts: Number,
    activeAccounts: Number,
    closedAccounts: Number,
    currentBalance: Number,
    securedAccountsAmount: Number,
    unsecuredAccountsAmount: Number,
    last7DaysCreditEnquiries: Number
  },

  // Credit Accounts Array
  creditAccounts: [{
    accountNumber: String (required),
    bank: String (required),
    accountType: String (required),
    portfolioType: String,
    openDate: String,
    closedDate: String,
    creditLimit: Number,
    currentBalance: Number,
    amountOverdue: Number,
    accountStatus: String,
    paymentRating: String
  }],

  // Addresses Array
  addresses: [{
    line1: String,
    line2: String,
    line3: String,
    city: String,
    state: String,
    postalCode: String
  }],

  // Metadata
  isActive: Boolean (default: true),
  createdAt: Date,
  updatedAt: Date
}
```

---

## 🐛 Troubleshooting

### MongoDB Connection Issues

**Problem:** `MongoServerError: connect ECONNREFUSED`

**Solution:**

```bash
# Check if MongoDB is running
mongosh

# If not, start MongoDB
net start MongoDB  # Windows
sudo systemctl start mongod  # Linux
brew services start mongodb-community  # Mac
```

### Port Already in Use

**Problem:** `Error: listen EADDRINUSE: address already in use :::5000`

**Solution:**

```bash
# Windows - Find and kill process
netstat -ano | findstr :5000
taskkill /PID <PID> /F

# Mac/Linux
lsof -ti:5000 | xargs kill -9
```

### File Upload Fails

**Problem:** File upload returns 400 error

**Solutions:**

- Ensure file is `.xml` format
- Check file size is under 10MB
- Verify backend server is running
- Check `uploads` directory exists and has write permissions

---

## 📄 License

This project is created for educational purposes as part of the CreditSea Fullstack Engineer Assignment.

---

## 👨‍💻 Author

**Badal Oraon**

- GitHub: [@badalOraon-06](https://github.com/badalOraon-06)
- Repository: [CreditSea](https://github.com/badalOraon-06/CreditSea)
- LinkedIn: [_\[Add your LinkedIn profile\]_](https://www.linkedin.com/in/badal-oraon-776b40293/)

---

## 🙏 Acknowledgments

- **CreditSea** - For the assignment opportunity
- **MERN Stack Community** - For excellent documentation and resources
- **Experian** - For XML data format specification

---


---

<div align="center">

**⭐ If you found this project helpful, please consider giving it a star! ⭐**

Made with ❤️ by Badal Oraon

</div>
