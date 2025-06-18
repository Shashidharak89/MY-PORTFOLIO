'use client';

import React, { useState, useEffect } from 'react';
import { Github, Linkedin, Mail, Phone, MapPin, Heart, ArrowUp } from 'lucide-react';
import styles from './styles/Footer.module.css';

const Footer = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [email, setEmail] = useState('');
  const [subscribeStatus, setSubscribeStatus] = useState({ message: '', type: '' }); // For success/error feedback
  const [isSubmitting, setIsSubmitting] = useState(false); // For loading state

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );

    const footerElement = document.querySelector(`.${styles['portfolio-footer-container']}`);
    if (footerElement) {
      observer.observe(footerElement);
    }

    return () => observer.disconnect();
  }, []);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSubscribe = async () => {
    if (!email) {
      setSubscribeStatus({ message: 'Please enter an email address', type: 'error' });
      return;
    }

    setIsSubmitting(true);
    setSubscribeStatus({ message: '', type: '' });

    try {
      const response = await fetch('/api/subscribers', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to subscribe');
      }

      setSubscribeStatus({ message: 'Subscribed successfully!', type: 'success' });
      setEmail(''); // Clear input on success
    } catch (error) {
      setSubscribeStatus({ message: error.message || 'Something went wrong', type: 'error' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const socialLinks = [
    { icon: Github, label: 'GitHub', url: '#', color: '#ff4757' },
    { icon: Linkedin, label: 'LinkedIn', url: '#', color: '#3742fa' },
    { icon: Mail, label: 'Email', url: '#', color: '#ff6b7a' },
    { icon: Phone, label: 'Phone', url: '#', color: '#4834d4' },
  ];

  const quickLinks = ['About', 'Projects', 'Skills', 'Experience', 'Contact'];

  return (
    <footer
      className={`${styles['portfolio-footer-container']} ${isVisible ? styles['footer-animate-in'] : ''}`}
      onMouseMove={handleMouseMove}
    >
      {/* Animated Background */}
      <div className={styles['footer-bg-animation']}>
        <div className={`${styles['footer-wave']} ${styles['footer-wave-1']}`}></div>
        <div className={`${styles['footer-wave']} ${styles['footer-wave-2']}`}></div>
        <div className={`${styles['footer-wave']} ${styles['footer-wave-3']}`}></div>
      </div>

      {/* Floating Particles */}
      <div className={styles['footer-particles']}>
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className={styles['footer-particle']}
            style={{
              '--delay': `${i * 0.5}s`,
              '--duration': `${3 + (i % 3)}s`,
            }}
          ></div>
        ))}
      </div>

      {/* Mouse Follower Effect */}
      <div
        className={styles['footer-mouse-glow']}
        style={{
          left: mousePos.x,
          top: mousePos.y,
        }}
      ></div>

      <div className={styles['footer-content-wrapper']}>
        <div className={styles['footer-main-content']}>
          {/* Brand Section */}
          <div className={styles['footer-brand-section']}>
            <div className={styles['footer-logo-container']}>
              <div className={styles['footer-logo-text']}>Portfolio</div>
              <div className={styles['footer-logo-pulse']}></div>
            </div>
            <p className={styles['footer-brand-tagline']}>
              Crafting digital experiences with passion and precision
            </p>
            <div className={styles['footer-social-links']}>
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.url}
                  className={styles['footer-social-link']}
                  style={{ '--hover-color': social.color }}
                  aria-label={social.label}
                >
                  <social.icon size={20} />
                  <span className={styles['footer-social-tooltip']}>{social.label}</span>
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className={styles['footer-links-section']}>
            <h3 className={styles['footer-section-title']}>Quick Links</h3>
            <ul className={styles['footer-links-list']}>
              {quickLinks.map((link, index) => (
                <li key={index} className={styles['footer-link-item']}>
                  <a href={`#${link.toLowerCase()}`} className={styles['footer-link']}>
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div className={styles['footer-contact-section']}>
            <h3 className={styles['footer-section-title']}>Get In Touch</h3>
            <div className={styles['footer-contact-info']}>
              <div className={styles['footer-contact-item']}>
                <Mail size={16} />
                <span>hello@portfolio.com</span>
              </div>
              <div className={styles['footer-contact-item']}>
                <Phone size={16} />
                <span>+1 (555) 123-4567</span>
              </div>
              <div className={styles['footer-contact-item']}>
                <MapPin size={16} />
                <span>New York, NY</span>
              </div>
            </div>
          </div>

          {/* Newsletter */}
          <div className={styles['footer-newsletter-section']}>
            <h3 className={styles['footer-section-title']}>Stay Updated</h3>
            <p className={styles['footer-newsletter-text']}>
              Subscribe to get notified about new projects and updates
            </p>
            <div className={styles['footer-newsletter-form']}>
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={styles['footer-newsletter-input']}
                disabled={isSubmitting}
              />
              <button
                onClick={handleSubscribe}
                className={styles['footer-newsletter-btn']}
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Subscribing...' : 'Subscribe'}
                <div className={styles['footer-btn-glow']}></div>
              </button>
            </div>
            {subscribeStatus.message && (
              <p
                className={`${styles['footer-newsletter-status']} ${
                  subscribeStatus.type === 'success'
                    ? styles['footer-newsletter-success']
                    : styles['footer-newsletter-error']
                }`}
              >
                {subscribeStatus.message}
              </p>
            )}
          </div>
        </div>

        {/* Bottom Bar */}
        <div className={styles['footer-bottom-bar']}>
          <div className={styles['footer-bottom-content']}>
            <p className={styles['footer-copyright']}>
              © 2025 Portfolio. Made with{' '}
              <Heart size={14} className={styles['footer-heart']} /> by Developer
            </p>
            <div className={styles['footer-bottom-links']}>
              <a href="#" className={styles['footer-bottom-link']}>
                Privacy Policy
              </a>
              <a href="#" className={styles['footer-bottom-link']}>
                Terms of Service
              </a>
            </div>
          </div>
        </div>

        {/* Scroll to Top Button */}
        <button
          onClick={scrollToTop}
          className={styles['footer-scroll-top']}
          aria-label="Scroll to top"
        >
          <ArrowUp size={20} />
          <div className={styles['footer-scroll-top-glow']}></div>
        </button>
      </div>
    </footer>
  );
};

export default Footer;