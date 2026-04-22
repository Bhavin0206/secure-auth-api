# 🔐 Secure Auth API

A secure and scalable authentication API built with **Node.js, Express, MongoDB, and TypeScript**.

---

## 🚀 Features (Planned)

* User registration
* User login
* JWT authentication (access & refresh tokens)
* Protected routes
* Role-based authorization (admin/user)
* Change password
* Logout
* Input validation
* Centralized error handling
* Rate limiting

---

## 🛠️ Tech Stack

* Node.js
* Express.js
* TypeScript
* MongoDB + Mongoose
* JWT (jsonwebtoken)
* bcryptjs
* express-validator
* dotenv
* cookie-parser
* cors
* helmet
* morgan
* express-rate-limit

---

## 📁 Project Structure

```
src/
  config/
  controllers/
  middleware/
  models/
  routes/
  services/
  types/
  utils/
  validators/
  app.ts
  server.ts
```

---

## ⚙️ Installation & Setup

### 1. Clone the repository

```bash
git clone <your-repo-url>
cd secure-auth-api
```

### 2. Install dependencies

```bash
npm install
```

### 3. Setup environment variables

Create a `.env` file in the root:

```env
PORT=5000
NODE_ENV=development
MONGO_URI=mongodb://127.0.0.1:27017/secure_auth_api
JWT_ACCESS_SECRET=your_access_secret_key
JWT_ACCESS_EXPIRES_IN=15m
JWT_REFRESH_SECRET=your_refresh_secret_key
JWT_REFRESH_EXPIRES_IN=7d
CLIENT_URL=http://localhost:3000
```

---

## 🧪 Run the project

### Development mode

```bash
npm run dev
```

### Production mode

```bash
npm run build
npm start
```

---

## 🌐 API Base URL

```
http://localhost:5000
```

Test endpoint:

```
GET /
```

Response:

```json
{
  "success": true,
  "message": "Secure Auth API is running"
}
```

---

## 🗄️ MongoDB Setup

Make sure MongoDB is installed and running locally.

Connection string used:

```
mongodb://127.0.0.1:27017/secure_auth_api
```

You can use **MongoDB Compass** to verify the connection.

---

## 📦 Scripts

```json
"scripts": {
  "dev": "ts-node-dev --respawn --transpile-only src/server.ts",
  "build": "tsc",
  "start": "node dist/server.js"
}
```

---

## 🔒 Environment Variables

| Variable           | Description               |
| ------------------ | ------------------------- |
| PORT               | Server port               |
| MONGO_URI          | MongoDB connection string |
| JWT_ACCESS_SECRET  | Access token secret       |
| JWT_REFRESH_SECRET | Refresh token secret      |
| CLIENT_URL         | Frontend URL              |

---

## 📌 Notes

* Do not commit `.env` file
* Use `.env.example` for sharing config
* MongoDB must be running before starting the server

---

## 📄 License

MIT License
