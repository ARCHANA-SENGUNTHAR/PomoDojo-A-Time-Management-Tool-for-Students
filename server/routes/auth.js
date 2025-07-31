const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const auth = require('../middleware/auth');

const SECRET = process.env.JWT_SECRET || 'your_secret_key';

router.post('/register', async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const hashedPwd = await bcrypt.hash(password, 10);
    const user = new User({ name, email, password: hashedPwd });
    await user.save();
    res.status(201).json({ message: 'User registered successfully!' });
  } catch (err) {
    if (err.code === 11000) {
      return res.status(400).json({ error: 'Email already registered' });
    }
    res.status(500).json({ error: 'Registration failed.' });
  }
});

router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  console.log("📩 Incoming login attempt for email:", email);

  try {
    const user = await User.findOne({ email });
    console.log("👤 User fetched from DB:", user);

    if (!user) return res.status(401).json({ error: 'User not found' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ error: 'Invalid credentials' });

    const token = jwt.sign({ id: user._id }, SECRET, { expiresIn: '1h' });
    res.json({ token, userId: user._id, name: user.name });
  } catch (err) {
    console.error("❌ Error during login:", err);
    res.status(500).json({ error: 'Login failed' });
  }
});

 router.get('/profile', auth, async (req, res) => {
  const user = await User.findById(req.user);
  if (!user) return res.status(404).json({ error: 'User not found' });
  res.json(user);
});
module.exports = router;
