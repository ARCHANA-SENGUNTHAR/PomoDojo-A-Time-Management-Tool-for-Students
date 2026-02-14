import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import API from '../api/axios';
import './Login.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post(`${process.env.REACT_APP_API_URL}/api/login`, {
        email,
        password,
      });

      localStorage.setItem("userId", res.data.userId);
      localStorage.setItem("userName", res.data.name);
      localStorage.setItem("token", res.data.token);

      alert("✅ Login successful!");
      navigate("/pomodoro");
    } catch (err) {
      alert(err.response?.data?.error || "❌ Login failed!");
    }
  };

  return (
    <div className="page-wrapper">
      <div className="login-container">
        <div className="auth-left">
          <img src="/login-img.png" alt="Login Visual" />
        </div>
        <div className="auth-right">
          <form onSubmit={handleSubmit}>
            <h2>Welcome Back 👋</h2>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              required
            />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              required
            />
            <button type="submit">Login</button>
            <p>Don't have an account? <Link to="/signup">Sign Up</Link></p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
