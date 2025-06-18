'use client';

import React, { useState, useEffect } from 'react';
import { Mail, Phone, MapPin, Send, Github, Twitter, Instagram, Linkedin } from 'lucide-react';
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
  const [submitStatus, setSubmitStatus] = useState({ message: '', type: '' }); // For success/error feedback

  useEffect(() => {
    setIsVisible(true);
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
      const response = await fetch('/api/contacts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to submit contact form');
      }

      setSubmitStatus({ message: 'Message sent successfully!', type: 'success' });
      setFormData({ name: '', email: '', phone: '', message: '' }); // Clear form
    } catch (error) {
      setSubmitStatus({ message: error.message || 'Something went wrong', type: 'error' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactInfo = [
    {
      icon: <Mail className="portfolio-contact-icon" />,
      label: 'Email',
      value: 'john.doe@example.com',
      link: 'mailto:john.doe@example.com',
    },
    {
      icon: <Phone className="portfolio-contact-icon" />,
      label: 'Phone',
      value: '+1 (555) 123-4567',
      link: 'tel:+15551234567',
    },
    {
      icon: <MapPin className="portfolio-contact-icon" />,
      label: 'Location',
      value: 'San Francisco, CA',
      link: null,
    },
  ];

  const socialLinks = [
    {
      icon: <Github className="portfolio-social-icon" />,
      name: 'GitHub',
      url: 'https://github.com/johndoe',
      color: '#333',
    },
    {
      icon: <Linkedin className="portfolio-social-icon" />,
      name: 'LinkedIn',
      url: 'https://linkedin.com/in/johndoe',
      color: '#0077b5',
    },
    {
      icon: <Twitter className="portfolio-social-icon" />,
      name: 'Twitter',
      url: 'https://twitter.com/johndoe',
      color: '#1da1f2',
    },
    {
      icon: <Instagram className="portfolio-social-icon" />,
      name: 'Instagram',
      url: 'https://instagram.com/johndoe',
      color: '#e4405f',
    },
  ];

  return (
    <div className={`portfolio-contact-container ${isVisible ? 'portfolio-animate-in' : ''}`}>
      {/* Animated Background Elements */}
      <div className="portfolio-bg-shapes">
        <div className="portfolio-shape portfolio-shape-1"></div>
        <div className="portfolio-shape portfolio-shape-2"></div>
        <div className="portfolio-shape portfolio-shape-3"></div>
        <div className="portfolio-floating-dots">
          {[...Array(20)].map((_, i) => (
            <div key={i} className={`portfolio-dot portfolio-dot-${i + 1}`}></div>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="portfolio-contact-content">
        {/* Header Section */}
        <div className="portfolio-contact-header">
          <h1 className="portfolio-contact-title">
            Let's <span className="portfolio-highlight">Connect</span>
          </h1>
          <p className="portfolio-contact-subtitle">
            Ready to bring your ideas to life? Let's start a conversation.
          </p>
        </div>

        {/* Content Grid */}
        <div className="portfolio-contact-grid">
          {/* Contact Information Side */}
          <div className="portfolio-contact-info">
            <div className="portfolio-contact-card">
              <h2 className="portfolio-info-title">Get In Touch</h2>
              <p className="portfolio-info-description">
                I'm always excited to work on new projects and collaborate with amazing people.
              </p>

              {/* Contact Details */}
              <div className="portfolio-contact-details">
                {contactInfo.map((item, index) => (
                  <div key={index} className="portfolio-contact-item">
                    {item.icon}
                    <div className="portfolio-contact-text">
                      <span className="portfolio-contact-label">{item.label}</span>
                      {item.link ? (
                        <a href={item.link} className="portfolio-contact-value">
                          {item.value}
                        </a>
                      ) : (
                        <span className="portfolio-contact-value">{item.value}</span>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* Social Links */}
              <div className="portfolio-social-section">
                <h3 className="portfolio-social-title">Follow Me</h3>
                <div className="portfolio-social-links">
                  {socialLinks.map((social, index) => (
                    <a
                      key={index}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="portfolio-social-link"
                      style={{ '--social-color': social.color }}
                    >
                      {social.icon}
                      <span className="portfolio-social-tooltip">{social.name}</span>
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form Side */}
          <div className="portfolio-form-section">
            <div className="portfolio-form-card">
              <h2 className="portfolio-form-title">Send a Message</h2>
              <form onSubmit={handleSubmit} className="portfolio-contact-form">
                <div className="portfolio-form-row">
                  <div className="portfolio-form-group">
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="portfolio-form-input"
                      placeholder=" "
                      disabled={isSubmitting}
                    />
                    <label className="portfolio-form-label">Full Name</label>
                  </div>
                </div>

                <div className="portfolio-form-row">
                  <div className="portfolio-form-group">
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="portfolio-form-input"
                      placeholder=" "
                      disabled={isSubmitting}
                    />
                    <label className="portfolio-form-label">Email Address</label>
                  </div>
                </div>

                <div className="portfolio-form-row">
                  <div className="portfolio-form-group">
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="portfolio-form-input"
                      placeholder=" "
                      disabled={isSubmitting}
                    />
                    <label className="portfolio-form-label">Phone Number</label>
                  </div>
                </div>

                <div className="portfolio-form-row">
                  <div className="portfolio-form-group">
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      required
                      rows="5"
                      className="portfolio-form-textarea"
                      placeholder=" "
                      disabled={isSubmitting}
                    ></textarea>
                    <label className="portfolio-form-label">Your Message</label>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`portfolio-submit-btn ${isSubmitting ? 'portfolio-submitting' : ''}`}
                >
                  <span className="portfolio-btn-text">
                    {isSubmitting ? 'Sending...' : 'Send Message'}
                  </span>
                  <Send className="portfolio-btn-icon" />
                  <div className="portfolio-btn-wave"></div>
                </button>

                {submitStatus.message && (
                  <p
                    className={`portfolio-form-status ${
                      submitStatus.type === 'success'
                        ? 'portfolio-form-success'
                        : 'portfolio-form-error'
                    }`}
                  >
                    {submitStatus.message}
                  </p>
                )}
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactForm;