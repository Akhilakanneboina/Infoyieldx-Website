// Services.jsx
import React from 'react';
import './Services.css';
import { Link } from 'react-router-dom'; 

const services = [
  {
    id: "business-intelligence",
    title: "Business Intelligence",
    description: "Custom dashboards, KPIs, and reports for smarter decision-making using Power BI & Tableau.",
  },
  {
    id: "cloud-integration",
    title: "Cloud Integration",
    description: "Deploy scalable cloud systems using AWS, Azure, or GCP tailored to your business needs.",
  },
  {
    id: "ai-ml-automation",
    title: "AI/ML Automation",
    description: "Develop predictive models and automation pipelines using cutting-edge AI/ML techniques.",
  },
  {
    id: "custom-web-solutions",
    title: "Custom Web Solutions",
    description: "Full-stack development of interactive web apps with modern frameworks and secure backends.",
  },
  {
    id: "data-engineering",
    title: "Data Engineering",
    description: "ETL pipelines, data warehousing, and real-time data streaming solutions.",
  },
  {
    id: "tech-consulting",
    title: "Tech Consulting",
    description: "Expert guidance for digital transformation, architecture planning, and tool selection.",
  },
  {
    id: "devops-automation",
    title: "DevOps Automation",
    description: "CI/CD pipelines, Docker, Kubernetes, and cloud-native practices for efficient delivery.",
  },
  {
    id: "digital-marketing",
    title: "Digital Marketing",
    description: "SEO, SEM, social media campaigns, and content strategies to grow your digital reach.",
  },
];

const Services = () => {
  return (
    <div className="services-page">
      <h1>Our Services</h1>
      <p className="intro">We provide data-driven, scalable, and modern solutions tailored to your needs.</p>

      <div className="services-grid">
        {services.map((service, index) => (
          <Link
            key={index}
            to={`/services/${service.id}`}
            className="service-card-link"
          >
            <div className="service-card">
              <h3>{service.title}</h3>
              <p>{service.description}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Services;
