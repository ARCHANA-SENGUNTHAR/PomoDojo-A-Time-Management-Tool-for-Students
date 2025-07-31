const express = require('express');
const router = express.Router();
const {
  createSession,
  getUserSessions,
  updateSession,
  deleteSession,
} = require('../controllers/sessionController');
const auth = require('../middleware/auth');

// All routes protected by JWT auth
router.post('/', auth, createSession);
router.get('/user/:userId', auth, getUserSessions);
router.put('/:id', auth, updateSession);
router.delete('/:id', auth, deleteSession);

module.exports = router;
