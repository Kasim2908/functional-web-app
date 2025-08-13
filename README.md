# 🎓 Student Counseling Web Application

A  web application built using **React**, **Node.js**, **Express**, and **MySQL** for managing student counseling data. The app includes **form submission**, **role-based authentication (student/admin)**, **dark mode UI**, **form validation**, and an **admin dashboard** to view all student records.

---

# 🎓 Student Counseling Web Application

[![React](https://img.shields.io/badge/Frontend-React-blue?logo=react)](https://react.dev)
[![Node.js](https://img.shields.io/badge/Backend-Node.js-green?logo=node.js)](https://nodejs.org)
[![MySQL](https://img.shields.io/badge/Database-MySQL-orange?logo=mysql)](https://www.mysql.com)
[![License: MIT](https://img.shields.io/badge/License-MIT-lightgrey)](LICENSE)

A modern full-stack student counseling system with secure login, admin features, and a responsive UI.

---

## 🚀 Features

- ✅ **Student Registration/Login** using Email & Password
- 🔐 **Role-based Access Control**: Student 👨‍🎓 & Admin 🧑‍💼
- 📝 **Student Details Form**: Name, Email, Phone, Marks
- 📊 **Auto Percentage Calculation**
- 🎨 **Responsive UI with Dark Mode**
- 🧪 **Input Validation**:
  - Valid Email Format
  - 10-digit Phone Number
  - Marks (0 - 100)
- 📈 **Admin Dashboard**: View All Student Data, Optional Charts
- 💡 **Tooltips** for UX Hints
- 🔒 **Secure Backend** with JWT Authentication & Bcrypt Hashing

---

## 🛠️ Tech Stack

| Frontend | Backend | Database | Auth |
|----------|---------|----------|------|
| React.js | Node.js | MySQL    | JWT + Bcrypt |

- Styling: CSS3
- Backend Framework: Express.js
- ORM: Sequelize (optional)

---

## 📁 Project Structure

```bash
student-counseling-app/
├── backend/
│   ├── server.js
│   ├── models/
│   │   └── db.js
│   └── routes/
│       ├── auth.js
│       └── form.js
├── frontend/
│   ├── public/
│   └── src/
│       ├── App.js
│       ├── App.css
│       └── components/
│           ├── LoginForm.js
│           └── AdminDashboard.js
└── README.md



Setup Instructions


📦 Step 1: Clone the Repository
bash
Copy
Edit
git clone https://github.com/Kasim2908/student-app.git
cd student-counseling-app


💻 Step 2: Set Up Frontend
bash
Copy
Edit
cd frontend
npm install
npm start


🌐 Step 3: Set Up Backend
bash
Copy
Edit
cd ../backend
npm install
node server.js


✅ Make sure MySQL is running and create the database:

sql
Copy
Edit
CREATE DATABASE student_counseling;

