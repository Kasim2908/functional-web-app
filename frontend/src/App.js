import React, { useEffect, useState } from 'react';
import './App.css';
import axios from 'axios';

function App() {
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', marks: '' });
  const [students, setStudents] = useState([]);
  const [darkMode, setDarkMode] = useState(false);

  // Error & success state
  const [phoneError, setPhoneError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [marksError, setMarksError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    document.body.className = darkMode ? 'dark-mode' : '';
  }, [darkMode]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === 'phone') {
      const digitsOnly = value.replace(/\D/g, '').slice(0, 10);
      let formatted = digitsOnly;
      if (digitsOnly.length > 6) {
        formatted = `${digitsOnly.slice(0, 3)}-${digitsOnly.slice(3, 6)}-${digitsOnly.slice(6)}`;
      } else if (digitsOnly.length > 3) {
        formatted = `${digitsOnly.slice(0, 3)}-${digitsOnly.slice(3)}`;
      }
      setFormData({ ...formData, [name]: formatted });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async () => {
    const digits = formData.phone.replace(/\D/g, '');
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    setPhoneError('');
    setEmailError('');
    setMarksError('');
    setSuccessMessage('');

    if (!formData.name || !formData.email || !formData.phone || !formData.marks) {
      setPhoneError('All fields are required');
      return;
    }

    if (digits.length !== 10) {
      setPhoneError('Phone number must be exactly 10 digits');
      return;
    }

    if (!emailRegex.test(formData.email)) {
      setEmailError('Invalid email format');
      return;
    }

    const marks = parseInt(formData.marks);
    if (isNaN(marks) || marks < 0 || marks > 100) {
      setMarksError('Marks should be between 0 and 100');
      return;
    }

    try {
      await axios.post('http://localhost:5000/submit', {
        ...formData,
        phone: digits,
      });
      setFormData({ name: '', email: '', phone: '', marks: '' });
      setSuccessMessage('🎉 Student submitted successfully!');
      fetchStudents();
      setTimeout(() => setSuccessMessage(''), 3000);
    } catch (error) {
      console.error('Submission Error:', error);
    }
  };

  const fetchStudents = async () => {
    try {
      const res = await axios.get('http://localhost:5000/students');
      setStudents(res.data);
    } catch (err) {
      console.error('Fetch Error:', err);
    }
  };

  const handleReset = async () => {
    if (window.confirm("⚠️ Are you sure you want to delete all student data?")) {
      try {
        await axios.delete('http://localhost:5000/students/reset');
        setStudents([]);
        alert('✅ All student data has been reset!');
      } catch (error) {
        console.error("Reset error:", error);
        alert("❌ Failed to reset student data");
      }
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  return (
    <div className="container">
      {/* 🌙 Theme Toggle Switch */}
      <div
        className={`theme-toggle ${darkMode ? 'dark' : ''}`}
        onClick={() => setDarkMode(!darkMode)}
      >
        <span>🌞</span>
        <div className="ball"></div>
        <span>🌙</span>
      </div>

      <h1>🎓 Student Counseling Form</h1>

      <div>
        <input
          name="name"
          placeholder="Enter your full name"
          value={formData.name}
          onChange={handleChange}
          title="Enter full name (e.g. John Doe)"
        />

        <input
          name="email"
          placeholder="Enter your email"
          value={formData.email}
          onChange={handleChange}
          title="Enter a valid email (e.g. name@example.com)"
        />
        {emailError && <div className="error">{emailError}</div>}

        <input
          name="phone"
          placeholder="123-456-7890"
          value={formData.phone}
          onChange={handleChange}
          title="10-digit phone number only"
        />
        {phoneError && <div className="error">{phoneError}</div>}

        <input
          name="marks"
          placeholder="Marks out of 100"
          value={formData.marks}
          onChange={handleChange}
          title="Enter marks between 0–100"
        />
        {marksError && <div className="error">{marksError}</div>}

        <button onClick={handleSubmit} title="Submit the form">Submit</button>

        {successMessage && <div className="success">{successMessage}</div>}
      </div>

      <h3>📋 Submitted Students</h3>
      <ul>
        {students.map((student, index) => (
          <li key={index}>
            <strong>{student.name}</strong> | {student.email} | {student.phone} | Marks: {student.marks}
          </li>
        ))}
      </ul>

      {students.length > 0 && (
        <button onClick={handleReset} title="Clear all data" style={{ marginTop: '1rem' }}>
          🧹 Reset All Data
        </button>
      )}
    </div>
  );
}

export default App;
