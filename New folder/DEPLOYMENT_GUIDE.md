# 🚀 Vercel Deployment Guide for CreditSea

This guide will help you deploy your CreditSea application to Vercel.

---

## 📋 Prerequisites

Before deploying, ensure you have:

1. ✅ A GitHub account with your CreditSea repository
2. ✅ A Vercel account (sign up at [vercel.com](https://vercel.com))
3. ✅ MongoDB Atlas account for cloud database
4. ✅ All code pushed to GitHub

---

## 🗄️ Part 1: Set Up MongoDB Atlas (Database)

### Step 1: Create MongoDB Atlas Account

1. Go to [mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas)
2. Sign up or log in
3. Create a **FREE cluster** (M0 Sandbox)

### Step 2: Configure Database

1. Click **"Database Access"** → Add Database User

   - Username: `creditsea_user`
   - Password: Generate a strong password (save it!)
   - Database User Privileges: `Read and write to any database`

2. Click **"Network Access"** → Add IP Address

   - Click **"Allow Access from Anywhere"** (0.0.0.0/0)
   - This is needed for Vercel to connect

3. Click **"Database"** → **"Connect"**
   - Choose: **"Connect your application"**
   - Driver: Node.js
   - Copy the connection string (looks like):
     ```
     mongodb+srv://creditsea_user:<password>@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority
     ```
   - **Replace `<password>` with your actual password**
   - **Replace the database name** (after `.net/`) with `creditsea`:
     ```
     mongodb+srv://creditsea_user:YOUR_PASSWORD@cluster0.xxxxx.mongodb.net/creditsea?retryWrites=true&w=majority
     ```

---

## 🔧 Part 2: Prepare Your Code for Deployment

### Step 1: Update Backend for Production

Create a `vercel.json` file in your **backend** folder:

```json
{
  "version": 2,
  "builds": [
    {
      "src": "server.js",
      "use": "@vercel/node"
    }
  ],
  "routes": [
    {
      "src": "/(.*)",
      "dest": "server.js"
    }
  ]
}
```

### Step 2: Update CORS in Backend

Edit `backend/server.js` to allow your frontend domain:

```javascript
// Update CORS configuration
const corsOptions = {
  origin: [
    "http://localhost:5173",
    "http://localhost:3000",
    "https://your-frontend-domain.vercel.app", // Add after frontend deployment
    "https://*.vercel.app", // Allow all Vercel preview deployments
  ],
  credentials: true,
};

app.use(cors(corsOptions));
```

### Step 3: Update Frontend API URL

Edit `frontend/src/services/api.js`:

```javascript
const API_BASE_URL =
  import.meta.env.VITE_API_URL || "http://localhost:3000/api";
```

### Step 4: Create Environment Variable Files

**Backend** - Create `backend/.env.example`:

```env
PORT=3000
MONGODB_URI=your_mongodb_connection_string_here
NODE_ENV=production
```

**Frontend** - Create `frontend/.env.example`:

```env
VITE_API_URL=your_backend_url_here/api
```

### Step 5: Commit and Push Changes

```powershell
git add .
git commit -m "Prepare for Vercel deployment"
git push origin master
```

---

## 🌐 Part 3: Deploy Backend to Vercel

### Step 1: Import Backend Project

1. Go to [vercel.com/dashboard](https://vercel.com/dashboard)
2. Click **"Add New..."** → **"Project"**
3. Import your GitHub repository: `badalOraon-06/CreditSea`
4. Click **"Import"**

### Step 2: Configure Backend Deployment

**Important Settings:**

- **Project Name:** `creditsea-backend` (or your preferred name)
- **Framework Preset:** Other
- **Root Directory:** `backend` ⚠️ **IMPORTANT!**
- **Build Command:** Leave empty or `npm install`
- **Output Directory:** Leave empty
- **Install Command:** `npm install`

### Step 3: Add Environment Variables

Click **"Environment Variables"** and add:

| Name          | Value                                |
| ------------- | ------------------------------------ |
| `MONGODB_URI` | Your MongoDB Atlas connection string |
| `PORT`        | `3000`                               |
| `NODE_ENV`    | `production`                         |

### Step 4: Deploy Backend

1. Click **"Deploy"**
2. Wait for deployment to complete (2-3 minutes)
3. Copy your backend URL (e.g., `https://creditsea-backend.vercel.app`)

---

## 🎨 Part 4: Deploy Frontend to Vercel

### Step 1: Import Frontend Project

1. Go back to Vercel dashboard
2. Click **"Add New..."** → **"Project"**
3. Import the **same repository** again: `badalOraon-06/CreditSea`

### Step 2: Configure Frontend Deployment

**Important Settings:**

- **Project Name:** `creditsea-frontend` (or your preferred name)
- **Framework Preset:** Vite ✅
- **Root Directory:** `frontend` ⚠️ **IMPORTANT!**
- **Build Command:** `npm run build`
- **Output Directory:** `dist`
- **Install Command:** `npm install`

### Step 3: Add Environment Variables

Click **"Environment Variables"** and add:

| Name           | Value                                      |
| -------------- | ------------------------------------------ |
| `VITE_API_URL` | `https://creditsea-backend.vercel.app/api` |

⚠️ **Replace with your actual backend URL from Part 3, Step 4**

### Step 4: Deploy Frontend

1. Click **"Deploy"**
2. Wait for deployment to complete (2-3 minutes)
3. Your app is now live! 🎉

---

## 🔄 Part 5: Update Backend CORS

Now that you have your frontend URL, update the backend CORS:

1. Go to backend Vercel project
2. Go to **Settings** → **Environment Variables**
3. Add a new variable:

| Name           | Value                                   |
| -------------- | --------------------------------------- |
| `FRONTEND_URL` | `https://creditsea-frontend.vercel.app` |

4. Update `backend/server.js`:

```javascript
const corsOptions = {
  origin: process.env.FRONTEND_URL || "http://localhost:5173",
  credentials: true,
};
```

5. Commit and push changes - Vercel will auto-deploy

---

## ✅ Part 6: Test Your Deployment

### Test Checklist:

1. ✅ Visit your frontend URL
2. ✅ Try uploading an XML file
3. ✅ Check if report list loads
4. ✅ Click on a report to view details
5. ✅ Test all navigation

### If Issues Occur:

**Check Vercel Logs:**

1. Go to your project in Vercel
2. Click **"Deployments"**
3. Click on the latest deployment
4. Check **"Function Logs"** or **"Build Logs"**

**Common Issues:**

| Issue                      | Solution                            |
| -------------------------- | ----------------------------------- |
| 404 errors on API calls    | Check `VITE_API_URL` is correct     |
| CORS errors                | Update backend CORS settings        |
| Database connection failed | Verify MongoDB Atlas IP whitelist   |
| Build failed               | Check Node.js version compatibility |

---

## 🔧 Part 7: Custom Domain (Optional)

### Add Custom Domain:

1. Go to your project in Vercel
2. Click **"Settings"** → **"Domains"**
3. Add your domain (e.g., `creditsea.com`)
4. Follow Vercel's DNS instructions
5. Update environment variables with new domain

---

## 📝 Part 8: Continuous Deployment

Vercel automatically deploys when you push to GitHub:

```powershell
# Make changes to your code
git add .
git commit -m "Update feature"
git push origin master
```

Vercel will automatically:

- Build your project
- Run tests (if configured)
- Deploy to production
- Update the live site

---

## 🔒 Security Best Practices

### For Production:

1. ✅ Never commit `.env` files
2. ✅ Use environment variables for all secrets
3. ✅ Restrict MongoDB IP access (whitelist Vercel IPs)
4. ✅ Enable HTTPS (Vercel does this automatically)
5. ✅ Set up proper CORS origins
6. ✅ Add rate limiting to your API
7. ✅ Validate file uploads properly

---

## 📊 Monitoring

### Vercel Analytics:

1. Go to project dashboard
2. Click **"Analytics"**
3. Monitor:
   - Page views
   - Performance metrics
   - Error rates

### MongoDB Atlas Monitoring:

1. Go to Atlas dashboard
2. Check:
   - Database performance
   - Connection count
   - Storage usage

---

## 🆘 Troubleshooting Guide

### Backend Issues

**Problem: Functions timeout**

```
Solution: Optimize database queries or increase timeout in vercel.json
{
  "functions": {
    "server.js": {
      "maxDuration": 60
    }
  }
}
```

**Problem: MongoDB connection fails**

```
Solution:
1. Check MongoDB Atlas IP whitelist (0.0.0.0/0)
2. Verify connection string in environment variables
3. Check database user permissions
```

### Frontend Issues

**Problem: Environment variables not working**

```
Solution:
1. Ensure variables start with VITE_
2. Redeploy after adding variables
3. Variables set at build time, not runtime
```

**Problem: API calls fail with CORS error**

```
Solution: Update backend CORS to include frontend domain
```

---

## 📚 Additional Resources

- [Vercel Documentation](https://vercel.com/docs)
- [Vite Deployment Guide](https://vitejs.dev/guide/static-deploy.html)
- [MongoDB Atlas Documentation](https://docs.atlas.mongodb.com/)
- [Express.js Production Best Practices](https://expressjs.com/en/advanced/best-practice-performance.html)

---

## 🎉 Success!

Your CreditSea application should now be live on Vercel!

**Share your deployment:**

- Frontend: `https://your-app.vercel.app`
- Backend: `https://your-api.vercel.app`

Remember to:

- Monitor your application regularly
- Check Vercel and MongoDB free tier limits
- Keep your dependencies updated
- Back up your database regularly

---

**Need Help?**

- Vercel Support: [vercel.com/support](https://vercel.com/support)
- Community Discord: [vercel.com/discord](https://vercel.com/discord)

**Happy Deploying! 🚀**
