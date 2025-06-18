
import React from 'react';
import './SkillsSection.css';
import { FaPython, FaDatabase, FaCode, FaServer, FaNetworkWired, FaTree } from 'react-icons/fa';
import { SiCplusplus, SiDjango, SiFlask, SiSqlite } from 'react-icons/si';

const SkillsSection = () => {
  const skills = [
    { name: 'Python', icon: <FaPython />, level: 90 },
    { name: 'C++', icon: <SiCplusplus />, level: 85 },
    { name: 'SQL', icon: <FaDatabase />, level: 80 },
    { name: 'SQLite', icon: <SiSqlite />, level: 75 },
    { name: 'Django', icon: <SiDjango />, level: 70 },
    { name: 'Flask', icon: <SiFlask />, level: 70 },
    { name: 'OOP', icon: <FaCode />, level: 85 },
    { name: 'OS', icon: <FaServer />, level: 75 },
    { name: 'DBMS', icon: <FaNetworkWired />, level: 80 },
    { name: 'DSA', icon: <FaTree />, level: 85 }
  ];

  return (
    <section className="skills-section" id="skills">
      <div className="container">
        <h2 className="section-title">My Skills</h2>
        <p className="subtitle">Here are the technologies and concepts I've been working with</p>
        
        <div className="skills-container">
          {skills.map((skill, index) => (
            <div className="skill-card" key={index}>
              <div className="skill-icon">{skill.icon}</div>
              <h3 className="skill-name">{skill.name}</h3>
              <div className="skill-bar">
                <div 
                  className="skill-level" 
                  style={{width: `${skill.level}%`}}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
