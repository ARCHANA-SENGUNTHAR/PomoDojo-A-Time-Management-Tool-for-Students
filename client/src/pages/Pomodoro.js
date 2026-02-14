import React, { useState, useEffect, useRef, useCallback } from 'react';
import './Pomodoro.css';
import axios from "axios";
import API from '../api/axios';

const Pomodoro = () => {
  const [secondsLeft, setSecondsLeft] = useState(25 * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [selectedMinutes, setSelectedMinutes] = useState(25);
  const [darkMode, setDarkMode] = useState(false);
  const [task, setTask] = useState('');
  const [sessions, setSessions] = useState([]);
  const [activeSessionId, setActiveSessionId] = useState(null); //Tracking current session ID

  const intervalRef = useRef(null);
  const audioRef = useRef(null);

  const token = localStorage.getItem("token");
  const userId = localStorage.getItem("userId");

const fetchSessions = useCallback(async () => {
  try {
    const res = await axios.get(
      `${process.env.REACT_APP_API_URL}/api/sessions/user/${userId}`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    setSessions(res.data);
  } catch (err) {
    console.error("Couldn't fetch sessions", err);
  }
}, [userId, token]);

  useEffect(() => {
    fetchSessions();
    const mode = localStorage.getItem("darkMode") === "true";
    setDarkMode(mode);
  }, [fetchSessions]);

  useEffect(() => {
    localStorage.setItem("darkMode", darkMode);
  }, [darkMode]);

  const formatTime = (secs) => {
    const minutes = Math.floor(secs / 60);
    const seconds = secs % 60;
    return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  };

  const handleSelectChange = (e) => {
    const mins = parseInt(e.target.value);
    setSelectedMinutes(mins);
    clearInterval(intervalRef.current);
    setSecondsLeft(mins * 60);
    setIsRunning(false);
    setActiveSessionId(null);
  };

  // 👉 Save a new session on timer start
  const createNewSession = async () => {
    try {
      const res = await API.post(
        `${process.env.REACT_APP_API_URL}/api/sessions`,
        {
          duration: selectedMinutes,
          task: task || "Unnamed Session",
          completedAt: null, // to mark completed at the end
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setActiveSessionId(res.data._id); //Track this session
      fetchSessions();
    } catch (err) {
      console.error("Couldn't create session", err);
    }
  };

  // To Save completed time & task at the end
  const completeSession = async () => {
    try {
      if (activeSessionId) {
        await API.put(
          `${process.env.REACT_APP_API_URL}/api/sessions/${activeSessionId}`,
          {
            task: task || "Unnamed Session",
            completedAt: new Date(),
          },
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setActiveSessionId(null);
        fetchSessions();
      }
    } catch (err) {
      console.error("Session completion failed", err);
    }
  };

  //Update task anytime while running
  useEffect(() => {
    const updateTask = async () => {
      if (activeSessionId) {
        try {
          await API.put(
            `${process.env.REACT_APP_API_URL}/api/sessions/${activeSessionId}`,
            { task: task || "Unnamed Session" },
            { headers: { Authorization: `Bearer ${token}` } }
          );
          fetchSessions();
        } catch (err) {
          console.error("Task update failed", err);
        }
      }
    };
    if (task !== '') updateTask();
  }, [task, activeSessionId, token, fetchSessions]);

  const deleteSession = async (id) => {
    try {
      await API.delete(`${process.env.REACT_APP_API_URL}/api/sessions/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchSessions();
    } catch (err) {
      console.error("Session delete failed", err);
    }
  };

  const startTimer = async () => {
    if (isRunning) return;
    setIsRunning(true);

    await createNewSession();

    intervalRef.current = setInterval(() => {
      setSecondsLeft((prev) => {
        if (prev === 0) {
          clearInterval(intervalRef.current);
          setIsRunning(false);
          completeSession();
          setTask(""); 

          if (audioRef.current) {
            audioRef.current.volume = 1.0;
            audioRef.current.play();
            setTimeout(() => {
              alert("⏰ Time's up!");
            }, audioRef.current.duration * 1000);
          } else {
            alert("⏰ Time's up!");
          }

          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const stopTimer = () => {
    clearInterval(intervalRef.current);
    setIsRunning(false);
  };

  const resetTimer = () => {
    clearInterval(intervalRef.current);
    setSecondsLeft(selectedMinutes * 60);
    setIsRunning(false);
    setActiveSessionId(null);
  };

  const progressPercentage = ((selectedMinutes * 60 - secondsLeft) / (selectedMinutes * 60)) * 100;

  return (
    <div className={`pomodoro-wrapper ${darkMode ? 'dark' : ''}`}>
      <audio ref={audioRef} src="/beep-warning.mp3" preload="auto" />

      <h1 className="title">🍅 PomoDojo</h1>

      <div className="mode-toggle">
        <label>
          <input type="checkbox" onChange={() => setDarkMode(!darkMode)} checked={darkMode} />
          {darkMode ? "🌙 Dark Mode" : "☀️ Light Mode"}
        </label>
      </div>
      {!isRunning && (
  <div className="task-input-wrapper">
    <label htmlFor="task">📝 Task Name:</label>
    <input
      id="task"
      type="text"
      placeholder="e.g., Finish DSA assignment"
      value={task}
      onChange={(e) => setTask(e.target.value)}
    />
  </div>
)}
      <div className="timer-circle">
        <svg className="progress-ring" width="180" height="180">
          <circle
            className="progress-ring__circle"
            stroke="#fff"
            strokeWidth="8"
            fill="transparent"
            r="85"
            cx="90"
            cy="90"
            style={{
              strokeDasharray: `${2 * Math.PI * 85}`,
              strokeDashoffset: `${2 * Math.PI * 85 * (1 - progressPercentage / 100)}`,
            }}
          />
        </svg>
        <div className="time-display">{formatTime(secondsLeft)}</div>
      </div>

      <select className="dropdown-select" value={selectedMinutes} onChange={handleSelectChange}>
        <option value={25}>🍅 Pomodoro (25 mins)</option>
        <option value={5}>☕ Short Break (5 mins)</option>
        <option value={15}>🧘 Long Break (15 mins)</option>
        <option value={30}>🎯 Focus Session (30 mins)</option>
        <option value={60}>📘 Deep Work (60 mins)</option>
      </select>

      <div className="custom-input">
        <label htmlFor="custom-minutes">Or enter custom time (in minutes):</label>
        <input
          id="custom-minutes"
          type="number"
          min="1"
          placeholder="e.g., 1"
          onChange={(e) => {
            const customMins = parseInt(e.target.value);
            if (!isNaN(customMins) && customMins > 0) {
              setSelectedMinutes(customMins);
              clearInterval(intervalRef.current);
              setSecondsLeft(customMins * 60);
              setIsRunning(false);
              setActiveSessionId(null);
            }
          }}
        />
      </div>

      <div className="btn-group">
        <button onClick={startTimer}>▶ Start</button>
        <button onClick={stopTimer}>⏸ Stop</button>
        <button onClick={resetTimer}>🔄 Reset</button>
      </div>

      {/* ✅ Session History (Optional) */}
      <div className="session-history">
        <h3>📋 Today’s Sessions</h3>
        <ul>
          {sessions.map((s) => (
            <li key={s._id}>
              <span>{s.task}</span> – {s.duration} min
              <button onClick={() => deleteSession(s._id)}>🗑️</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Pomodoro;
