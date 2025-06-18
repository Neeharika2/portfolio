import React, { useState, useEffect } from 'react';
import './NavBar.css';
import { smoothScrollTo } from '../utils/smoothScroll';

const NavBar = () => {
  const [scrolled, setScrolled] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (e, targetId) => {
    e.preventDefault();
    smoothScrollTo(targetId);
  };

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <div className="navbar-container">
        <div className="logo">NG</div>
        <ul className="nav-menu">
          <li className="nav-item">
            <a href="#home" onClick={(e) => handleNavClick(e, 'home')}>Home</a>
          </li>
          <li className="nav-item">
            <a href="#about" onClick={(e) => handleNavClick(e, 'about')}>About</a>
          </li>
          <li className="nav-item">
            <a href="#achievements" onClick={(e) => handleNavClick(e, 'achievements')}>Achievements</a>
          </li>
          <li className="nav-item">
            <a href="#skills" onClick={(e) => handleNavClick(e, 'skills')}>Skills</a>
          </li>
          <li className="nav-item">
            <a href="#projects" onClick={(e) => handleNavClick(e, 'projects')}>Projects</a>
          </li>
          <li className="nav-item">
            <a href="#contact" onClick={(e) => handleNavClick(e, 'contact')}>Contact</a>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default NavBar;
