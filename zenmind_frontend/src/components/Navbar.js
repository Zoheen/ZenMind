// Navbar.js
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <Link to="/" className="navbar-logo">
          ZenMind
        </Link>
        <button className="navbar-toggle" onClick={toggleMenu}>
          <span className="hamburger"></span>
        </button>
      </div>

      <div className={`navbar-menu ${isMenuOpen ? 'active' : ''}`}>
        <Link 
          to="/" 
          className={`navbar-item ${location.pathname === '/' ? 'active' : ''}`}
        >
          Home
        </Link>
        <Link 
          to="/todo" 
          className={`navbar-item ${location.pathname === '/Todo' ? 'active' : ''}`}
        >
          Tasks
        </Link>
        <Link 
          to="/Journaling" 
          className={`navbar-item ${location.pathname === '/Journaling' ? 'active' : ''}`}
        >
          Journal
        </Link>
        <Link 
          to="/Breathing-exercise" 
          className={`navbar-item ${location.pathname === '/Breathing-exercise' ? 'active' : ''}`}
        >
          Breathing Exercise
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;