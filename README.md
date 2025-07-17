# 🎓 Student Counseling Web Application

A full-stack web application built using **React**, **Node.js**, **Express**, and **MySQL** for managing student counseling data. The app includes **form submission**, **role-based authentication (student/admin)**, **dark mode UI**, **form validation**, and an **admin dashboard** to view all student records.

---

## 🚀 Features

- ✅ Student SignUp/Login using email & password
- 🔐 Role-based access (Student vs Admin)
- 📝 Submit student details (name, email, phone, marks)
- 📊 Automatically calculate percentage
- 🎨 Clean and responsive UI with dark mode toggle
- 🧪 Input validation for email, phone (10-digit), and marks (0-100)
- 📈 Optional chart view for student marks (admin)
- 💡 Tooltip hints for better UX
- 🔒 Secure backend using Express + MySQL

---

## 🛠️ Tech Stack

| Frontend        | Backend       | Database     | Auth |
|----------------|---------------|--------------|------|
| React.js        | Node.js        | MySQL         | JWT + Bcrypt |
| CSS3            | Express.js     | Sequelize ORM | Role-based access |

---

## 📁 Project Structure

student-counseling-app/
├── backend/
│ ├── server.js
│ ├── routes/
│ │ ├── form.js
│ │ └── auth.js
│ └── models/
│ └── db.js
├── frontend/
│ ├── public/
│ └── src/
│ ├── App.js
│ ├── App.css
│ └── components/
│ └── LoginForm.js
│ └── AdminDashboard.js
└── README.md


---

## 🔧 Setup Instructions

### 📦 1. Clone the repo

```bash
git clone https://github.com/Kasim2908/student-app.git
cd student-counseling-app

cd frontend
npm install
npm start

cd ../backend
npm install
node server.js

CREATE DATABASE student_counseling;



