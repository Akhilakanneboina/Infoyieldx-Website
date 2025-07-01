import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Register.css';

const Register = () => {
  const navigate = useNavigate();

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

  const togglePasswordVisibility = () => setShowPassword((prev) => !prev);
  const toggleConfirmPasswordVisibility = () => setShowConfirmPassword((prev) => !prev);

  // ✅ Strong validation function
  const validate = () => {
    const newErrors = {};

    if (!formData.username.trim()) {
      newErrors.username = "Username is required";
    } else if (formData.username.trim().length < 3) {
      newErrors.username = "Username must be at least 3 characters";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(formData.email)) {
      newErrors.email = "Email format is invalid";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
    } else if (!/[A-Z]/.test(formData.password)) {
      newErrors.password = "Include at least one uppercase letter";
    } else if (!/[a-z]/.test(formData.password)) {
      newErrors.password = "Include at least one lowercase letter";
    } else if (!/[0-9]/.test(formData.password)) {
      newErrors.password = "Include at least one number";
    } else if (!/[@$!%*?&#]/.test(formData.password)) {
      newErrors.password = "Include at least one special character (@$!%*?&#)";
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Confirm Password is required";
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords must match";
    }

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
          headers: { "Content-Type": "application/json" },
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
          setFormData({ username: '', email: '', password: '', confirmPassword: '' });
        } else {
          setErrors({ apiError: result });
          setSuccessMsg('');
        }
      } catch (error) {
        console.error("❌ Error during registration:", error);
        setErrors({ apiError: "Registration failed. Try again later." });
        setSuccessMsg('');
      }
    } else {
      setErrors(validationErrors);
      setSuccessMsg('');
    }
  };

  // ✅ Google Sign-Up using Google Identity Services
  useEffect(() => {
    /* global google */
    if (window.google) {
      google.accounts.id.initialize({
        client_id: "944679613259-6dj3p7mnr8v9qji346vvc95i7hsr8f3r.apps.googleusercontent.com",
        callback: handleGoogleResponse,
      });

      google.accounts.id.renderButton(
        document.getElementById("google-register-btn"),
        { theme: "outline", size: "large" }
      );
    }
  }, []);

  const handleGoogleResponse = async (response) => {
    const idToken = response.credential;
    try {
      const res = await fetch("http://localhost:8080/api/auth/google-register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ idToken }),
      });

      const resultText = await res.text();
      if (res.ok) {
        setSuccessMsg("✅ Google registration successful!");
        setErrors({});
        setTimeout(() => navigate("/"), 1000);
      } else {
        setErrors({ apiError: resultText });
        setSuccessMsg('');
      }
    } catch (err) {
      console.error("❌ Google registration error:", err);
      setErrors({ apiError: "❌ Google Sign-In failed. Try again later." });
      setSuccessMsg('');
    }
  };

  return (
    <div className="auth-container">
      <h2>Register</h2>
      <form onSubmit={handleSubmit} className="auth-form">
        <label>
          Username:
          <input type="text" name="username" value={formData.username} onChange={handleChange} required />
          {errors.username && <small className="error">{errors.username}</small>}
        </label>

        <label>
          Email:
          <input type="email" name="email" value={formData.email} onChange={handleChange} required />
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
          <div id="google-register-btn"></div>
        </div>

        <p className="login-link">
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </form>
    </div>
  );
};

export default Register;
