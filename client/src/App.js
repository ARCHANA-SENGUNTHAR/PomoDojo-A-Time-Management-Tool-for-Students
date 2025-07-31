import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Pomodoro from './pages/Pomodoro';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Signup from './pages/Signup';
import Login from './pages/Login';
import Profile from './pages/Profile';
import SessionHistory from './pages/SessionHistory';
import Home from './pages/Home';

import './App.css';

function App() {
  const [darkMode, setDarkMode] = useState(localStorage.getItem("darkMode") === "true");

  return (
    <Router>
      <div className={`app-wrapper ${darkMode ? 'dark' : ''}`}>
        <Navbar darkMode={darkMode} setDarkMode={setDarkMode} />
        
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/pomodoro" element={<Pomodoro />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/sessions" element={<SessionHistory />} />
          </Routes>
        </main>

        <Footer />
      </div>
    </Router>
  );
}

export default App;