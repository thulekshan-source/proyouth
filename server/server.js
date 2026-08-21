require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
const mongoUri = process.env.MONGODB_URI || '';
const hasRealUri = mongoUri && !mongoUri.includes('<db_password>');

if (mongoUri.includes('<db_password>')) {
  console.warn('\n⚠️ WARNING: "MONGODB_URI" in server/.env still contains "<db_password>".');
  console.warn('   Add your MongoDB Atlas password to connect to your real database.\n');
}

// Active user store: the Mongoose model when a real database is configured,
// or a pure in-memory store as a zero-setup dev fallback.
let User;
let databaseMode = 'disconnected';

async function connectDB() {
  if (hasRealUri) {
    try {
      await mongoose.connect(mongoUri);
      User = require('./models/User');
      databaseMode = 'mongodb';
      console.log('Connected to MongoDB Atlas successfully!');
    } catch (err) {
      if (err.message && err.message.includes('bad auth')) {
        console.error('\n❌ MongoDB Authentication Failed: Please check your username and password in server/.env.');
        console.error('If your password contains special characters (like @, #, $, %), make sure to URL-encode them.\n');
      } else {
        console.error('MongoDB connection error:', err);
      }
      process.exit(1);
    }
    return;
  }

  // Fallback: in-memory user store (no credentials or downloads needed; data resets on restart)
  const { createMemoryUserStore } = require('./memoryUserStore');
  User = createMemoryUserStore();
  databaseMode = 'in-memory';
  console.warn('ℹ️  No usable MONGODB_URI found — using an in-memory user store (dev only, data resets on restart).');
  console.log('In-memory user store ready!');
}

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', database: databaseMode });
});

connectDB().catch(err => {
  console.error('Failed to start database:', err);
  process.exit(1);
});

// Register Route
app.post('/api/auth/register', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' });
    }

    // Check if user exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: 'User already exists' });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create user
    const user = new User({
      email,
      password: hashedPassword
    });

    await user.save();

    // Create token
    const token = jwt.sign(
      { userId: user._id, email: user.email },
      process.env.JWT_SECRET || 'secret',
      { expiresIn: '7d' }
    );

    res.status(201).json({
      message: 'User created successfully',
      user: { id: user._id, email: user.email },
      token
    });
  } catch (error) {
    console.error('Register error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Login Route
app.post('/api/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' });
    }

    // Find user
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ error: 'Invalid credentials' });
    }

    // Verify password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ error: 'Invalid credentials' });
    }

    // Create token
    const token = jwt.sign(
      { userId: user._id, email: user.email },
      process.env.JWT_SECRET || 'secret',
      { expiresIn: '7d' }
    );

    res.json({
      message: 'Login successful',
      user: { id: user._id, email: user.email },
      token
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Get Current User (Verify Token)
app.get('/api/auth/me', async (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ error: 'No token provided' });
    }

    const token = authHeader.split(' ')[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secret');
    
    const user = await User.findById(decoded.userId).select('-password');
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json({ user: { id: user._id, email: user.email } });
  } catch (error) {
    res.status(401).json({ error: 'Invalid token' });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
