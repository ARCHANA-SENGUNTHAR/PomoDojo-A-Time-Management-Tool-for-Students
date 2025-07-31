const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String, // Hashed password
  sessions: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Session' }],
},{
  timestamps: true
});

module.exports = mongoose.model('User', userSchema);
