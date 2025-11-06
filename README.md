# 🛍️ MERN E-Commerce Store

A **full-stack E-Commerce web application** built using the **MERN stack (MongoDB, Express, React, Node.js)**.  
It features a modern product catalog, a persistent shopping cart, and a smooth mock checkout experience.

---

## 🌐 Live Demo

🔗 **[Live on Render](https://ecommerce-store-tez7.onrender.com)**

---


---

## ✨ Features

- 🛒 **Product Catalog:** Browse a responsive grid of products with images and prices in ₹.  
- 💾 **Persistent Cart:** Items are stored in MongoDB for consistent cart management.  
- 🔢 **Dynamic Navbar:** Cart item count updates in real time.  
- ⏳ **Loading States:** Buttons display spinners during API calls.  
- 💳 **Mock Checkout:** A modal collects mock user details for checkout.  
- 🧾 **Receipt Page:** Displays a summary after successful checkout.  
- 📱 **Responsive UI:** Works smoothly across desktop and mobile screens.

---

## 💻 Tech Stack

| Layer | Technology |
|-------|-------------|
| **Frontend** | React (Vite), Axios, React-Icons |
| **Backend** | Node.js, Express, Mongoose |
| **Database** | MongoDB Atlas |
| **Deployment** | Render (Frontend as static site, Backend as web service) |

---

## 🚀 Getting Started (Run Locally)

This is a **monorepo** project. Run frontend and backend separately in two terminals.

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/L24cs200/ecom_project.git
cd ecom_project
```
### 2️⃣ Backend Setup
```bash
# Navigate to backend
cd backend

# Install dependencies
npm install
```
### ⚙️ Configure MongoDB
Edit the MongoDB connection string in /backend/server.js (around line 27):
```bash
const MONGO_URI = 'mongodb+srv://<username>:<password>@cluster.mongodb.net/';
```
Replace with your MongoDB Atlas URI.
### ▶️ Start the Server
```bash
npm run dev
```

### 3️⃣ Frontend Setup
Open a new terminal window:
```bash
# Navigate to frontend
cd frontend

# Install dependencies
npm install

# Start the React app
npm run dev
```
🧠 Folder Structure
```bash
ecom_project/
│
├── backend/
│   ├── server.js
│   ├── routes/
│   ├── models/
│   └── ...
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── App.jsx
│   │   └── main.jsx
│   └── ...
│
└── README.md
```
### ⚙️ Deployment

Frontend: Hosted on Render as a static site.
Backend: Deployed on Render as a web service.
Database: Hosted on MongoDB Atlas.
### 🔮 Future Enhancements

✅ User authentication (Login/Register)

✅ Product search & filtering

✅ Stripe payment gateway integration

✅ Admin dashboard for managing products and orders.

### 👨‍💻 Author
Srinivasa Manikanta
📧 manikantasrinvas172@gmail.com


