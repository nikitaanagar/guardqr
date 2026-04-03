# GuardianQR - QR-Based Safety Identification Platform

GuardianQR is a premium, industry-level safety platform. It enables users to create emergency profiles for children, pets, or the elderly, accessible via scannable QR tags.

## 🌟 Key Features
- **Instant Scan Alerts:** Phone SMS notifications (via Twilio) instantly notify the owner when a tag is scanned.
- **Smart Geolocation:** Captures the location of the scan (via GPS High-Accuracy or IP-based fallback) and provides a Google Maps link.
- **Privacy Protection:** Visually hides direct phone numbers from the scanner while keeping a secure actionable "Call Owner" button.
- **Premium Startup UI:** Developed with modern glassmorphism, Framer Motion animations, and a responsive mobile-first architecture for the public profiles.

---

## 🚀 Step-by-Step Setup Guide

Follow these steps exactly to run GuardianQR locally on your machine.

### 1. Prerequisites
Ensure you have Node.js and MongoDB installed and running.

### 2. Environment Variables (.env)
In the `/backend/` folder, you must have a `.env` file for the environment variables. 
Create `backend/.env` and paste:
```env
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/guardianqr
JWT_SECRET=my_super_secret_jwt_key_123

# Twilio SMS Credentials (Leave empty to use Mock SMS logging in terminal)
TWILIO_ACCOUNT_SID=
TWILIO_AUTH_TOKEN=
TWILIO_PHONE_NUMBER=
```

### 3. Start the Backend Server
Open a terminal and run the following commands:
```bash
# Navigate to the backend folder
cd backend

# Install all backend dependencies
npm install

# Start the Express server
npm start 
# Alternatively, for development: npm run dev
```
You should see: `Server started on port 5000` and `MongoDB Connected`.

### 4. Start the Frontend React App
Open a *new* terminal window and run:
```bash
# Navigate to the frontend folder
cd frontend

# Install all frontend dependencies
npm install

# Start the React app
npm start
```
This will automatically open your browser to `http://localhost:3000`.

---

## 🛠 Project Structure & Architecture Breakdown

### Frontend (`/frontend`)
- **React.js & Framer Motion:** The UI utilizes advanced animations and a glassmorphic design system.
- **`src/pages/Dashboard.jsx`:** The protected owner dashboard. Fetches user profiles from the backend and allows CRUD operations. Highlights the generated `QRCard` components.
- **`src/pages/PublicProfile.jsx`:** The mobile-optimized view for anyone scanning the QR code. Uses the browser Geolocation API (`navigator.geolocation`) upon load to track the finder's location and ping the `/api/scan/:id` backend route.
- **`src/components/QRCard.jsx`:** Uses `qrcode.react` to generate high-resolution scannable SVG QR codes pointing dynamically to the PublicProfile URL.

### Backend (`/backend`)
- **Express.js & MongoDB:** Secure REST API architecture with JWT authentication.
- **Models:**
  - `User.js`: Standard authentication schema.
  - `Profile.js`: Stores info about the pet/child/elderly, medical details, the emergency contact phone number, and the `hidePhone` privacy boolean.
  - `ScanLog.js`: Logs IP, latitude, longitude, and approximate physical location for every single scan.
- **Controllers & Routes:**
  - `routes/scan.js`: The most critical route. Triggered when the QR is scanned. Retrieves location metrics (with an IP fallback `geolocate.js`), saves a `ScanLog`, and triggers the Twilio SMS sender to immediately text the owner's emergency contact phone.
  - `utils/sms.js`: Connects to the Twilio API. If Twilio keys are absent, it safely falls back to logging the SMS message in the backend terminal (Mocking), allowing seamless local testing.
