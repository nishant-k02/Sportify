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
