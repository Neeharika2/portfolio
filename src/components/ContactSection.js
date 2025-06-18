
import React, { useState } from 'react';
import './ContactSection.css';
import { FaEnvelope, FaPhone, FaMapMarkerAlt, FaPaperPlane, FaLinkedin, FaGithub, FaTwitter } from 'react-icons/fa';

const ContactSection = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  
  const [submitted, setSubmitted] = useState(false);
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would normally send the form data to your backend or email service
    console.log(formData);
    setSubmitted(true);
    
    // Reset form after submission (simulating form submission)
    setTimeout(() => {
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      });
      setSubmitted(false);
    }, 3000);
  };

  return (
    <section className="contact-section" id="contact">
      <div className="container">
        <h2 className="section-title">Contact Me</h2>
        <p className="subtitle">Let's connect! Reach out to me for collaborations or opportunities</p>
        
        <div className="contact-container">
          <div className="contact-info">
            <div className="contact-method">
              <div className="contact-icon">
                <FaEnvelope />
              </div>
              <div>
                <h3>Email</h3>
                <p>neeharikagudipudi@gmail.com</p>
              </div>
            </div>
            
            <div className="contact-method">
              <div className="contact-icon">
                <FaPhone />
              </div>
              <div>
                <h3>Phone</h3>
                <p>+91 9866538293</p>
              </div>
            </div>
            
            <div className="contact-method">
              <div className="contact-icon">
                <FaMapMarkerAlt />
              </div>
              <div>
                <h3>Location</h3>
                <p>Guntur, AndhraPradesh</p>
              </div>
            </div>
            
            <div className="social-links">
              <a href="https://www.linkedin.com/in/neeharikagudipudi/" target="_blank" rel="noopener noreferrer" className="social-link">
                <FaLinkedin />
              </a>
              <a href="https://github.com/Neeharika@" target="_blank" rel="noopener noreferrer" className="social-link">
                <FaGithub />
              </a>
            </div>
          </div>
          
          <div className="contact-form-container">
            <form className="contact-form" onSubmit={handleSubmit}>
              <div className="form-group">
                <input 
                  type="text" 
                  name="name" 
                  placeholder="Your Name" 
                  value={formData.name}
                  onChange={handleChange}
                  required 
                />
              </div>
              
              <div className="form-group">
                <input 
                  type="email" 
                  name="email" 
                  placeholder="Your Email" 
                  value={formData.email}
                  onChange={handleChange}
                  required 
                />
              </div>
              
              <div className="form-group">
                <input 
                  type="text" 
                  name="subject" 
                  placeholder="Subject" 
                  value={formData.subject}
                  onChange={handleChange}
                  required 
                />
              </div>
              
              <div className="form-group">
                <textarea 
                  name="message" 
                  placeholder="Your Message" 
                  value={formData.message}
                  onChange={handleChange}
                  required
                ></textarea>
              </div>
              
              <button type="submit" className="submit-btn">
                {submitted ? 'Message Sent!' : 'Send Message'} 
                {!submitted && <FaPaperPlane className="btn-icon" />}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
