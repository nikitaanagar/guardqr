# GuardianQR - QR-Based Safety Identification Platform

GuardianQR is a premium, flat-designed safety platform. It enables users to create emergency profiles for children, pets, or the elderly, which are accessible via custom scannable QR tags.

---

## 🌟 Key Features

- **Sleek Public Landing Page**: An interactive 11-section landing page with sticky navigation headers, section scroll fade-in animations, FAQ accordions, and a real-time switchable pricing toggle.
- **Official Google OAuth 2.0 Sign-In**: Fully integrated client-side Google Identity Services (GIS) buttons and secure backend ID Token verification.
- **Hiding Links from Finders**: The public emergency scan views (`/profile/:id`) hide the global navbar, protecting search options and restricting auth controls exclusively to owners.
- **Paid QR Status & Checkout Flow**: Supports locked QR tag downloads. Owners can perform a checkout simulation using a card sheet to mark tags as active. Unpaid tags block finders from seeing emergency data.
- **Email & SMS Alerts on Scan**: Scan events trigger automated email notifications directly to the owner's registered email address (containing location data and a Google Maps link), along with real-time Twilio SMS alerts.
- **Unified Admin Dashboard**: Dedicated administrative console `/admin` for `nikitanagar.1201@gmail.com` to manage all users, safety profiles, and scan logs.

---

## 🚀 Setup & Installation Guide

### 1. Prerequisites
Ensure you have **Node.js** and **MongoDB** installed and running on your local machine.

### 2. Configure Backend Environment
Create a `backend/.env` file in the `/backend` folder and populate the following keys:
```env
PORT=5001
MONGO_URI=mongodb://127.0.0.1:27017/guardianqr
JWT_SECRET=your_super_secret_jwt_key

# Twilio Credentials (Optional - Falls back to console logs if blank)
TWILIO_ACCOUNT_SID=
TWILIO_AUTH_TOKEN=
TWILIO_PHONE_NUMBER=

# NodeMailer Credentials (Optional - Mock logs to console if blank)
EMAIL_USER=
EMAIL_PASS=

# Google OAuth Credentials
GOOGLE_CLIENT_ID=your_google_oauth_client_id_here
GOOGLE_CLIENT_SECRET=your_google_oauth_client_secret_here
```

### 3. Configure Frontend Environment
Create a `frontend/.env` file in the `/frontend` folder and populate your client ID:
```env
REACT_APP_GOOGLE_CLIENT_ID=your_google_oauth_client_id_here
```

### 4. Start the Backend Server
```bash
cd backend
npm install
npm start
```
You should see: `Server started on port 5001` and `MongoDB Connected`.

### 5. Start the Frontend App
```bash
cd ../frontend
npm install
npm start
```
This will start the development server and open `http://localhost:3000` automatically.

---

## 🛡️ Administrative Console
- Log in or register using Google with **`nikitanagar.1201@gmail.com`** to automatically receive the admin role.
- Access the panel at **`http://localhost:3000/admin`** to manage global platforms records and scan events.
