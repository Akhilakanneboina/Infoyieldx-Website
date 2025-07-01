import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

const services = [
  {
    title: "Data Analytics",
    description: "We transform raw data into actionable insights to drive business success.",
  },
  {
    title: "Cloud Solutions",
    description: "Leverage scalable cloud platforms for efficient storage and operations.",
  },
  {
  
    title: "AI & ML",
    description: "Implement AI/ML-driven automation for smarter decision-making.",
  },
  {
    title: "Web Development",
    description: "Build scalable, responsive websites tailored to your brand and needs.",
  },
  {
    title: "Mobile App Development",
    description: "Create intuitive mobile apps for iOS and Android platforms.",
  },
  {
    title: "UI/UX Design",
      slug: "ui-ux-design",
    description: "Design engaging, user-friendly interfaces for web and mobile apps.",
  },
  {
    title: "Cybersecurity",
    description: "Protect your digital assets with advanced security strategies.",
  },
  {
    title: "Blockchain Solutions",
    description: "Implement decentralized systems for secure, transparent operations.",
  },
];

const Home = () => {
  return (
    <div className="home">
      <header className="hero">
        <h1>Welcome to InfoYieldX</h1>
        <p>Empowering businesses through data-driven solutions</p>
      </header>

      <section className="services">
        <h2>What We Do</h2>
        <div className="card-container">
          {services.map((service, index) => {
            const slug = service.title.toLowerCase().replace(/[\s&\/]+/g, '-');
            return (
              <Link to={`/portfolio/${slug}`} key={index} className="card">
                <h3>{service.title}</h3>
                <p>{service.description}</p>
              </Link>
            );
          })}
        </div>
      </section>
    </div>
  );
};

export default Home;
