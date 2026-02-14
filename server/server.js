const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const authRoutes = require('./routes/auth.js');
const sessionRoutes = require('./routes/sessions');

const app = express();

// ✅ CORS (we will update this again after frontend deploy)
app.use(cors({
  origin: "https://pomodojo-fawn.vercel.app",
  credentials: true
}));

app.use(express.json());

// ✅ Health check route (ADD THIS)
app.get("/", (req, res) => {
  res.send("🚀 Pomodojo API is running");
});

// Logging
app.use((req, res, next) => {
  console.log("➡️", req.method, req.path);
  next();
});

app.use('/api', authRoutes);
app.use('/api/sessions', sessionRoutes);

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch(err => console.error("❌ MongoDB Connection Error:", err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));