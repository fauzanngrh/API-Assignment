# API Programmer Assignment

This project is part of a technical test assignment for the Node JS Developer position.

## 📦 Tech Stack

- **Node.js** with **Express.js**
- **PostgreSQL** (via raw SQL queries & prepared statements)
- **JWT Authentication**
- **bcrypt** for password hashing
- **Deployed on Railway**

## ✅ Features

- `POST /auth/register` – Register new users
- `POST /auth/login` – User login (JWT response)
- `GET /profile` – Get user profile (JWT required)
- `PUT /profile/update` – Update user profile
- `PUT /profile/image` – Upload/update profile image
- `GET /balance` – Check current user balance
- `POST /topup` – Top-up user balance
- `POST /transaction` – Make a service transaction
- `GET /history` – Get user transaction history

## ⚙️ Database

The database schema is available in the file:  
📄 [`ddl.sql`](./ddl.sql)

It contains 3 main tables:

- `users`
- `topups`
- `transactions`

## 🚀 Deployment

The API is deployed on Railway and accessible via:  
🔗 https://api-assignment-production.up.railway.app

## 👨‍💻 Author

Fauzan Nugraha
