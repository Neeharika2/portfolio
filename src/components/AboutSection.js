import React from 'react';
import './AboutSection.css';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import { smoothScrollTo } from '../utils/smoothScroll';

const AboutSection = () => {
  const handleScrollClick = (e, targetId) => {
    e.preventDefault();
    smoothScrollTo(targetId);
  };

  return (
    <section className="about-section" id="about">
      <div className="container">
        <h2 className="section-title">About Me</h2>
        <div className="about-content">
          <div className="about-text">
            <p className="subtitle">
              Motivated and results-driven B.Tech 3rd-year IT student with a strong foundation in 
              Python, C++, and Data Structures & Algorithms. Enthusiastic about building innovative 
              tech solutions, participating in hackathons, and tackling real-world problems through code. 
              Actively involved in hands-on projects and competitive programming, with a relentless passion 
              for learning and staying ahead in the ever-evolving tech landscape.
            </p>
            
            <div className="about-links">
              <a href="https://github.com/your-username" target="_blank" rel="noopener noreferrer" className="social-link">
                <FaGithub /> GitHub
              </a>
              <a href="https://linkedin.com/in/your-username" target="_blank" rel="noopener noreferrer" className="social-link">
  <FaLinkedin /> LinkedIn
</a>
              <a href="/resume.pdf" download className="btn">Download Resume</a>
            </div>
            
            <a href="#projects" className="btn btn-outline view-work-btn" onClick={(e) => handleScrollClick(e, 'projects')}>View My Work</a>
          </div>
          
          <div className="about-decoration">
            <div className="blob blob-1"></div>
            <div className="blob blob-2"></div>
            <div className="code-block">
              <pre>
                <code>{`function aboutMe() {
  const skills = [
    'Python', 
    'C++', 
    'DSA', 
    'SQL'
  ];
  
  return {
    passion: 'Problem Solving',
    goal: 'Innovative Solutions'
  };
}`}</code>
              </pre>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
