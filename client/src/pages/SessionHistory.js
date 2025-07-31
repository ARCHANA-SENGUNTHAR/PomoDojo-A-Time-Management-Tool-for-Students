import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './SessionHistory.css';

function SessionHistory() {
  const [sessions, setSessions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingSessionId, setEditingSessionId] = useState(null);
  const [editedTask, setEditedTask] = useState('');

  const fetchSessions = async () => {
    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('userId');

    try {
      const res = await axios.get(`http://localhost:5000/api/sessions/user/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setSessions(res.data);
    } catch (error) {
      console.error('❌ Failed to fetch sessions:', error.response?.data || error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleRenameClick = (sessionId, currentTask) => {
    setEditingSessionId(sessionId);
    setEditedTask(currentTask || '');
  };

  const handleRenameSubmit = async (sessionId) => {
    const token = localStorage.getItem('token');
    try {
      const res = await axios.put(
        `http://localhost:5000/api/sessions/${sessionId}`,
        { task: editedTask },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );
      console.log("✅ Renamed:", res.data);
      // Update local state
      setSessions(sessions.map(s =>
        s._id === sessionId ? { ...s, task: editedTask } : s
      ));
      setEditingSessionId(null);
    } catch (error) {
      console.error("❌ Rename failed:", error.response?.data || error.message);
    }
  };

  useEffect(() => {
    fetchSessions();
  }, []);

  if (loading) return <div>Loading session history...</div>;

  return (
    <div className="history-container">
  <h2>Your Pomodoro Sessions</h2>
  {sessions.length === 0 ? (
    <p>No sessions found.</p>
  ) : (
    <div className="history-list">
      {sessions.map(session => (
        <div key={session._id} className="history-card">
          <div className="history-info">
            {editingSessionId === session._id ? (
              <>
                <input
                  type="text"
                  className="task-input"
                  value={editedTask}
                  onChange={(e) => setEditedTask(e.target.value)}
                />
              </>
            ) : (
              <>
                <span className="task">Task: {session.task || 'Unnamed Session'}</span>
                <span className="duration">Duration: {session.duration} mins</span>
                <span className="time">
                  Completed at: {new Date(session.completedAt).toLocaleString()}
                </span>
              </>
            )}
          </div>

          <div className="history-actions">
            {editingSessionId === session._id ? (
              <>
                <button onClick={() => handleRenameSubmit(session._id)}>💾 Save</button>
                <button onClick={() => setEditingSessionId(null)}>❌ Cancel</button>
              </>
            ) : (
              <button onClick={() => handleRenameClick(session._id, session.task)}>✏️ Edit</button>
            )}
          </div>
        </div>
      ))}
    </div>
  )}
</div>
  );
}

export default SessionHistory;
