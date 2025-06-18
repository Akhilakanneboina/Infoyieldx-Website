import React, { useState } from 'react';
import './Login.css';

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.email || !formData.password) {
      setError('Email and password are required');
      setSuccessMsg('');
      return;
    }

    try {
      const response = await fetch("http://localhost:8080/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (!response.ok) throw new Error(data.error || "Login failed");

      setError('');
      setSuccessMsg('Login successful! Redirecting...');
      // Optional: localStorage.setItem("token", data.token);
    } catch (err) {
      setError(err.message);
      setSuccessMsg('');
    }
  };

  return (
    <div className="auth-container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit} className="auth-form">
        <label>
          Email:
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Password:
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </label>

        {error && <small className="error">{error}</small>}
        {successMsg && <p className="success-msg">{successMsg}</p>}

        <button type="submit">Login</button>
        <p><a href="/forgot-password">Forgot Password?</a></p>

        <div className="google-login-wrapper">
          <p style={{ margin: '10px 0' }}>Or Login with Google:</p>
          <button
            type="button"
            className="google-btn"
            onClick={() =>
              window.location.href = "http://localhost:8080/oauth2/authorization/google"
            }
          >
            Login with Google
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;
