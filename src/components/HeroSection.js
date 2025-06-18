import React from 'react';
import './HeroSection.css';
import { FaArrowRight } from 'react-icons/fa';

const HeroSection = () => {
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
              <a href="#about" className="btn">About Me</a>
              <a href="#contact" className="btn btn-outline">Contact Me</a>
            </div>
          </div>
          <div className="hero-image">
            <div className="shape shape-1"></div>
            <div className="shape shape-2"></div>
            <div className="shape shape-3"></div>
            {/* Avatar image removed */}
          </div>
        </div>
        <div className="scroll-indicator">
          <p>Scroll to explore</p>
          <FaArrowRight className="arrow-icon" />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
