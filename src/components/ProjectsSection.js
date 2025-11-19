import React, { useState, useEffect } from 'react';
import './ProjectsSection.css';
import { FaArrowLeft, FaArrowRight, FaGithub, FaExternalLinkAlt, FaTimes, FaInfoCircle } from 'react-icons/fa';

const ProjectsSection = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentProject, setCurrentProject] = useState(0);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    async function loadProjects() {
      try {
        const response = await fetch(`${process.env.PUBLIC_URL}/projects.json`, { cache: 'no-cache' });
        if (!response.ok) throw new Error('Failed to fetch projects');
        const data = await response.json();
        setProjects(data.projects || []);
      } catch (err) {
        console.error('Error loading projects:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    loadProjects();
  }, []);
  
  const nextProject = () => {
    setCurrentProject((prev) => (prev === projects.length - 1 ? 0 : prev + 1));
  };
  
  const prevProject = () => {
    setCurrentProject((prev) => (prev === 0 ? projects.length - 1 : prev - 1));
  };

  if (loading) {
    return (
      <section className="projects-section" id="projects">
        <div className="container">
          <h2 className="section-title">Projects</h2>
          <p className="subtitle">Loading projects...</p>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="projects-section" id="projects">
        <div className="container">
          <h2 className="section-title">Projects</h2>
          <p className="subtitle">Failed to load projects. Please try again later.</p>
        </div>
      </section>
    );
  }

  if (!projects.length) {
    return (
      <section className="projects-section" id="projects">
        <div className="container">
          <h2 className="section-title">Projects</h2>
          <p className="subtitle">No projects available yet.</p>
        </div>
      </section>
    );
  }

  return (
    <section className="projects-section" id="projects">
      <div className="container">
        <h2 className="section-title">Projects</h2>
        <p className="subtitle">Check out some of my recent work</p>
        
        <div className="projects-content">
          <div className="project-list">
            {projects.map((project, index) => (
              <div 
                key={project.id}
                className={`project-item ${index === currentProject ? 'active' : ''}`}
                onClick={() => setCurrentProject(index)}
              >
                <h3>{project.title}</h3>
                
              </div>
            ))}
          </div>
          
          <div className="project-display">
            <div className="carousel-controls">
              <button className="carousel-btn" onClick={prevProject}>
                <FaArrowLeft />
              </button>
              <button className="carousel-btn" onClick={nextProject}>
                <FaArrowRight />
              </button>
            </div>
            
            <div className="project-carousel">
              {projects.map((project, index) => (
                <div 
                  key={project.id}
                  className={`project-card ${index === currentProject ? 'active' : ''}`}
                  style={{transform: `translateX(${(index - currentProject) * 100}%)`}}
                >
                  <div className="project-info">
                    <h3>{project.title}</h3>
                    <p>{project.description}</p>
                    <div className="project-tags">
                      {project.tags.map((tag, i) => (
                        <span key={i} className="tag">{tag}</span>
                      ))}
                    </div>
                    <div className="project-actions">
                      <div className="project-links">
                        <a href={project.github} target="_blank" rel="noopener noreferrer" className="project-link">
                          <FaGithub /> Code
                        </a>
                        <a href={project.demo} target="_blank" rel="noopener noreferrer" className="project-link">
                          <FaExternalLinkAlt /> Live Demo
                        </a>
                      </div>
                      <button 
                        className="project-details-btn"
                        onClick={() => setShowModal(index)}
                      >
                        <FaInfoCircle /> Project Details
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      
      {/* Project Details Modal */}
      {showModal !== false && (
        <div className="project-modal-overlay" onClick={() => setShowModal(false)}>
          <div className="project-modal" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close-btn" onClick={() => setShowModal(false)}>
              <FaTimes />
            </button>
            <h2>{projects[showModal].title}</h2>
            
            <div className="modal-section">
              <h3>Key Features</h3>
              <ul className="feature-list">
                {projects[showModal].features.map((feature, index) => (
                  <li key={index}>{feature}</li>
                ))}
              </ul>
            </div>
            
            <div className="modal-section">
              <h3>Challenges Faced</h3>
              <ul className="challenge-list">
                {projects[showModal].challenges.map((challenge, index) => (
                  <li key={index}>{challenge}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default ProjectsSection;
