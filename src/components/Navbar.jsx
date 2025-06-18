import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/infoyieldx.png';
import './Navbar.css';


const Navbar = () => (
  <nav className="navbar">
    <div className="navbar-brand">
        
      <Link to="/">
   <img src={logo} alt="Logo" className="logo" />
      </Link>
    </div>
    
    <ul className="nav-links">
      <li><Link to="/">Home</Link></li>
      <li><Link to="/services">Services</Link></li>
      <li><Link to="/about">About</Link></li>
      <li><Link to="/contact">Contact</Link></li>
        <li><Link to="/portfolio">Portfolio</Link></li>
      <li><Link to="/login">Login</Link></li>
      <li><Link to="/register">Register</Link></li>
    
    </ul>
  </nav>
);

export default Navbar;
