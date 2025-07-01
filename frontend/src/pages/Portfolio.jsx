import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './Portfolio.css';
import dataAnalytics from '../assets/data-analytics.jpg';
import cloudSolutions from '../assets/cloud-solutions.jpg';
import aiML from '../assets/ai-ml.jpg';
import webDevelopment from '../assets/web-development.jpg';
import mobileApp from '../assets/mobile-app.jpg';
import uiux from '../assets/ui-ux.jpg';
import blockchain from '../assets/blockchain.jpg';
import cybersecurity from '../assets/cybersecurity.jpg';

const projectDetails = {
  "data-analytics": {
    title: "Data Analytics Projects",
    description: `
      Led multiple data analytics initiatives that transformed raw business data into strategic insights. 
      Developed interactive dashboards using Power BI and Tableau, implemented ETL pipelines with Python, and 
      delivered predictive analytics models for sales forecasting and customer segmentation.
      These projects helped stakeholders make data-driven decisions and improved overall business efficiency.
      I'm passionate about leveraging data to tell compelling stories and solve real-world business problems.
    `,
    image: dataAnalytics,
  },
   "cloud-solutions": {
    title: "Cloud Solutions Projects",
    description: `
      Designed and deployed cloud-native applications on AWS and Google Cloud Platform.
      Migrated on-premise systems to the cloud, implemented CI/CD pipelines using GitHub Actions and Docker,
      and ensured scalability and reliability using load balancers and auto-scaling groups.
      I believe in the power of cloud to bring agility and cost-efficiency to modern businesses.
    `,
    image: cloudSolutions,
  },
  "ai-ml": {
    title: "AI & ML Projects",
    description: `
      Developed and deployed machine learning models for fraud detection, sentiment analysis, and recommendation systems.
      Used tools like Scikit-Learn, TensorFlow, and Pandas to preprocess data and build robust models.
      One key project included automating customer support responses using a natural language processing model.
      As an enthusiast in AI, I enjoy building intelligent systems that adapt and learn from data.
    `,
    image: aiML,
  },
  "web-development": {
    title: "Web Development Projects",
    description: `
      Developed dynamic, full-stack websites using React.js for the frontend and Spring Boot with MySQL for the backend.
      Projects included a Job Application Portal, Complaint Management System, and a portfolio website.
      Focused on responsive design, secure authentication, and clean REST APIs.
      These experiences enhanced my problem-solving skills and taught me how to build user-centric applications.
    `,
    image: webDevelopment,
  },
  "mobile-app-development": {
    title: "Mobile App Development Projects",
    description: `
      Created cross-platform mobile apps using Flutter and React Native for services like food delivery, attendance tracking, and event booking.
      Integrated Firebase for real-time data and push notifications.
      Focused on building smooth UIs and offline-first functionality to enhance user experience.
      I love mobile development because it brings technology directly into the hands of users in a personal way.
    `,
    image: mobileApp,
  },
  "ui-ux-design": {
    title: "UI/UX Design Projects",
    description: `
      Designed intuitive, user-friendly interfaces for both web and mobile applications using Figma and Adobe XD.
      Collaborated with developers to ensure pixel-perfect implementation and accessibility compliance.
      Conducted user testing and feedback loops to iterate on wireframes and prototypes.
      I value UI/UX because great design turns good products into amazing user experiences.
    `,
    image: uiux,
  },
  "cybersecurity": {
    title: "Cybersecurity Projects",
    description: `
      Worked on implementing authentication systems, securing APIs, and conducting vulnerability assessments.
      Used JWT, OAuth 2.0, and HTTPS to protect user data and ensure secure communications.
      Built features to prevent SQL injection and XSS attacks, and learned basic penetration testing with OWASP tools.
      Cybersecurity taught me the importance of building trust and resilience into every line of code.
    `,
    image: cybersecurity,
  },
  "blockchain-solutions": {
    title: "Blockchain Projects",
    description: `
      Developed decentralized applications (DApps) and smart contracts using Solidity on Ethereum and Polygon networks.
      Projects included a simple voting app and a transparent supply chain tracker.
      Learned to work with Web3.js, MetaMask, and Truffle for blockchain integration.
      These projects deepened my interest in decentralization and how it can reshape trust in digital systems.
    `,
    image: blockchain,
  },
};

const Portfolio = () => {
  const { title } = useParams();
  const navigate = useNavigate();
  const project = projectDetails[title];

  const handleContactClick = () => {
    navigate('/contact');
  };

  if (!project) {
    return <h2 style={{ padding: '2rem' }}>Project not found!</h2>;
  }

  return (
    <div className="portfolio-detail">
      <h2>{project.title}</h2>
      <img src={project.image} alt={project.title} className="portfolio-image" />
      <p>{project.description}</p>

      <button onClick={handleContactClick} className="contact-button">
        Contact Us
      </button>
    </div>
  );
};

export default Portfolio;
