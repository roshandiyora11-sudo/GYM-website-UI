# 🏋️ ITALIYA Master Gym - Full-Stack MERN Application

A premium, luxury-grade fitness center application built entirely on the **MERN (MongoDB, Express, React, Node.js)** stack. This platform offers seamless class booking, a massive interactive on-demand video library, dynamic QR code generation, and sophisticated administrative analytics.

![ITALIYA Gym Preview](https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=1200&q=80) *(Placeholder visual)*

## 🌟 Key Features

### User Experience (Frontend Ecosystem)
- **Netflix-Style On-Demand Streaming:** A massive cinematic horizontal-scrolling interface categorized by class types (Yoga, HIIT, Power) with hover-over auto-expand details and integrated fullscreen YouTube iframes.
- **Interactive SVG "Muscle Map":** An exclusive dashboard module containing an interactive human silhouette. Users select a target muscle group (e.g., Chest, Core) to dynamically generate tailor-made exercise sets.
- **Dynamic Digital "Passes" (QR Codes):** All user bookings are tracked on their personalized dashboard. If approved by an admin, the system generates a unique, scannable QR Ticket UI to grant entry. Pending bookings display "Awaiting Approval" locks.
- **Elite Trainer Ratings:** Browse the gym's master trainers, read bios, and utilize a custom 5-star modal system to submit protected community feedback and read historical reviews.
- **Rolling Master Schedule:** An infinitely scrolling 14-day horizontal weekly calendar featuring real-time "Passed Date" validation logic (users cannot book classes in the past).
- **Luxury Aesthetic UI:** Built entirely from scratch using `framer-motion` micro-interactions, pitch-black glassmorphism overlays, and deep-red high-contrast accents.

### Administrative Control (Backend Ecosystem)
- **Recharts Analytics Dashboard:** Visualizes critical gym metrics via Pie Charts (Booking Status Distribution) and Bar Charts (Demand by Class Category).
- **CRUD Workflows:** Admins can securely edit, add, or delete Classes, Trainers, and Bookings.
- **Status Toggling:** A custom PATCH endpoint allows admins to cycle bookings between `Pending`, `Confirmed`, and `Cancelled` states dynamically shaping the user's dashboard ticket view.
- **JWT Authentication:** Strict protected routes guarding user data and preventing unauthorized access to the Control Panel.

## 🛠️ Technology Stack

**Frontend:**
- React 18 (Vite + TypeScript)
- Tailwind CSS (Utility-first styling, glassmorphism)
- Framer Motion (State-driven UI animations)
- Recharts (Data visualization & business logic mapping)
- React-QR-Code (Ticket Generation)
- React-Router-Dom v6 (Routing)
- Axios (HTTP Client)
- Sonner (Premium toast notifications)
- Lucide React (Iconography)

**Backend:**
- Node.js & Express.js
- MongoDB & Mongoose (NoSQL Schemas)
- JSON Web Token (JWT) + bcryptjs (Authentication/Security)
- CORS & dotenv

## 📂 Project Structure

```bash
GYM/
├── server/                     # Node.js backend environment
│   ├── config/db.js            # MongoDB Connection logic
│   ├── middleware/auth.js      # JWT verification handling
│   ├── models/                 # Mongoose Schemas (User, Booking, Trainer, Class)
│   ├── routes/                 # Express API Endpoints
│   └── index.js                # Server Entry Point
│
├── src/                        # React frontend environment
│   ├── components/             # Reusable UI components (Navbar, Calendar)
│   ├── context/                # React Context (AuthContext)
│   ├── pages/                  # Route views (Dashboard, AdminPanel, OnDemand, Home)
│   ├── App.tsx                 # Master Routing Layout
│   └── main.tsx                # Client Entry Point
```

## 🚀 Getting Started

To run this project locally, you will need to start both the Node.js backend server and the Vite React development server.

### Prerequisites
- Node.js Installed (v16+)
- A MongoDB Cluster URI (or local MongoDB Compass installation)

### 1. Backend Setup
1. Open a terminal and navigate to the `server` directory:
   ```bash
   cd server
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in the `server` directory and configure your variables:
   ```env
   PORT=5000
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_super_secret_jwt_key
   ```
4. Start the backend server:
   ```bash
   node index.js
   ```

### 2. Frontend Setup
1. Open a **new** terminal window and navigate to the main project directory:
   ```bash
   # Make sure you are in the root GYM/ directory, not /server
   npm install
   ```
2. Start the Vite React development server:
   ```bash
   npm run dev
   ```

3. Open your browser and navigate to `http://localhost:5173`. 

## 🛡️ Default Admin Access
*(If you utilized the built-in seed scripts to generate initial data)*
You can grant any user Admin privileges directly within the MongoDB compass by setting the `"role":"admin"` inside the user document. This will expose the Admin Control panel route.

---
*Built to redefine luxury fitness tracking.*