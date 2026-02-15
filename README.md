#  Smart Bookmark App

A modern full-stack bookmark manager built using **Next.js**, **Supabase**, and **Google OAuth**.
Users can securely save, validate, update, and manage bookmarks with real-time syncing and a clean UI.

---

##  Live Demo

Deployed on **Vercel**
👉 https://smart-bookmark-app-rose.vercel.app/

---

## Project Overview

This project allows authenticated users to:

* Sign in using Google
* Add bookmarks
* Validate URLs using Supabase Edge Functions
* Update existing bookmarks
* Delete bookmarks
* View real-time updates without refreshing

The goal was to build a production-ready full-stack application using modern web technologies.

---

##  Tech Stack

### Frontend

* Next.js (App Router)
* React
* Tailwind CSS
* React Hot Toast

### Backend / Services

* Supabase (Database + Auth + Realtime)
* Supabase Edge Functions (URL validation)
* Google OAuth Authentication

### Deployment

* Vercel

---

##  Features

✅ Google OAuth login
✅ Secure user-based bookmarks
✅ Edge Function URL validation
✅ Realtime bookmark updates
✅ Gradient modern UI
✅ Update & Delete functionality
✅ Toast notifications
✅ Responsive design

---

## ⚙️ Installation & Setup

### 1️ Clone Repository

```bash
git clone https://github.com/your-username/smart-bookmark-app.git
cd smart-bookmark-app
```

### 2️ Install Dependencies

```bash
npm install
```

### 3️ Environment Variables

Create `.env.local`:

```
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
```

### 4️ Run Development Server

```bash
npm run dev
```

---

##  Authentication Flow

1. User clicks **Login with Google**
2. Supabase handles OAuth
3. User JWT session is stored
4. Protected actions (Add / Update / Delete) use the session token

---

##  Edge Function Validation

Before saving a bookmark:

* URL is sent to a Supabase Edge Function
* Edge function checks if the URL is reachable
* Invalid URLs are rejected with a toast message

---

##  Database Structure

Table: `bookmarks`

| Column     | Type      |
| ---------- | --------- |
| id         | uuid      |
| title      | text      |
| url        | text      |
| user_id    | uuid      |
| created_at | timestamp |

Row Level Security ensures users only access their own bookmarks.

---

##  Problems Faced & How I Solved Them

###  Google OAuth redirect loop

**Problem:** After login, the app kept redirecting back to login.
**Solution:** Corrected Supabase Auth Redirect URLs and used the correct `redirectTo` origin for Vercel deployment.

---

###  Invalid JWT / 401 Errors in Edge Function

**Problem:** Edge function rejected requests.
**Cause:** Using anon key instead of user session token.
**Solution:** Passed `Authorization: Bearer session.access_token` from Supabase auth session.

---

###  CORS Errors with Edge Functions

**Problem:** Browser blocked requests.
**Solution:** Updated Edge Function response headers to allow origin access.

---

###  Node Modules pushed to GitHub

**Problem:** Large repo size & deployment issues.
**Solution:** Added proper `.gitignore` and removed cached files using:

```
git rm -r --cached node_modules
```

---

###  Realtime bookmarks not updating

**Problem:** UI did not refresh after adding bookmarks.
**Solution:** Used Supabase Realtime channel subscription to refetch data automatically.

---

##  Future Improvements

* Bookmark categories / folders
* Search & filtering
* Drag-and-drop sorting
* Dark/Light theme toggle
* Bookmark preview cards

---

##  Author

Kanth Raj
Full-Stack Developer | Java & Web Technologies

---

##  Final Notes

This project demonstrates:

* Full authentication flow
* Secure backend integration
* Edge Function validation
* Production deployment practices


