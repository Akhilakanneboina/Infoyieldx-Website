import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/infoyieldx.png';
import './Navbar.css';

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const closeMenu = () => {
    setMenuOpen(false);
  };

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <Link to="/" onClick={closeMenu}>
          <img src={logo} alt="Logo" className="logo" />
        </Link>
      </div>

      {/* Hamburger Icon */}
      <div className="hamburger" onClick={toggleMenu}>
        <div></div>
        <div></div>
        <div></div>
      </div>

      {/* Nav Links */}
      <ul className={`nav-links ${menuOpen ? 'active' : ''}`}>
        <li><Link to="/" onClick={closeMenu}>Home</Link></li>
        <li><Link to="/services" onClick={closeMenu}>Services</Link></li>
        <li><Link to="/about" onClick={closeMenu}>About</Link></li>
        <li><Link to="/contact" onClick={closeMenu}>Contact</Link></li>
        <li><Link to="/portfolio" onClick={closeMenu}>Portfolio</Link></li>
        <li><Link to="/login" onClick={closeMenu}>Login</Link></li>
        <li><Link to="/register" onClick={closeMenu}>Register</Link></li>
      </ul>
    </nav>
  );
};

export default Navbar;
