import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css';

const Navbar = ({ darkMode, setDarkMode }) => {
  const navigate = useNavigate();
  const userName = localStorage.getItem("userName");
  const userId = localStorage.getItem("userId");

  const handleLogout = () => {
  localStorage.clear();
  alert("👋 Logged out!");
  navigate('/login');
};

  return (
    <nav className="navbar">
      <h2 className="logo"><Link to="/">🍅 PomoDojo</Link></h2>

      <ul className="nav-links">
        {!userId && <li><Link to="/">🏠 Home</Link></li>}

        {userId ? (
          <>
            <li><Link to="/pomodoro">🍅 Timer</Link></li>
            <li><Link to="/sessions">📊 Sessions</Link></li>

            <li className="profile-dropdown">
              <img
                src="/profile.png" 
                alt="Profile"
                className="profile-img"
              />
              <ul className="dropdown-content">
                <li><Link to="/profile">👤 {userName}</Link></li>
                <li onClick={handleLogout}>🚪 Logout</li>
              </ul>
            </li>
          </>
        ) : (
          <li><Link to="/login">👤 Login</Link></li>
        )}

        <li>
          <label className="switch">
            <input
              type="checkbox"
              checked={darkMode}
              onChange={() => setDarkMode(!darkMode)}
            />
            <span className="slider round"></span>
          </label>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
