const express = require('express');
const cors = require('cors');
const bcrypt = require('bcryptjs');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'ok', message: 'Backend is running.' });
});

app.post('/api/auth/register', (req, res) => {
  const { fullName, email, password, phone, role } = req.body || {};

  if (!fullName || !email || !password || !phone || !role) {
    return res.status(400).json({
      success: false,
      message: 'All fields are required: fullName, email, password, phone, role.',
    });
  }

  if (!['patient', 'doctor'].includes(role)) {
    return res.status(400).json({
      success: false,
      message: 'Role must be either patient or doctor.',
    });
  }

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailPattern.test(String(email).trim())) {
    return res.status(400).json({
      success: false,
      message: 'Please provide a valid email address.',
    });
  }

  if (String(password).length < 8) {
    return res.status(400).json({
      success: false,
      message: 'Password must be at least 8 characters long.',
    });
  }

  const passwordHash = bcrypt.hashSync(String(password), 10);

  return res.status(201).json({
    success: true,
    message: 'User registered successfully.',
    user: {
      fullName: String(fullName).trim(),
      email: String(email).trim().toLowerCase(),
      phone: String(phone).trim(),
      role,
      passwordHash,
    },
  });
});

app.use((req, res) => {
  res.status(404).json({ success: false, message: 'Route not found.' });
});

app.listen(PORT, () => {
  console.log(`Auth API running on http://localhost:${PORT}`);
});
