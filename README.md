# 📦 Inventory Management System

A full-stack web application for managing product inventory with 
role-based access control, real-time stock tracking, and a complete 
DevOps pipeline.

## 🌐 Live Demo
🔗 https://frontend-inventory-blond.vercel.app/login

| Role  | Email                        | Password |
|-------|------------------------------|----------|
| Admin | admin.demo@inventory.com     | admin123 |
| User  | user.demo@inventory.com      | user123  |

> Data resets every 24 hours automatically.

## ✨ Features

### User
- View real-time product stock
- Search products by name
- Stock status indicators (green/orange/red)

### Admin
- Full CRUD operations for inventory items
- Image upload via file or URL (Cloudinary)
- Record stock-in and stock-out transactions
- Automatic stock updates on every transaction
- Complete transaction history

## 🛠️ Tech Stack

| Layer      | Technology                        |
|------------|-----------------------------------|
| Frontend   | React.js, Vite, React Router, Axios |
| Backend    | Node.js, Express.js, JWT Auth     |
| Database   | MongoDB Atlas, Mongoose           |
| Storage    | Cloudinary (image upload)         |
| Deploy     | Vercel (Frontend + Backend)       |
| DevOps     | Docker, GitHub Actions, Docker Hub |

## ⚙️ DevOps Pipeline

Every push to `main` branch triggers:
1. ✅ Automated backend testing
2. 🐳 Docker image build (frontend + backend)
3. 📦 Push to Docker Hub registry
4. 🚀 Auto-deploy to Vercel

## 🚀 Run Locally

### Prerequisites
- Node.js 18+
- Docker Desktop
- MongoDB Atlas account
- Cloudinary account

## 👤 Author
Jose Rafael Lumban Raja
- GitHub: https://github.com/joselumbanraja
- LinkedIn: https://www.linkedin.com/in/jose-lumbanraja-4bb850291/
