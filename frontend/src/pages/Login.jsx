import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; // ✅ Import useNavigate
import './Login.css';

const Login = () => {
  const navigate = useNavigate(); // ✅ Initialize navigate
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  useEffect(() => {
    /* global google */
    if (window.google) {
      google.accounts.id.initialize({
        client_id: '944679613259-6dj3p7mnr8v9qji346vvc95i7hsr8f3r.apps.googleusercontent.com',
        callback: handleGoogleCredentialResponse,
      });

      google.accounts.id.renderButton(
        document.getElementById('googleSignInDiv'),
        { theme: 'outline', size: 'large' }
      );
    }
  }, []);

  const handleGoogleCredentialResponse = async (response) => {
    const idToken = response.credential;
    try {
      const res = await fetch('http://localhost:8080/api/auth/google-auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ idToken }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Google login failed');

      setSuccessMsg('✅ Google login successful!');
      setError('');
      setTimeout(() => navigate('/'), 1000); // ✅ Redirect to Home
    } catch (err) {
      setError(err.message);
      setSuccessMsg('');
    }
  };

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
      const response = await fetch('http://localhost:8080/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.error || 'Login failed');

      setError('');
      setSuccessMsg('✅ Login successful! Redirecting...');
      setTimeout(() => navigate('/'), 1000); // ✅ Redirect to Home
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
          <div id="googleSignInDiv"></div>
        </div>
      </form>
    </div>
  );
};

export default Login;
