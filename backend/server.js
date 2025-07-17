const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = 5000; // ✅ Declare port here before using it

// ✅ Middleware
app.use(cors({
  origin: 'http://localhost:3000',
  methods: ['GET', 'POST', 'DELETE']
}));
app.use(bodyParser.json());

// ✅ MySQL connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '1234',
  database: 'student_counseling'
});

db.connect(err => {
  if (err) {
    console.error('❌ MySQL connection failed:', err.message);
    process.exit(1);
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

// ✅ DELETE /students/reset - Delete all student records
app.delete('/students/reset', (req, res) => {
  db.query('DELETE FROM students', (err, result) => {
    if (err) {
      console.error('❌ Reset Error:', err);
      return res.status(500).json({ error: 'Failed to reset student data' });
    }
    res.status(200).json({ message: 'All student data has been cleared!' });
  });
});

// ✅ Start the server (Only once and after all routes)
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
