// Contact.jsx
import React, { useState } from 'react';
import './Contact.css';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value});
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // You can add form validation or send data to API here
    setSubmitted(true);
  };

  return (
    <div className="contact-page">
      <h1>Contact Us</h1>
      <p>We’d love to hear from you! Fill out the form below or email us at <a href="mailto:contact@infoyieldx.com">contact@infoyieldx.com</a></p>
      
      {!submitted ? (
        <form onSubmit={handleSubmit} className="contact-form">
          <label>
            Name:
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              placeholder="Your full name"
            />
          </label>

          <label>
            Email:
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              placeholder="you@example.com"
            />
          </label>

          <label>
            Message:
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
              placeholder="Your message here..."
              rows="5"
            />
          </label>

          <button type="submit">Send Message</button>
        </form>
      ) : (
        <div className="thank-you-message">
          <h2>Thank you for reaching out!</h2>
          <p>We’ll get back to you as soon as possible.</p>
        </div>
      )}
    </div>
  );
};

export default Contact;
