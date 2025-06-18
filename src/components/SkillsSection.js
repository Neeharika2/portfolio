import React, { useState } from 'react';
import './SkillsSection.css';
import { FaPython, FaDatabase, FaCode, FaServer, FaNetworkWired, FaTree } from 'react-icons/fa';
import { SiCplusplus, SiFlask, SiSqlite, SiNodedotjs, SiLangchain, SiHuggingface } from 'react-icons/si';

const SkillsSection = () => {
  const [activeCategory, setActiveCategory] = useState('all');

  const skills = [
    { name: 'Python', icon: <FaPython />, level: 90, category: 'programming' },
    { name: 'C++', icon: <SiCplusplus />, level: 90, category: 'programming' },
    { name: 'SQL', icon: <FaDatabase />, level: 80, category: 'backend' },
    { name: 'SQLite', icon: <SiSqlite />, level: 60, category: 'backend' },
    { name: 'Node.js', icon: <SiNodedotjs />, level: 85, category: 'backend' },
    { name: 'Flask', icon: <SiFlask />, level: 85, category: 'backend' },
    { name: 'DBMS', icon: <FaNetworkWired />, level: 80, category: 'backend' },
    { name: 'OS', icon: <FaServer />, level: 75, category: 'CS Fundamentals' },
    { name: 'DSA', icon: <FaTree />, level: 85, category: 'CS Fundamentals' },
    { name: 'OOP', icon: <FaCode />, level: 85, category: 'CS Fundamentals' },
    { name: 'Langchain', icon: <SiLangchain />, level: 70, category: 'AI/ML & NLP tools' },
    { name: 'Huggingface', icon: <SiHuggingface/>, level: 65, category: 'AI/ML & NLP tools' }
  ];

  const categories = [
    { key: 'all', label: 'All Skills', count: skills.length },
    { key: 'programming', label: 'Programming', count: skills.filter(s => s.category === 'programming').length },
    { key: 'backend', label: 'Backend', count: skills.filter(s => s.category === 'backend').length },
    { key: 'AI/ML & NLP tools', label: 'AI/ML & NLP tools', count: skills.filter(s => s.category === 'AI/ML & NLP tools').length },
    { key: 'CS Fundamentals', label: 'CS Fundamentals', count: skills.filter(s => s.category === 'CS Fundamentals').length }
  ];

  const filteredSkills = activeCategory === 'all' 
    ? skills 
    : skills.filter(skill => skill.category === activeCategory);

  return (
    <section className="skills-section" id="skills">
      <div className="container">
        <h2 className="section-title">My Skills</h2>
        <p className="subtitle">Technologies and concepts I work with</p>
        
        <div className="category-filters">
          {categories.map((category) => (
            <button
              key={category.key}
              className={`filter-btn ${activeCategory === category.key ? 'active' : ''}`}
              onClick={() => setActiveCategory(category.key)}
            >
              {category.label}
              <span className="skill-count">({category.count})</span>
            </button>
          ))}
        </div>
        
        <div className="skills-container">
          {filteredSkills.map((skill, index) => (
            <div className="skill-card" key={`${skill.name}-${index}`}>
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
