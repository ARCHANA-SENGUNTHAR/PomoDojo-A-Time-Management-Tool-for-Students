import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css';

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="page-wrapper">
      <h1>🍅 Welcome to <span className="highlight">PomoDojo</span></h1>
      <p className="tagline">Master your focus. Defeat distractions. Build lasting habits.</p>
      
      <div className="features">
        <div className="feature-card">
          <img src="https://cdn-icons-png.flaticon.com/512/4201/4201973.png" alt="Focus" />
          <h3>Deep Focus</h3>
          <p>Stay productive with 25-minute work sessions.</p>
        </div>
        <div className="feature-card">
          <img src="https://cdn-icons-png.flaticon.com/512/3144/3144456.png" alt="Breaks" />
          <h3>Smart Breaks</h3>
          <p>Recharge effectively with short and long breaks.</p>
        </div>
        <div className="feature-card">
          <img src="https://cdn-icons-png.flaticon.com/512/942/942748.png" alt="History" />
          <h3>Track Progress</h3>
          <p>Login to save your sessions & view history.</p>
        </div>
      </div>

      <div className="cta-buttons">
        <button onClick={() => navigate('/pomodoro')}>🎯 Start Pomodoro</button>
        <button className="secondary-btn" onClick={() => navigate('/login')}>🔐 Login to Track Your Sessions</button>
      </div>
    </div>
  );
};

export default Home;
