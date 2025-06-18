import React, { useState } from 'react';
import './ForgotPassword.css';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setError('');

    try {
      const response = await fetch('http://localhost:8080/api/auth/user/forgot-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      // ✅ Check if content-type is JSON to avoid crash
      const isJson = response.headers.get('content-type')?.includes('application/json');

      const data = isJson ? await response.json() : null;

      if (response.ok && data?.message) {
        setMessage(data.message);
        setEmail('');
      } else {
        setError(data?.message || '❌ Something went wrong.');
      }
    } catch (err) {
      console.error('Error:', err);
      setError('❌ Failed to send reset link. Please try again later.');
    }
  };

  return (
    <div className="forgot-password-container">
      <h2>Reset Your Password</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Enter your email:
          <input
            type="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>
        <button type="submit">Send Reset Link</button>
      </form>

      {message && <p className="success-msg">{message}</p>}
      {error && <p className="error-msg">{error}</p>}
    </div>
  );
};

export default ForgotPassword;
