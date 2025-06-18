import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Register.css';

const Register = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [errors, setErrors] = useState({});
  const [successMsg, setSuccessMsg] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword((prev) => !prev);
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.username.trim()) newErrors.username = "Username is required";
    if (!formData.email.trim()) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = "Email is invalid";
    if (!formData.password) newErrors.password = "Password is required";
    if (formData.password !== formData.confirmPassword)
      newErrors.confirmPassword = "Passwords must match";
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length === 0) {
      setErrors({});
      try {
        const response = await fetch("http://localhost:8080/api/auth/register", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userName: formData.username,
            email: formData.email,
            password: formData.password,
            confirmPassword: formData.confirmPassword,
          }),
        });

        const result = await response.text();

        if (response.ok) {
          setSuccessMsg(result);
          setFormData({
            username: '',
            email: '',
            password: '',
            confirmPassword: '',
          });
        } else {
          setErrors({ apiError: result });
          setSuccessMsg('');
        }
      } catch (error) {
        setErrors({ apiError: "Registration failed. Try again later." });
        setSuccessMsg('');
      }
    } else {
      setErrors(validationErrors);
      setSuccessMsg('');
    }
  };

  return (
    <div className="auth-container">
      <h2>Register</h2>
      <form onSubmit={handleSubmit} className="auth-form">
        <label>
          Username:
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
          />
          {errors.username && <small className="error">{errors.username}</small>}
        </label>

        <label>
          Email:
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          {errors.email && <small className="error">{errors.email}</small>}
        </label>

        <label>
          Password:
          <div className="password-wrapper">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
            <span className="toggle-icon" onClick={togglePasswordVisibility}>
              {showPassword ? '🙈' : '👁️'}
            </span>
          </div>
          {errors.password && <small className="error">{errors.password}</small>}
        </label>

        <label>
          Confirm Password:
          <div className="password-wrapper">
            <input
              type={showConfirmPassword ? "text" : "password"}
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
            />
            <span className="toggle-icon" onClick={toggleConfirmPasswordVisibility}>
              {showConfirmPassword ? '🙈' : '👁️'}
            </span>
          </div>
          {errors.confirmPassword && <small className="error">{errors.confirmPassword}</small>}
        </label>

        <button type="submit">Register</button>

        {errors.apiError && <p className="error">{errors.apiError}</p>}
        {successMsg && <p className="success-msg">{successMsg}</p>}

        <div className="google-login-wrapper">
          <p style={{ margin: '10px 0' }}>Or Register with Google:</p>
          <button
            type="button"
            className="google-btn"
            onClick={() =>
              window.location.href = "http://localhost:8080/oauth2/authorization/google"
            }
          >
            Register with Google
          </button>
        </div>

        <p className="login-link">
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </form>
    </div>
  );
};

export default Register;
