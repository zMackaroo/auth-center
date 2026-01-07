# 🔐 Auth Center

A centralized authentication and authorization microservice designed to serve multiple client applications. Auth Center provides a unified solution for user management, role-based access control (RBAC), and dynamic permission systems across different projects.

## 🎯 Purpose

Auth Center acts as a **single source of truth** for authentication and authorization across your entire ecosystem of applications. Instead of implementing auth logic in every project, your applications can delegate all auth-related operations to this central service.

### Key Benefits

- **Multi-tenant Architecture** — Serve multiple clients/organizations from a single instance
- **Centralized User Management** — One place to manage all users across projects
- **Flexible Permission System** — Dynamic, client-specific permission structures
- **Role-Based Access Control** — Assign roles with different privilege levels
- **Stateless Authentication** — JWT-based tokens for scalable auth

## 🏗️ Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                         AUTH CENTER                             │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  ┌─────────┐       ┌─────────┐       ┌──────────────┐          │
│  │ Client  │──────▶│  User   │──────▶│    Role      │          │
│  │ (Tenant)│ has   │         │ has   │              │          │
│  └─────────┘ many  └────┬────┘       └──────────────┘          │
│                         │                                       │
│                         │ has                                   │
│                         ▼                                       │
│                  ┌──────────────┐                               │
│                  │  Permission  │                               │
│                  │  (Dynamic)   │                               │
│                  └──────────────┘                               │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
                              │
                              │ JWT Token
                              ▼
              ┌───────────────────────────────┐
              │   Your Applications           │
              │   • E-commerce App            │
              │   • Admin Dashboard           │
              │   • Mobile App                │
              │   • Internal Tools            │
              └───────────────────────────────┘
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- MongoDB

### Installation

```bash
# Clone the repository
git clone https://github.com/your-username/auth-center.git
cd auth-center

# Install dependencies
npm install

# Create environment file
cp .env.example .env

# Configure your environment variables
# MONGO_URI=mongodb://localhost:27017/auth_center
# JWT_SECRET=your-super-secret-key
# PORT=3000
# NODE_ENV=development

# Start development server
npm run dev
```

### Environment Variables

| Variable     | Description                | Default       |
| ------------ | -------------------------- | ------------- |
| `PORT`       | Server port                | `3000`        |
| `MONGO_URI`  | MongoDB connection string  | —             |
| `JWT_SECRET` | Secret key for JWT signing | —             |
| `NODE_ENV`   | Environment mode           | `development` |

---

## 📚 API Reference

Base URL: `http://localhost:3000/api/v1`

### Health Check

```http
GET /api/v1/health
```

**Response:**

```json
{
  "success": true,
  "message": "API is running",
  "timestamp": "2026-01-07T12:00:00.000Z"
}
```

---

## 👥 Client Management

Clients represent tenants/organizations that use your applications.

### Register a Client

```http
POST /api/v1/client/register
Content-Type: application/json
```

**Payload:**

```json
{
  "name": "Acme Corporation",
  "email": "admin@acme.com",
  "status": "active"
}
```

**Response:**

```json
{
  "success": true,
  "message": "Client registered successfully",
  "data": {
    "_id": "695e07a9c3bda5c0b33ee271",
    "name": "acme corporation",
    "email": "admin@acme.com",
    "status": "active",
    "createdAt": "2026-01-07T08:00:00.000Z",
    "updatedAt": "2026-01-07T08:00:00.000Z"
  }
}
```

### Get All Clients

```http
GET /api/v1/client/all
```

### Get Client by ID

```http
GET /api/v1/client/:id
```

| Parameter | Type     | Description               |
| --------- | -------- | ------------------------- |
| `id`      | `string` | Client's MongoDB ObjectId |

### Update Client

```http
PUT /api/v1/client/:id
Content-Type: application/json
```

**Payload:**

```json
{
  "name": "Acme Corp Updated",
  "email": "new-admin@acme.com",
  "status": "inactive"
}
```

---

## 🔑 Authentication

### Register User

```http
POST /api/v1/auth/register
Content-Type: application/json
```

**Payload:**

```json
{
  "clientId": "695e07a9c3bda5c0b33ee271",
  "username": "johndoe",
  "email": "john@acme.com",
  "password": "securePassword123",
  "role": "admin"
}
```

| Field      | Type     | Required | Description                            |
| ---------- | -------- | -------- | -------------------------------------- |
| `clientId` | `string` | Yes      | The client/tenant this user belongs to |
| `username` | `string` | Yes      | Unique username                        |
| `email`    | `string` | Yes      | Unique email (per client)              |
| `password` | `string` | Yes      | Min 8 characters                       |
| `role`     | `string` | Yes      | One of: `super-admin`, `admin`, `user` |

**Response:**

```json
{
  "success": true,
  "message": "User registered successfully",
  "data": {
    "user": {
      "_id": "695e19a08ad73ca015e4a490",
      "clientId": "695e07a9c3bda5c0b33ee271",
      "username": "johndoe",
      "email": "john@acme.com"
    },
    "role": "admin"
  }
}
```

### Login

```http
POST /api/v1/auth/login
Content-Type: application/json
```

**Payload:**

```json
{
  "clientId": "695e07a9c3bda5c0b33ee271",
  "email": "john@acme.com",
  "password": "securePassword123"
}
```

**Response:**

```json
{
  "message": "Login successful",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

> ⚠️ **Note:** Login validates that the client is active before authenticating the user.

---

## 👤 User Management

### Get Users by Client ID

```http
GET /api/v1/user/:clientId?page=1&limit=10
```

| Parameter  | Type     | Description               |
| ---------- | -------- | ------------------------- |
| `clientId` | `string` | Client's MongoDB ObjectId |

| Query   | Type     | Default | Description    |
| ------- | -------- | ------- | -------------- |
| `page`  | `number` | `1`     | Page number    |
| `limit` | `number` | `10`    | Items per page |

**Response:**

```json
{
  "success": true,
  "total": 25,
  "page": 1,
  "totalPages": 3,
  "data": [
    {
      "_id": "695e19a08ad73ca015e4a490",
      "username": "johndoe",
      "email": "john@acme.com",
      "roles": "admin",
      "permissions": {
        "inventory": { "edit": true, "add": true, "delete": false },
        "reports": { "view": true, "export": true }
      }
    }
  ]
}
```

---

## 🛡️ Permission Management

Auth Center supports **dynamic, client-specific permission structures**. Each client can define their own modules and actions based on their application needs.

### Permission Structure

```json
{
  "permissions": {
    "module_name": {
      "action1": true,
      "action2": false
    }
  }
}
```

**Example for an E-commerce app:**

```json
{
  "permissions": {
    "products": {
      "create": true,
      "read": true,
      "update": true,
      "delete": false
    },
    "orders": { "view": true, "cancel": true, "refund": false },
    "customers": { "view": true, "edit": false }
  }
}
```

**Example for an HR system:**

```json
{
  "permissions": {
    "employees": { "hire": true, "terminate": false, "edit": true },
    "payroll": { "view": true, "approve": false },
    "leave_requests": { "approve": true, "reject": true }
  }
}
```

### Get User Permissions

```http
GET /api/v1/permission/:clientId/:userId
```

**Response:**

```json
{
  "success": true,
  "data": {
    "_id": "...",
    "clientId": "695e07a9c3bda5c0b33ee271",
    "userId": "695e19a08ad73ca015e4a490",
    "permissions": {
      "inventory": { "edit": true, "add": true, "delete": false }
    }
  }
}
```

### Update Permissions (Replace All)

```http
PUT /api/v1/permission/:clientId/:userId
Content-Type: application/json
```

**Payload:**

```json
{
  "permissions": {
    "inventory": { "edit": true, "add": true, "delete": false },
    "reports": { "view": true, "export": true }
  }
}
```

### Update Single Module (Patch)

```http
PATCH /api/v1/permission/:clientId/:userId
Content-Type: application/json
```

**Payload:**

```json
{
  "module": "orders",
  "permissions": {
    "view": true,
    "cancel": true,
    "refund": false
  }
}
```

### Delete Module Permission

```http
DELETE /api/v1/permission/:clientId/:userId/:module
```

| Parameter  | Type     | Description               |
| ---------- | -------- | ------------------------- |
| `clientId` | `string` | Client's MongoDB ObjectId |
| `userId`   | `string` | User's MongoDB ObjectId   |
| `module`   | `string` | Module name to remove     |

---

## 🔄 Integration Guide

### How to Use Auth Center in Your Projects

1. **Register your application as a Client**

   ```bash
   POST /api/v1/client/register
   ```

2. **Register users under your client**

   ```bash
   POST /api/v1/auth/register
   # Include your clientId in the payload
   ```

3. **Authenticate users**

   ```bash
   POST /api/v1/auth/login
   # Returns JWT token
   ```

4. **Validate tokens in your application**

   ```javascript
   // In your app's middleware
   const jwt = require("jsonwebtoken");

   const authMiddleware = (req, res, next) => {
     const token = req.headers.authorization?.split(" ")[1];
     const decoded = jwt.verify(token, process.env.JWT_SECRET);
     req.userId = decoded.userId;
     next();
   };
   ```

5. **Fetch user permissions when needed**

   ```bash
   GET /api/v1/permission/:clientId/:userId
   ```

6. **Check permissions in your app**

   ```javascript
   const checkPermission = (userPermissions, module, action) => {
     return userPermissions?.[module]?.[action] === true;
   };

   // Usage
   if (checkPermission(user.permissions, "orders", "cancel")) {
     // Allow order cancellation
   }
   ```

---

## 📁 Project Structure

```
auth_center/
├── src/
│   ├── controllers/       # Route handlers
│   │   ├── auth.controller.ts
│   │   ├── client.controller.ts
│   │   ├── user.controller.ts
│   │   └── permission.controller.ts
│   ├── middlewares/       # Express middlewares
│   │   ├── error-handler.middleware.ts
│   │   ├── not-found.middleware.ts
│   │   └── validate.middleware.ts
│   ├── models/            # Mongoose schemas
│   │   ├── Client.model.ts
│   │   ├── User.model.ts
│   │   ├── Roles.model.ts
│   │   └── Permission.model.ts
│   ├── routes/            # API routes
│   │   ├── index.ts
│   │   ├── auth.route.ts
│   │   ├── client.route.ts
│   │   ├── user.route.ts
│   │   └── permission.route.ts
│   ├── validators/        # Request validators
│   ├── utils/             # Utility functions
│   ├── app.ts             # Express app setup
│   └── server.ts          # Server entry point
├── package.json
├── tsconfig.json
└── README.md
```

---

## 🛠️ Tech Stack

- **Runtime:** Node.js
- **Framework:** Express.js
- **Language:** TypeScript
- **Database:** MongoDB with Mongoose
- **Authentication:** JWT (jsonwebtoken)
- **Password Hashing:** bcryptjs
- **Validation:** express-validator

---

## 📝 License

MIT License — feel free to use this project for your own applications.

---

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.
