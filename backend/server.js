require('dotenv').config();

const bcrypt = require('bcryptjs');
const cors = require('cors');
const express = require('express');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const User = require('./models/User');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'ok', message: 'Backend is running.' });
});

app.post('/api/auth/register', async (req, res, next) => {
  const { fullName, email, password, phone, role } = req.body || {};

  if (
    typeof fullName !== 'string' ||
    typeof email !== 'string' ||
    typeof password !== 'string' ||
    typeof phone !== 'string' ||
    !fullName.trim() ||
    !email.trim() ||
    !password ||
    !phone.trim() ||
    !role
  ) {
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

  const normalizedEmail = email.trim().toLowerCase();
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
  if (!emailPattern.test(normalizedEmail)) {
    return res.status(400).json({
      success: false,
      message: 'Please provide a valid email address.',
    });
  }

  if (password.length < 8) {
    return res.status(400).json({
      success: false,
      message: 'Password must be at least 8 characters long.',
    });
  }

  try {
    const user = await User.create({
      fullName: fullName.trim(),
      email: normalizedEmail,
      phone: phone.trim(),
      role,
      passwordHash: await bcrypt.hash(password, 12),
    });

    return res.status(201).json({
      success: true,
      message: 'User registered successfully.',
      user: {
        id: user.id,
        fullName: user.fullName,
        email: user.email,
        phone: user.phone,
        role: user.role,
      },
    });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(409).json({
        success: false,
        message: 'An account with this email already exists.',
      });
    }

    return next(error);
  }
});

app.post('/api/auth/login', async (req, res, next) => {
  const { email, password } = req.body || {};

  if (
    typeof email !== 'string' ||
    typeof password !== 'string' ||
    !email.trim() ||
    !password
  ) {
    return res.status(400).json({
      success: false,
      message: 'Email and password are required.',
    });
  }

  try {
    const user = await User.findOne({
      email: email.trim().toLowerCase(),
    }).select('+passwordHash');

    if (!user || !(await bcrypt.compare(password, user.passwordHash))) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password.',
      });
    }

    const authtoken = jwt.sign(
      { sub: user.id },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN || '1d' }
    );

    return res.status(200).json({
      success: true,
      authtoken,
      user: {
        id: user.id,
        fullName: user.fullName,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    return next(error);
  }
});

app.use((req, res) => {
  res.status(404).json({ success: false, message: 'Route not found.' });
});

app.use((error, req, res, next) => {
  console.error(error);
  const status = error.status || error.statusCode || 500;
  const message =
    status === 400 ? 'Invalid request body.' : 'An unexpected server error occurred.';
  res.status(status).json({ success: false, message });
});

async function startServer() {
  const { MONGODB_URI, JWT_SECRET } = process.env;

  if (!MONGODB_URI) {
    throw new Error('MONGODB_URI must be configured before starting the API.');
  }
  if (!JWT_SECRET || JWT_SECRET.length < 32) {
    throw new Error('JWT_SECRET must be set to a secret of at least 32 characters.');
  }

  await mongoose.connect(MONGODB_URI);
  app.listen(PORT, () => {
    console.log(`Auth API running on http://localhost:${PORT}`);
  });
}

if (require.main === module) {
  startServer().catch((error) => {
    console.error('Unable to start the auth API:', error.message);
    process.exitCode = 1;
  });
}

module.exports = app;
