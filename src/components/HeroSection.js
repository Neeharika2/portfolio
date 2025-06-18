import React from 'react';
import './HeroSection.css';
import { FaArrowRight } from 'react-icons/fa';
import { smoothScrollTo } from '../utils/smoothScroll';

const HeroSection = () => {
  const handleScrollClick = (e, targetId) => {
    e.preventDefault();
    smoothScrollTo(targetId);
  };

  return (
    <section className="hero-section" id="home">
      <div className="hero-container">
        <div className="hero-content">
          <div className="hero-text">
            <h1 className="hero-title">Hi, I'm </h1>
            <h1 className="hero-title2">Neeharika Gudipudi</h1>
            <p className="hero-subtitle">
              B.Tech IT student passionate about creating innovative solutions through code.
              Exploring the intersection of technology and real-world problem solving.
            </p>
            <div className="hero-buttons">
              <a href="#about" className="btn" onClick={(e) => handleScrollClick(e, 'about')}>About Me</a>
              <a href="#contact" className="btn btn-outline" onClick={(e) => handleScrollClick(e, 'contact')}>Contact Me</a>
            </div>
          </div>
          <div className="hero-image">
            <div className="shape shape-1"></div>
            <div className="shape shape-2"></div>
            <div className="shape shape-3"></div>
            {/* Avatar image removed */}
          </div>
        </div>
        <div className="scroll-indicator" onClick={(e) => handleScrollClick(e, 'about')}>
          <p>Scroll to explore</p>
          <FaArrowRight className="arrow-icon" />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
