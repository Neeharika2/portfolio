import React, { useState } from 'react';
import './ProjectsSection.css';
import { FaArrowLeft, FaArrowRight, FaGithub, FaExternalLinkAlt, FaTimes, FaInfoCircle } from 'react-icons/fa';

const ProjectsSection = () => {
  const projects = [
    {
      id: 1,
      title: "GiGy - Simplified Freelance Platform",
      description: "A minimalist freelance marketplace with real-time chat, gig posting, and seamless user experience.",
      tags: [
        "React.js",
        "Node.js",
        "Express.js",
        "MongoDB",
        "Socket.IO",
        "JWT",
        "NGINX",
        "PM2"
      ],
      github: "https://github.com/Neeharika2/GiGy",
      demo: "http://4.240.88.99/",
      features: [
        "User registration and authentication with JWT.",
        "Gig posting, assignment, and completion flow.",
        "Applications and reviews for gigs.",
        "Real-time chat with Socket.IO and room-based logic.",
        "Profile management with image uploads via Cloudinary.",
        "Secure REST API endpoints with token-based auth.",
        "Production deployment with NGINX and PM2 on Azure."
      ],
      challenges: [
        "💬 Real-Time Chat: Implementing room-based logic and handling socket disconnections/reconnections.",
        "🔑 Authentication: Secure handling of token expiration during API requests.",
        "📷 File Uploads: Syncing Cloudinary uploads with MongoDB document updates.",
        "⚙️ Deployment: Configuring NGINX reverse proxy, SSL certificates, and PM2 process management.",
        "⚡ Performance: Stress-testing endpoints with K6 and debugging MongoDB query performance."
      ],
    },
    {
      id: 2,
      title: "RAG PDF Summarizer",
      description: "AI-powered application that summarizes PDF documents using RAG architecture",
      tags: ["Python", "LangChain", "Hugging Face", "RAG", "NLP", "PDF Processing"],
      github: "https://github.com/Neeharika2/rag-pdf-summarizer",
      demo: "",
      features: [
        "Upload and process PDF documents of any size.",
        "Extract text and create vector embeddings for efficient retrieval.",
        "Generate accurate summaries using RAG (Retrieval-Augmented Generation).",
        "Interactive chat interface to ask questions about the document.",
        "Support for multiple file formats and batch processing."
      ],
      challenges: [
        "🔍 Text Extraction: Handling complex PDF layouts, tables, and mixed content while maintaining context and structure.",
        "⚡ Vector Storage: Implementing efficient vector database for large documents and optimizing retrieval speed.",
        "🧠 RAG Pipeline: Fine-tuning the retrieval mechanism to fetch most relevant chunks for accurate summarization.",
        "💾 Memory Management: Handling large documents without overwhelming system resources during processing."
      ]
    },
    {
      id: 4,
      title: "Nearby Places",
      description: "Web app to find nearby places using Google Maps API and Flask",
      tags: ["Python", "Flask","Google Maps API", "HTML5", "CSS3"],
      github: "https://github.com/Neeharika2/Nearby-places",
      demo: "",
      features: [
        "Listings of rental properties with images and descriptions.",
        "Integration with map services to show nearby places.",
        "Route visualization to selected properties.",
        "User-friendly, responsive design."
      ],
      challenges: [
        "📍 Accurate Mapping: Integrating location APIs and ensuring accurate geolocation data was tricky.",
        "🧭 Route Optimization: Implementing route visualizations dynamically depending on user location required handling real-time geolocation.",
        "🔍 Filtering Nearby Places: Filtering and displaying only relevant nearby places without cluttering the map UI took careful design planning."
      ]
    },
    {
      id: 3,
      title: "Fee Tracking System",
      description: "Web application for tracking fees and payments using React and Django",
      tags: ["Python", "Flask", "Matplotlib", "Seaborn","HTML5", "CSS3"],
      github: "https://github.com/Neeharika2/CRT_fee_tracking",
      demo: "",
      features: [
        "Add/view/update student records.",
        "Toggle fee status (Paid/Unpaid).",
        "Visualize data using bar graphs and pie charts.",
        "Export filtered records (paid/unpaid) to Excel sheets."
      ],
      challenges: [
        "📈 Dynamic Graph Generation: Creating real-time visual graphs using Matplotlib and Seaborn based on database changes.",
        "📤 Excel Export: Automating data export with filters (only paid/unpaid) and formatting it in a readable way.",
        "💾 Data Management: Managing a clean and searchable student database that scales well with large entries."
      ]
    },
    {
      id: 5,
      title: "Travel Assistant Chatbot",
      description: "Chatbot for travel assistance using Python and Flask",
      tags: [ "Flask", "Python", "API"],
      github: "https://github.com/Neeharika2/travel_assistant_chatbot2",
      demo: "",
      features: [
        "Intelligent chatbot that understands natural queries.",
        "Suggests must-visit places, foods, and custom itineraries.",
        "Provides travel tips and local customs.",
        "Easy integration into websites or apps."
      ],
      challenges: [
        "🧠 AI Response Quality: Training/using the AI to provide contextually accurate and culturally relevant travel recommendations.",
        "🌍 Dynamic Recommendations: Ensuring recommendations are tailored to the user's preferences and location.",
        "🔌 Integration: Embedding the chatbot into the UI without affecting performance or responsiveness."
      ]
    },
  ];
  
  const [currentProject, setCurrentProject] = useState(0);
  const [showModal, setShowModal] = useState(false);
  
  const nextProject = () => {
    setCurrentProject((prev) => (prev === projects.length - 1 ? 0 : prev + 1));
  };
  
  const prevProject = () => {
    setCurrentProject((prev) => (prev === 0 ? projects.length - 1 : prev - 1));
  };

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
