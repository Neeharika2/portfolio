
import React, { useEffect, useState } from 'react';
import './SplashScreen.css';

const SplashScreen = ({ onComplete }) => {
  const [animationComplete, setAnimationComplete] = useState(false);
  const [startNameTransition, setStartNameTransition] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setStartNameTransition(true); // Start the transition
      
      setTimeout(() => {
        setAnimationComplete(true);
        setTimeout(() => {
          if (onComplete) onComplete();
        }, 100); // Reduced delay for smoother transition
      }, 200); // Reduced wait time
      
    }, 4000);

    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <div className={`splash-screen ${animationComplete ? 'fade-out' : ''}`}>
      <div className="splash-container">
        {/* NG Logo - will be hidden during transition */}
        <div className={`logo-container ${startNameTransition ? 'transition-out' : ''}`}>
          <div className="ng-logo">
            <div className="letter-n">N</div>
            <div className="letter-g">G</div>
          </div>
          <div className="logo-glow"></div>
        </div>
        
        {/* Tech elements - will be hidden during transition */}
        <div className={`tech-elements ${startNameTransition ? 'transition-out' : ''}`}>
          <div className="tech-element html-tag"><span>&lt;/&gt;</span></div>
          <div className="tech-element css-brackets"><span>{}</span></div>
          <div className="tech-element js-element"><span>()</span></div>
          <div className="tech-element react-element">
            <svg viewBox="0 0 100 100" className="react-svg">
              <circle cx="50" cy="50" r="8" className="react-core" />
              <ellipse cx="50" cy="50" rx="40" ry="15" className="react-orbit" />
              <ellipse cx="50" cy="50" rx="40" ry="15" className="react-orbit" style={{transform: 'rotate(60deg)'}} />
              <ellipse cx="50" cy="50" rx="40" ry="15" className="react-orbit" style={{transform: 'rotate(120deg)'}} />
            </svg>
          </div>
          <div className="tech-element database"><span>⫘</span></div>
          <div className="tech-element ui-wireframe">
            <div className="wireframe-line"></div>
            <div className="wireframe-line"></div>
            <div className="wireframe-line"></div>
          </div>
          
          {/* New developer tools */}
          <div className="tech-element node-element"><span>Node</span></div>
          <div className="tech-element git-element">
            <svg viewBox="0 0 100 100" className="git-svg">
              <path d="M50,20 L80,50 L50,80 L20,50 Z" className="git-shape" />
              <circle cx="50" cy="50" r="5" className="git-dot" />
              <circle cx="80" cy="50" r="5" className="git-dot" />
              <circle cx="50" cy="80" r="5" className="git-dot" />
            </svg>
          </div>
          <div className="tech-element api-element"><span>API</span></div>
          <div className="tech-element cloud-element">
            <svg viewBox="0 0 100 60" className="cloud-svg">
              <path d="M25,40 Q10,40 10,30 Q10,20 20,20 Q20,10 30,10 Q40,10 45,20 Q55,15 65,20 Q75,10 85,20 Q95,25 90,40 Z" className="cloud-shape" />
            </svg>
          </div>
          <div className="tech-element typescript-element"><span>JS</span></div>
          
          {/* Flask, AI, ML tools */}
          <div className="tech-element flask-element">
            <svg viewBox="0 0 100 100" className="flask-svg">
              <path d="M30,20 L30,50 L20,80 L80,80 L70,50 L70,20 Z" className="flask-shape" />
              <path d="M30,20 L70,20" className="flask-line" />
              <path d="M35,35 L65,35" className="flask-line" />
              <path d="M45,60 C50,55 55,65 60,60" className="flask-bubbles" />
            </svg>
          </div>
          <div className="tech-element ai-element"><span>AI</span></div>
          <div className="tech-element ml-element">
            <svg viewBox="0 0 100 100" className="ml-svg">
              <circle cx="30" cy="30" r="10" className="ml-node" />
              <circle cx="70" cy="30" r="10" className="ml-node" />
              <circle cx="30" cy="70" r="10" className="ml-node" />
              <circle cx="70" cy="70" r="10" className="ml-node" />
              <path d="M30,30 L70,30 L70,70 L30,70 Z" className="ml-connection" />
              <path d="M30,30 L70,70" className="ml-connection" />
              <path d="M70,30 L30,70" className="ml-connection" />
            </svg>
          </div>
        </div>
        
        {/* Particles */}
        <div className="particles">
          {[...Array(25)].map((_, i) => (
            <div key={i} className="particle"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 5}s`,
                animationDuration: `${3 + Math.random() * 7}s`
              }}
            ></div>
          ))}
        </div>
        
        {/* Design elements */}
        <div className="design-elements">
          <div className="design-circle circle-1"></div>
          <div className="design-circle circle-2"></div>
          <div className="design-circle circle-3"></div>
        </div>
      </div>
      
      <div className={`splash-text ${startNameTransition ? 'transition-out' : ''}`}>
        <h1>Creative Developer</h1>
        <p>Building beautiful digital experiences</p>
      </div>
    </div>
  );
};

export default SplashScreen;
