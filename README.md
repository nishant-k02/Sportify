## Team 14

- Zirui Ou
- Aditya Savaliya
- Dev Patel
- Nishant Khandhar

# 🏀 Sportify - Event Explorer & Admin Dashboard

Sportify is a full-stack web application where users can explore sports events, receive AI-powered recommendations based on search history and location, and post reviews. Admins have access to a secure dashboard to manage and delete user reviews with both individual and bulk delete capabilities.

---

## 🚀 Features

### 🌐 User Panel

- 🔍 Search for sports events
- 📍 Location-based filtering
- 🧠 AI Recommendations (via OpenAI) based on:
  - User location (via IP)
  - Recent searches
  - Clicked event history
- 📝 Leave reviews on event listings
- 🔐 Authentication: Sign up, log in, profile management

### 🛠️ Admin Panel

- 🧑‍💼 Role-based admin access (via `role` field in MongoDB)
- 🗑️ Delete individual comments
- 🧹 Bulk delete selected reviews
- ✅ Confirmation modals for all destructive actions
- 📊 Manage Users
- 📊 Scalable dashboard layout using Tailwind CSS

---

## 📦 Tech Stack

- **Frontend:** React, Tailwind CSS, React Router DOM, Axios
- **Backend:** Node.js, Express.js, MongoDB (with native driver), JWT
- **APIs:**
  - OpenAI (for generative recommendations)
  - IPAPI (to detect user location)
- **Data Storage:**
  - `data.json`: Stores event and review data
  - `history.json`: Stores user history data
  - MongoDB: Stores user credentials and roles

---

## 📁 Folder Structure

```
/backend
  ├── data/data.json            # Static event data with reviews
  ├── apis/                     # Route controllers
  ├── index.js                  # Main server file
  └── db/dbConnect.js           # MongoDB connection

/frontend
  ├── components/               # Navbar, Cards, UserProfile, etc.
  ├── pages/                    # Home, AIRecommend, AdminDashboard, DeleteComments
  └── App.jsx                   # Route management
```

---

## 🛠️ Setup Instructions

### Backend

```bash
cd backend
npm i
npm start
```

### Frontend

```bash
cd frontend
npm i
npm start
```

---

## 🚀 Deployment (Vercel)

Sportify is configured for deployment on Vercel with serverless functions.

### Prerequisites

1. **Vercel Account**: Sign up at [vercel.com](https://vercel.com)
2. **MongoDB Database**: Set up MongoDB Atlas or your preferred MongoDB service
3. **OpenAI API Key**: Get your API key from [OpenAI](https://platform.openai.com)

### Environment Variables

Set these environment variables in your Vercel project:

**Backend:**
```env
MONGO_URI=mmongodb_key
FRONTEND_URL=https://your-frontend-url.vercel.app
JWT_SECRET=your-jwt-secret-key
NODE_ENV=production
```

**Frontend:**
```env
REACT_APP_API_URL=https://your-backend-url.vercel.app
REACT_APP_OPENAI_API_KEY=your-openai-api-key
```

### Quick Deploy

1. **Push to GitHub:**
   ```bash
   git add .
   git commit -m "Ready for Vercel deployment"
   git push origin main
   ```

2. **Deploy via Vercel Dashboard:**
   - Go to [vercel.com/dashboard](https://vercel.com/dashboard)
   - Click "New Project"
   - Import your GitHub repository
   - Set environment variables
   - Deploy!

For detailed deployment instructions, see [DEPLOYMENT_GUIDE.md](DEPLOYMENT_GUIDE.md).

---
