// Services.jsx
import React from 'react';
import './Services.css';

const services = [
  {
    title: "Business Intelligence",
    description: "Custom dashboards, KPIs, and reports for smarter decision-making using Power BI & Tableau.",
  },
  {
    title: "Cloud Integration",
    description: "Deploy scalable cloud systems using AWS, Azure, or GCP tailored to your business needs.",
  },
  {
    title: "AI/ML Automation",
    description: "Develop predictive models and automation pipelines using cutting-edge AI/ML techniques.",
  },
  {
    title: "Custom Web Solutions",
    description: "Full-stack development of interactive web apps with modern frameworks and secure backends.",
  },
  {
    title: "Data Engineering",
    description: "ETL pipelines, data warehousing, and real-time data streaming solutions.",
  },
  {
    title: "Tech Consulting",
    description: "Expert guidance for digital transformation, architecture planning, and tool selection.",
  },
];

const Services = () => {
  return (
    <div className="services-page">
      <h1>Our Services</h1>
      <p className="intro">We provide data-driven, scalable, and modern solutions tailored to your needs.</p>

      <div className="services-grid">
        {services.map((service, index) => (
          <div key={index} className="service-card">
            <h3>{service.title}</h3>
            <p>{service.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Services;
