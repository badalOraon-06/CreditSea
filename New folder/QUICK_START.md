# 🚀 Quick Start Guide

## ⚡ Setup & Run (First Time)

### Step 1: Install Dependencies

Open **TWO** terminals/command prompts:

#### Terminal 1 - Backend Setup:

```powershell
cd "c:\Users\BADAL ORAON\OneDrive\Desktop\Harshdeep\backend"
npm install
```

#### Terminal 2 - Frontend Setup:

```powershell
cd "c:\Users\BADAL ORAON\OneDrive\Desktop\Harshdeep\frontend"
npm install
```

This will take 2-3 minutes. ☕

---

### Step 2: Start MongoDB

**Option A - If MongoDB is installed as a service:**

```powershell
net start MongoDB
```

**Option B - If you need to start manually:**

```powershell
mongod
```

**Check if MongoDB is running:**
Open MongoDB Compass or visit: http://localhost:27017

---

### Step 3: Run the Application

#### Terminal 1 - Start Backend:

```powershell
cd "c:\Users\BADAL ORAON\OneDrive\Desktop\Harshdeep\backend"
npm run dev
```

You should see:

```
🚀 Server is running on port 5000
✅ MongoDB Connected: localhost
```

#### Terminal 2 - Start Frontend:

```powershell
cd "c:\Users\BADAL ORAON\OneDrive\Desktop\Harshdeep\frontend"
npm run dev
```

You should see:

```
VITE ready in XXX ms
➜ Local: http://localhost:3000
```

---

### Step 4: Test the Application

1. **Open your browser:** http://localhost:3000
2. **You should see:** Welcome page with CreditSea header
3. **Test Backend API:** http://localhost:5000
4. **You should see:** JSON response with API information

---

## 🔄 Daily Workflow (After Setup)

Every time you want to work on the project:

### 1. Start MongoDB

```powershell
net start MongoDB
```

### 2. Terminal 1 - Backend

```powershell
cd "c:\Users\BADAL ORAON\OneDrive\Desktop\Harshdeep\backend"
npm run dev
```

### 3. Terminal 2 - Frontend

```powershell
cd "c:\Users\BADAL ORAON\OneDrive\Desktop\Harshdeep\frontend"
npm run dev
```

---

## 🛠️ Useful Commands

### Backend Commands:

```powershell
npm run dev          # Start development server with auto-reload
npm start            # Start production server
npm test             # Run tests (when we add them)
```

### Frontend Commands:

```powershell
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
```

### Git Commands:

```powershell
git status           # Check changes
git add .            # Stage all changes
git commit -m "message"  # Commit with message
git log              # View commit history
```

---

## 🐛 Troubleshooting

### Problem: Port 5000 already in use

**Solution:**

```powershell
# Find the process using port 5000
netstat -ano | findstr :5000

# Kill the process (replace PID with actual number)
taskkill /PID <PID> /F
```

### Problem: MongoDB not connecting

**Solutions:**

1. Check if MongoDB is running: `net start MongoDB`
2. Check MongoDB Compass connection
3. Verify MONGODB_URI in backend/.env

### Problem: npm install fails

**Solutions:**

1. Delete `node_modules` folder
2. Delete `package-lock.json`
3. Run `npm install` again
4. Try `npm cache clean --force`

### Problem: Frontend shows blank page

**Solutions:**

1. Check browser console for errors (F12)
2. Make sure backend is running
3. Clear browser cache
4. Check terminal for errors

---

## 📱 Testing Tools

### Postman (for API testing)

1. Download: https://www.postman.com/downloads/
2. Install and create account
3. Test APIs without frontend

### MongoDB Compass (for database viewing)

1. Download: https://www.mongodb.com/try/download/compass
2. Connect to: `mongodb://localhost:27017`
3. View collections and documents

---

## 📊 Project Status

### ✅ Completed:

- [x] Project structure
- [x] Backend skeleton
- [x] Frontend skeleton
- [x] Database connection
- [x] Git initialization

### 🔄 Current Phase:

- [ ] XML Upload endpoint
- [ ] File validation
- [ ] Multer setup

### 📅 Next Up:

- XML parsing
- Database schema
- API endpoints

---

## 💾 Making Your First Commit

```powershell
cd "c:\Users\BADAL ORAON\OneDrive\Desktop\Harshdeep"

git add .
git commit -m "Initial project setup - MERN stack structure"
```

---

## 🎯 Today's Goals (Day 1)

- [x] Understand project structure
- [x] Install all dependencies
- [x] Run backend successfully
- [x] Run frontend successfully
- [x] See welcome page in browser
- [ ] Read through all created files
- [ ] Understand what each file does
- [ ] Plan tomorrow's work

---

## 📚 What to Study Tonight

1. **Express.js Basics** (30 mins)

   - What is middleware?
   - Routing in Express
   - Request and Response objects

2. **React Basics** (30 mins)

   - Components
   - Props and State
   - JSX syntax

3. **MongoDB Basics** (20 mins)
   - Collections and Documents
   - Basic CRUD operations
   - What is Mongoose?

---

## 🤔 Questions to Think About

1. What happens when you type `npm run dev`?
2. How does the frontend talk to the backend?
3. Where does MongoDB store the data?
4. What is the purpose of package.json?
5. Why do we use .env file?

---

**You're all set! Let's build something amazing! 🚀**

Need help? Check LEARNING_GUIDE.md for detailed explanations.
