const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();

// ✅ Middleware
app.use(cors({
  origin: 'http://localhost:3000', // React frontend origin
  methods: ['GET', 'POST']
}));
app.use(bodyParser.json());

// ✅ MySQL connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '1234', // ✅ Your actual MySQL password here
  database: 'student_counseling'
});

db.connect(err => {
  if (err) {
    console.error('❌ MySQL connection failed:', err.message);
    process.exit(1); // Stop server if DB fails
  }
  console.log('✅ MySQL Connected!');
});

// ✅ POST /submit - Insert student data
app.post('/submit', (req, res) => {
  const { name, email, phone, marks } = req.body;

  if (!name || !email || !phone || !marks) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  const sql = 'INSERT INTO students (name, email, phone, marks) VALUES (?, ?, ?, ?)';
  db.query(sql, [name, email, phone, marks], (err, result) => {
    if (err) {
      console.error('❌ Insert Error:', err);
      return res.status(500).json({ error: 'Database insert failed' });
    }
    res.status(200).json({ message: 'Student submitted successfully!' });
  });
});

// ✅ GET /students - Fetch all student data
app.get('/students', (req, res) => {
  db.query('SELECT * FROM students', (err, result) => {
    if (err) {
      console.error('❌ Fetch Error:', err);
      return res.status(500).json({ error: 'Database fetch failed' });
    }
    res.status(200).json(result);
  });
});

// ✅ Start the server
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
