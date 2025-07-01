// ServiceDetails.jsx
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './ServiceDetails.css';

const serviceDetailsData = {
  'business-intelligence': {
    title: 'Business Intelligence',
    points: [
      'Custom dashboards with Power BI & Tableau.',
      'KPI tracking and business metrics.',
      'Self-service analytics and data exploration.',
      'Insightful reporting for strategic decisions.',
    ],
  },
  'cloud-integration': {
    title: 'Cloud Integration',
    points: [
      'Deploy systems on AWS, Azure, or GCP.',
      'Ensure scalability and security.',
      'Integrate CI/CD for automation.',
    ],
  },
  'ai-ml-automation': {
    title: 'AI/ML Automation',
    points: [
      'Build predictive models using ML algorithms.',
      'Implement automation pipelines.',
      'Enhance decision-making using AI.',
    ],
  },
  'custom-web-solutions': {
    title: 'Custom Web Solutions',
    points: [
      'Modern full-stack web apps.',
      'Secure backend services.',
      'Responsive user interfaces.',
    ],
  },
  'data-engineering': {
    title: 'Data Engineering',
    points: [
      'Design ETL pipelines.',
      'Build data warehouses.',
      'Enable real-time data processing.',
    ],
  },
  'tech-consulting': {
    title: 'Tech Consulting',
    points: [
      'Architect enterprise-level systems.',
      'Select the right tools for business.',
      'Guide digital transformation.',
    ],
  },
  'devops-automation': {
    title: 'DevOps Automation',
    points: [
      'Setup CI/CD pipelines using Jenkins, GitHub Actions.',
      'Containerization with Docker and orchestration using Kubernetes.',
      'Infrastructure as Code (IaC) with Terraform.',
      'Cloud-native monitoring and logging tools.',
    ],
  },
  'digital-marketing': {
    title: 'Digital Marketing',
    points: [
      'SEO, PPC, and content marketing strategies.',
      'Email marketing and social media campaigns.',
      'Performance tracking via Google Analytics.',
      'Optimized campaigns for lead generation and ROI.',
    ],
  },
};

const ServiceDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const service = serviceDetailsData[id];

  const handleSubscribe = () => {
    navigate('/login', { state: { selectedService: service?.title } });
  };

  if (!service) {
    return <h2>Service Not Found</h2>;
  }

  return (
    <div className="service-details-page">
      <h2>{service.title}</h2>
      <ul>
        {service.points.map((point, index) => (
          <li key={index}>{point}</li>
        ))}
      </ul>
      <button onClick={handleSubscribe} className="subscribe-button">Subscribe</button>
    </div>
  );
};

export default ServiceDetails;
