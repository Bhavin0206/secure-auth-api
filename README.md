# 🔐 Secure Auth API

A **production-ready authentication & authorization API** built with **Node.js, Express, TypeScript, and MongoDB**.

This project implements **real-world security practices** like JWT authentication, refresh tokens, role-based access, rate limiting, and secure session handling.

---

## 🚀 Features

### 🔐 Authentication

- User Registration
- User Login
- Password hashing using **bcrypt**
- JWT **Access Token (short-lived)**
- JWT **Refresh Token**

---

### 🔁 Token & Session Management

- Refresh token stored in **httpOnly secure cookie**
- Refresh token stored as **hashed value in database**
- Access token expiry handling
- Refresh token expiry handling
- Refresh token API

---

### 🔓 Logout & Session Security

- Secure logout API
- **tokenVersion-based logout (invalidate all sessions)**
- Old access tokens invalid after logout
- Old refresh tokens invalid after logout

---

### 🛡️ Authorization

- Protected routes (Auth middleware)
- Role-based authorization (Admin/User)
- Admin-only routes

---

### 🔐 Security Best Practices

- Input validation using `express-validator`
- Rate limiting (brute-force protection)
- Helmet (secure HTTP headers)
- Strict CORS configuration
- Secure cookie handling
- MongoDB injection protection
- Centralized error handling

---

### 📄 Developer Experience

- Swagger / OpenAPI documentation
- Clean scalable folder structure
- TypeScript support
- Environment-based configuration

---

## 🛠️ Tech Stack

- Node.js
- Express.js (v5)
- TypeScript
- MongoDB + Mongoose
- JWT (`jsonwebtoken`)
- bcryptjs
- Swagger (API documentation)

---

## 📁 Project Structure

src/
  config/
  controllers/
  middleware/
  models/
  routes/
  services/
  utils/
  validators/
  app.ts
  server.ts

---

## ⚙️ Installation & Setup

### 1. Clone the repository

git clone https://github.com/Bhavin0206/secure-auth-api.git
cd secure-auth-api

---

### 2. Install dependencies

npm install

---

### 3. Setup environment variables

Create `.env.development` file:

PORT=5000
NODE_ENV=development

MONGO_URI=mongodb://127.0.0.1:27017/secure_auth_api

JWT_ACCESS_SECRET=your_access_secret_key
JWT_ACCESS_EXPIRES_IN=15m

JWT_REFRESH_SECRET=your_refresh_secret_key
JWT_REFRESH_EXPIRES_IN=7d

CLIENT_URL=http://localhost:3000

---

### 4. Run the project

Development:

npm run dev

Production:

npm run build
npm start

---

## 🌐 API Base URL

http://localhost:5000

---

## 📬 API Documentation

http://localhost:5000/api-docs

---

## 🔐 Authentication Flow

1. User logs in:
   - Access token returned in response
   - Refresh token stored in httpOnly cookie

2. Access token expires:
   - Call refresh API to get new access token

3. Logout:
   - Refresh token removed
   - tokenVersion incremented
   - All previous tokens become invalid

---

## 📮 API Endpoints

Auth:
- POST /api/auth/register
- POST /api/auth/login
- POST /api/auth/refresh-token
- POST /api/auth/logout
- POST /api/auth/change-password

User:
- GET /api/user/me (Protected)

Admin:
- GET /api/admin/users (Admin only)

---

## 🗄️ MongoDB Setup

mongodb://127.0.0.1:27017/secure_auth_api

---

## 📦 Scripts

"dev": "ts-node-dev --respawn --transpile-only src/server.ts"
"build": "tsc"
"start": "node dist/server.js"

---

## 🔒 Environment Variables

PORT | Server port  
MONGO_URI | MongoDB connection  
JWT_ACCESS_SECRET | Access token secret  
JWT_REFRESH_SECRET | Refresh token secret  
CLIENT_URL | Frontend URL  

---

## 📌 Important Notes

- Do NOT commit `.env` files
- Use `.env.example` for sharing config
- Always use HTTPS in production
- Refresh tokens are stored securely (cookie + hashed DB)

---

## 🧪 Upcoming Improvements

- Automated testing (Jest + Supertest)
- Forgot / Reset password APIs
- Account lock after multiple failed attempts
- Audit logging system
- Refresh token rotation

---

## 📄 License

MIT License

---

## ⭐ Final Note

This is not a basic auth system — it is designed with **production-level security and scalability in mind**.
