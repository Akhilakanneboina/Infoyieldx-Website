// About.jsx
import React from 'react';
import './About.css';

const About = () => {
  return (
    <div className="about-page">
      <h1>About InfoYieldX</h1>
      <section className="mission">
        <h2>Our Mission</h2>
        <p>
          At InfoYieldX, our mission is to empower businesses by transforming data into actionable insights
          through innovative technology solutions and expert analytics.
        </p>
      </section>

      <section className="vision">
        <h2>Our Vision</h2>
        <p>
          To be the leading partner for organizations worldwide in unlocking the true potential of their data,
          fostering growth, innovation, and digital transformation.
        </p>
      </section>

      <section className="values">
        <h2>Our Core Values</h2>
        <ul>
          <li><strong>Innovation:</strong> Continuously pushing the boundaries of technology and analytics.</li>
          <li><strong>Integrity:</strong> Delivering honest, transparent, and trustworthy services.</li>
          <li><strong>Customer-Centric:</strong> Tailoring solutions to meet client needs and exceed expectations.</li>
          <li><strong>Collaboration:</strong> Building strong partnerships with clients and within our team.</li>
          <li><strong>Excellence:</strong> Commitment to quality and continuous improvement.</li>
        </ul>
      </section>
    </div>
  );
};

export default About;
