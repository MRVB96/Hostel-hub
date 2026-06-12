# Hostel Hub

<div align="center">
  <img src="./client/public/hostel-bg.png" alt="Hostel Hub Login" width="800"/>
</div>

## About Hostel Hub
**Hostel Hub** is a premium, full-stack Hostel Management System built to streamline administrative workflows for wardens and provide a seamless, modern digital experience for students. 

The application removes the friction of manual bookkeeping by providing real-time room capacity tracking, automated fee billing, and a centralized complaint resolution desk.

### Key Features
- **Role-Based Access Control**: Distinct, secure portals for Administrators and Students.
- **Dynamic Room Management**: Add physical rooms, define bed capacities, and track real-time occupancy.
- **Student Directory**: Enroll new students, assign them to rooms, and securely store guardian and academic contact info.
- **Fee Billing System**: Generate monthly or semester fee records, monitor paid/unpaid statuses, and maintain financial histories.
- **Complaint Tracking**: Allow students to submit maintenance or service tickets, and enable admins to track them from 'Pending' through to 'Resolved'.
- **Bespoke UI/UX**: Features a custom 3D isometric logo, glassmorphism design elements, and a highly responsive layout powered by Tailwind CSS v4.

---

## Technology Stack

### Frontend
- **React.js** (Bootstrapped with Vite for lightning-fast HMR)
- **Tailwind CSS v4** (Utility-first styling with custom themes)
- **React Router v6** (Client-side routing)
- **Context API** (Global state management for Auth)
- **Axios** (Promise-based HTTP client)
- **Lucide React** (Beautiful, consistent SVG icons)

### Backend
- **Node.js & Express.js** (RESTful API architecture)
- **MongoDB** (NoSQL Database)
- **Mongoose** (Object Data Modeling)
- **JSON Web Tokens (JWT)** (Stateless, secure authentication)
- **bcryptjs** (Secure password hashing)

---

## Prerequisites
To run Hostel Hub locally, ensure you have the following software installed on your machine:
1. **[Node.js](https://nodejs.org/)** (v18.0.0 or higher recommended)
2. **[MongoDB Community Server](https://www.mongodb.com/try/download/community)** (Must be running locally on the default port `27017`)
3. **Git** (optional)

---

## Steps to Run the Application

### 1. Open the Project Directory
Navigate to the root folder of the project in your terminal:
```bash
cd "hostel mgmt"
```

### 2. Install Dependencies
Hostel Hub is structured as a monorepo. It uses the `concurrently` package at the root level to run both the frontend and backend simultaneously. You must install dependencies in all three directories:

```bash
# 1. Install root dependencies
npm install

# 2. Install backend dependencies
cd server
npm install

# 3. Install frontend dependencies
cd ../client
npm install
```

### 3. Configure Environment Variables
For security reasons, the actual `.env` file containing sensitive secrets is ignored by Git and is not included in this repository. You must create one manually.

Navigate to the `server` directory. You will find a template file named `.env.example`. Create a copy of this file and rename the copy to `.env`:

```bash
cd server
cp .env.example .env
```

The resulting `.env` file should look like this:
```env
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/hostel_mgmt
JWT_SECRET=your_super_secret_jwt_key_here
```
> **Note:** The `MONGO_URI` provided here points to a local database on your own machine. It is safe to use this locally, but when deploying to production, replace it with your secured cloud database URI (e.g., MongoDB Atlas) and never share those credentials publicly.

### 4. Seed the Database
To quickly test the application without having to manually register users from scratch, you can seed the database with default rooms and test accounts.
```bash
cd server
npm run seed
```

**Seed Data Credentials:**
- **Admin Login**: `admin@example.com` | Password: `password123`
- **Student Login**: `john@example.com` | Password: `password123`

### 5. Start the Development Servers
Navigate back to the root directory and run the start script:
```bash
cd ..
npm run dev
```

This single command will automatically start:
- The **Express API Server** on `http://localhost:5000` (reloads automatically via Nodemon).
- The **Vite React Frontend** on `http://localhost:5173`.

### 6. View the App
Open your web browser and navigate to:
**[http://localhost:5173](http://localhost:5173)**
