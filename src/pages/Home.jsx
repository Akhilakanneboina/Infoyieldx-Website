// Home.jsx
import React from 'react';
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
          {services.map((service, index) => (
            <div key={index} className="card">
              <h3>{service.title}</h3>
              <p>{service.description}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;
