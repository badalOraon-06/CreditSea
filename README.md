# 🏦 CreditSea - Credit Report Analyzer

A full-stack MERN application for processing and analyzing Experian XML credit reports.

## 📋 Project Overview

This application allows users to:

- Upload XML files containing soft credit pull data from Experian
- Extract and process credit information
- Store data in MongoDB
- View comprehensive credit reports through a React interface

## 🛠️ Tech Stack

- **Frontend**: React, React Router, Vite
- **Backend**: Node.js, Express.js
- **Database**: MongoDB with Mongoose
- **File Processing**: Multer, xml2js

## 📁 Project Structure

```
Harshdeep/
├── backend/               # Express.js backend
│   ├── config/           # Database & app configuration
│   ├── controllers/      # Route controllers
│   ├── models/           # MongoDB schemas
│   ├── routes/           # API routes
│   ├── utils/            # Helper functions & XML parser
│   ├── uploads/          # Uploaded XML files storage
│   └── server.js         # Entry point
├── frontend/             # React frontend
│   └── src/
│       ├── components/   # Reusable components
│       ├── pages/        # Page components
│       └── services/     # API service layer
└── sample-xml-files/     # Sample Experian XML files
```

## 🚀 Getting Started

### Prerequisites

Make sure you have these installed:

- Node.js (v16 or higher)
- MongoDB (v5 or higher)
- npm or yarn
- Git

### Installation

#### 1. Clone the repository

```bash
git clone <your-repo-url>
cd Harshdeep
```

#### 2. Setup Backend

```bash
cd backend
npm install
```

Create a `.env` file in the backend folder (already created):

```env
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/creditsea
MAX_FILE_SIZE=10485760
UPLOAD_DIR=./uploads
```

#### 3. Setup Frontend

```bash
cd ../frontend
npm install
```

#### 4. Start MongoDB

Make sure MongoDB is running on your system:

```bash
# Windows (if MongoDB is installed as a service)
net start MongoDB

# Or run mongod directly
mongod
```

### Running the Application

#### Start Backend (Terminal 1)

```bash
cd backend
npm run dev
```

Backend will run on: http://localhost:5000

#### Start Frontend (Terminal 2)

```bash
cd frontend
npm run dev
```

Frontend will run on: http://localhost:3000

## 📊 API Endpoints

| Method | Endpoint           | Description         |
| ------ | ------------------ | ------------------- |
| GET    | `/`                | API health check    |
| POST   | `/api/upload`      | Upload XML file     |
| GET    | `/api/reports`     | Get all reports     |
| GET    | `/api/reports/:id` | Get specific report |

## 🎯 Development Roadmap

### ✅ Phase 1: Setup (COMPLETED)

- [x] Project structure created
- [x] Backend initialized with Express
- [x] Frontend initialized with React + Vite
- [x] MongoDB connection configured
- [x] Basic routing setup

### 📝 Phase 2: XML Upload (NEXT)

- [ ] Create file upload endpoint
- [ ] Add Multer middleware
- [ ] Implement file validation
- [ ] Test with Postman

### 🔍 Phase 3: XML Parsing

- [ ] Parse XML files
- [ ] Extract basic details
- [ ] Extract report summary
- [ ] Extract credit account info

### 💾 Phase 4: Database

- [ ] Design MongoDB schema
- [ ] Create Mongoose models
- [ ] Implement data persistence

### 🌐 Phase 5: API Development

- [ ] Create GET endpoints
- [ ] Add error handling
- [ ] Test all endpoints

### 🎨 Phase 6: Frontend Development

- [ ] Upload page UI
- [ ] Report display page
- [ ] Styling & responsiveness

### 🔗 Phase 7: Integration

- [ ] Connect frontend to backend
- [ ] End-to-end testing
- [ ] Bug fixes

### 📚 Phase 8: Documentation

- [ ] Complete README
- [ ] Add code comments
- [ ] Record demo video

## 🧪 Testing

```bash
# Backend tests
cd backend
npm test

# Frontend tests
cd frontend
npm test
```

## 📦 Data Extraction Schema

The application extracts the following information:

### Basic Details

- Name
- Mobile Phone
- PAN
- Credit Score

### Report Summary

- Total accounts
- Active/Closed accounts
- Current balance
- Secured/Unsecured amounts
- Recent credit enquiries

### Credit Accounts

- Credit cards details
- Bank information
- Addresses
- Account numbers
- Overdue amounts
- Current balances

## 🤝 Contributing

This is a learning project. Feel free to:

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## 📝 License

This project is created for educational purposes.

## 👨‍💻 Author

**Your Name**

- GitHub: [@yourusername]
- LinkedIn: [Your LinkedIn]

## 🙏 Acknowledgments

- CreditSea for the assignment
- MERN stack community

---

**Happy Coding! 🚀**
