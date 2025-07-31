const Session = require('../models/Session');

// POST /api/sessions
const createSession = async (req, res) => {
  try {
    const { task, duration, completedAt } = req.body;
    const userId = req.user.id;

    console.log("✅ Creating session for:", userId);

    const session = new Session({
      user: userId,
      task,
      duration,
      completedAt,
    });

    await session.save();
    console.log("📥 Session saved:", session);
    res.status(201).json(session);
  } catch (err) {
    console.error("❌ Error saving session:", err);
    res.status(500).json({ error: 'Failed to create session' });
  }
};

// GET /api/sessions/user/:userId
const getUserSessions = async (req, res) => {
  try {
    const sessions = await Session.find({ user: req.params.userId }).sort({ createdAt: -1 });
    res.json(sessions);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch sessions' });
  }
};

// PUT /api/sessions/:id – Rename task only
const updateSession = async (req, res) => {
  const { task } = req.body;
  try {
    const updated = await Session.findByIdAndUpdate(
      req.params.id,
      { task },
      { new: true }
    );
    if (!updated) return res.status(404).json({ error: 'Session not found' });
    res.json(updated);
  } catch (err) {
    console.error("❌ Failed to update session:", err);
    res.status(500).json({ error: 'Update failed' });
  }
};

// DELETE /api/sessions/:id
const deleteSession = async (req, res) => {
  try {
    await Session.findByIdAndDelete(req.params.id);
    res.json({ message: 'Session deleted' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete session' });
  }
};

module.exports = {
  createSession,
  getUserSessions,
  updateSession, //Only once!
  deleteSession,
};
