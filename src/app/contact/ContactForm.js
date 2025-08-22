'use client';

import React, { useState, useEffect } from 'react';
import { Mail, Phone, MapPin, Send, Github, Twitter, Instagram, Linkedin, X, CheckCircle, AlertCircle } from 'lucide-react';
import './styles/ContactForm.css';

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });
  const [isVisible, setIsVisible] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [submitStatus, setSubmitStatus] = useState({ message: '', type: '' });

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus({ message: '', type: '' });

    try {
      // Prepare data for API - use default phone if empty
      const submitData = {
        ...formData,
        phone: formData.phone || '0000000000'
      };

      const response = await fetch('/api/contacts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(submitData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to submit contact form');
      }

      setSubmitStatus({ 
        message: 'Thank you! Your message has been sent successfully. I\'ll get back to you soon.', 
        type: 'success' 
      });
      setFormData({ name: '', email: '', phone: '', message: '' });
    } catch (error) {
      setSubmitStatus({ 
        message: error.message || 'Oops! Something went wrong. Please try again.', 
        type: 'error' 
      });
    } finally {
      setIsSubmitting(false);
      setShowPopup(true);
      
      // Auto hide popup after 5 seconds
      setTimeout(() => {
        setShowPopup(false);
        setSubmitStatus({ message: '', type: '' });
      }, 5000);
    }
  };

  const closePopup = () => {
    setShowPopup(false);
    setSubmitStatus({ message: '', type: '' });
  };

  const contactInfo = [
    {
      icon: <Mail className="contact-icon" />,
      label: 'Email',
      value: 'shashidharak334@gmail.com',
      link: 'mailto:shashidharak334@gmail.com',
    },
    {
      icon: <Phone className="contact-icon" />,
      label: 'Phone',
      value: '+91 7760770725',
      link: 'https://wa.me/7760770725',
    },
    {
      icon: <MapPin className="contact-icon" />,
      label: 'Location',
      value: 'Belthangady 574214, Mangalore, Karnataka, India',
      link: null,
    },
  ];

  const socialLinks = [
    {
      icon: <Github className="social-icon" />,
      name: 'GitHub',
      url: 'https://github.com/Shashidharak89',
    },
    {
      icon: <Linkedin className="social-icon" />,
      name: 'LinkedIn',
      url: 'https://www.linkedin.com/in/shashidhara-k-a2374b31b',
    },
    {
      icon: <Twitter className="social-icon" />,
      name: 'Twitter',
      url: 'https://twitter.com',
    },
    {
      icon: <Instagram className="social-icon" />,
      name: 'Instagram',
      url: 'https://instagram.com/luminous_alpha_',
    },
  ];

  return (
    <div className={`contact-container ${isVisible ? 'animate-in' : ''}`}>
      {/* Success/Error Popup */}
      {showPopup && submitStatus.message && (
        <div className={`popup-overlay ${showPopup ? 'show' : ''}`}>
          <div className={`popup-card ${submitStatus.type}`}>
            <div className="popup-header">
              <div className="popup-icon">
                {submitStatus.type === 'success' ? (
                  <CheckCircle className="icon-success" />
                ) : (
                  <AlertCircle className="icon-error" />
                )}
              </div>
              <button className="popup-close" onClick={closePopup}>
                <X size={20} />
              </button>
            </div>
            <div className="popup-content">
              <h3 className="popup-title">
                {submitStatus.type === 'success' ? 'Message Sent!' : 'Submission Failed'}
              </h3>
              <p className="popup-message">{submitStatus.message}</p>
            </div>
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="contact-content">
        {/* Header Section */}
        <div className="contact-header">
          <h1 className="contact-title">
            Let's <span className="highlight">Connect</span>
          </h1>
          <p className="contact-subtitle">
            Ready to bring your ideas to life? Let's start a conversation and create something amazing together.
          </p>
        </div>

        {/* Content Grid */}
        <div className="contact-grid">
          {/* Contact Information Side */}
          <div className="contact-info">
            <div className="info-card">
              <h2 className="info-title">Get In Touch</h2>
              <p className="info-description">
                I'm passionate about creating innovative solutions and always excited to collaborate on new projects.
              </p>

              {/* Contact Details */}
              <div className="contact-details">
                {contactInfo.map((item, index) => (
                  <div key={index} className="contact-item" style={{ animationDelay: `${0.1 + index * 0.1}s` }}>
                    {item.icon}
                    <div className="contact-text">
                      <span className="contact-label">{item.label}</span>
                      {item.link ? (
                        <a href={item.link} className="contact-value">
                          {item.value}
                        </a>
                      ) : (
                        <span className="contact-value">{item.value}</span>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* Social Links */}
              <div className="social-section">
                <h3 className="social-title">Connect With Me</h3>
                <div className="social-links">
                  {socialLinks.map((social, index) => (
                    <a
                      key={index}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="social-link"
                      style={{ animationDelay: `${0.5 + index * 0.1}s` }}
                    >
                      {social.icon}
                      <span className="social-tooltip">{social.name}</span>
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form Side */}
          <div className="form-section">
            <div className="form-card">
              <h2 className="form-title">Send a Message</h2>
              <form onSubmit={handleSubmit} className="contact-form">
                <div className="form-group">
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="form-input"
                    placeholder=" "
                    disabled={isSubmitting}
                  />
                  <label className="form-label">Full Name *</label>
                </div>

                <div className="form-group">
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="form-input"
                    placeholder=" "
                    disabled={isSubmitting}
                  />
                  <label className="form-label">Email Address *</label>
                </div>

                <div className="form-group">
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="form-input"
                    placeholder=" "
                    disabled={isSubmitting}
                  />
                  <label className="form-label">Phone Number (Optional)</label>
                </div>

                <div className="form-group">
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows="5"
                    className="form-textarea"
                    placeholder=" "
                    disabled={isSubmitting}
                  ></textarea>
                  <label className="form-label">Your Message *</label>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`submit-btn ${isSubmitting ? 'submitting' : ''}`}
                >
                  <span className="btn-text">
                    {isSubmitting ? 'Sending...' : 'Send Message'}
                  </span>
                  <Send className="btn-icon" />
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactForm;