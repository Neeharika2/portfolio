
import React from 'react';
import './AchievementsSection.css';
import { FaCode, FaHackerrank, FaUsers } from 'react-icons/fa';

const AchievementsSection = () => {
  const achievements = [
    {
      icon: <FaCode />,
      title: "LeetCode",
      description: "450+ problems solved"
    },
    {
      icon: <FaHackerrank />,
      title: "HackerRank",
      description: "5★ in Python & Problem Solving"
    },
    {
      icon: <FaUsers />,
      title: "Mentee at CodessCafe",
      description: "Selected as mentee in coding and professional development program"
    }
  ];

  return (
    <section className="achievements-section" id="achievements">
      <div className="container">
        <h2 className="section-title">Achievements</h2>
        <p className="subtitle">Recognition of my technical journey and competitive programming excellence</p>
        
        <div className="achievements-container">
          {achievements.map((achievement, index) => (
            <div className="achievement-item" key={index}>
              <div className="achievement-icon">
                {achievement.icon}
              </div>
              <div className="achievement-content">
                <h3>{achievement.title}</h3>
                <p>{achievement.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AchievementsSection;
