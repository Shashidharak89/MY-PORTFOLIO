'use client';

import React, { useState, useEffect } from 'react';
import validator from 'validator';
import { Github, Linkedin, Mail, Phone, MapPin, Heart, ArrowUp } from 'lucide-react';
import Link from 'next/link';
import './styles/FooterC.css';

const FooterC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [email, setEmail] = useState('');
  const [subscribeStatus, setSubscribeStatus] = useState({ message: '', type: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );

    const footerElement = document.querySelector('.portfolio-footer-wrapper');
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
    if (!email.trim()) {
      setSubscribeStatus({ message: 'Please enter an email address', type: 'error' });
      return;
    }

    if (!validator.isEmail(email.trim())) {
      setSubscribeStatus({ message: 'Invalid email address', type: 'error' });
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
        body: JSON.stringify({ email: email.trim() }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to subscribe');
      }

      setSubscribeStatus({ message: 'Subscribed successfully!', type: 'success' });
      setEmail('');
    } catch (error) {
      setSubscribeStatus({ message: error.message || 'Something went wrong', type: 'error' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const socialLinks = [
    { icon: Github, label: 'GitHub', url: 'https://github.com/Shashidharak89' },
    { icon: Linkedin, label: 'LinkedIn', url: 'https://www.linkedin.com/in/shashidhara-k-a2374b31b' },
    { icon: Mail, label: 'Email', url: 'mailto:shashidharak334@gmail.com' },
    { icon: Phone, label: 'Phone', url: '/contact' },
  ];

  return (
    <section
      className={`portfolio-footer-wrapper ${isVisible ? 'portfolio-footer-animate-in' : ''}`}
      onMouseMove={handleMouseMove}
    >
      <div className="portfolio-background-pattern">
        <div className="portfolio-pattern-dot"></div>
        <div className="portfolio-pattern-dot"></div>
        <div className="portfolio-pattern-dot"></div>
        <div className="portfolio-pattern-dot"></div>
      </div>

      <div className="portfolio-floating-elements">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="portfolio-floating-element"
            style={{
              '--delay': `${i * 0.5}s`,
              '--duration': `${3 + (i % 3)}s`,
              '--size': `${4 + (i % 2) * 2}px`,
            }}
          ></div>
        ))}
      </div>

      <div
        className="portfolio-cursor-effect"
        style={{
          left: mousePos.x,
          top: mousePos.y,
        }}
      ></div>

      <div className="portfolio-content-container">
        <div className="portfolio-main-grid">
          <div className="portfolio-brand-area">
            <div className="portfolio-logo-section">
              <div className="portfolio-logo-text">Portfolio</div>
              <div className="portfolio-logo-accent"></div>
            </div>
            <p className="portfolio-brand-description">
              Crafting digital experiences with passion and precision
            </p>
            <div className="portfolio-social-grid">
              {socialLinks.map((social, index) => (
                <Link
                  key={index}
                  href={social.url}
                  className="portfolio-social-item"
                  aria-label={social.label}
                >
                  <social.icon size={20} />
                  <div className="portfolio-social-effect"></div>
                  <span className="portfolio-social-label">{social.label}</span>
                </Link>
              ))}
            </div>
          </div>

          <div className="portfolio-contact-area">
            <h3 className="portfolio-area-title">Get In Touch</h3>
            <div className="portfolio-contact-list">
              <div className="portfolio-contact-detail">
                <div className="portfolio-contact-icon-wrapper">
                  <Mail size={16} />
                </div>
                <span>shashidharak334@gmail.com</span>
              </div>
              <div className="portfolio-contact-detail">
                <div className="portfolio-contact-icon-wrapper">
                  <Phone size={16} />
                </div>
                <span>+91 7760770725</span>
              </div>
              <div className="portfolio-contact-detail">
                <div className="portfolio-contact-icon-wrapper">
                  <MapPin size={16} />
                </div>
                <span>Mangalore, Karnataka, India</span>
              </div>
            </div>
          </div>

          <div className="portfolio-newsletter-area">
            <h3 className="portfolio-area-title">Stay Updated</h3>
            <p className="portfolio-newsletter-description">
              Subscribe to get notified about new projects and updates
            </p>
            <div className="portfolio-newsletter-form">
              <div className="portfolio-input-container">
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="portfolio-newsletter-input"
                  disabled={isSubmitting}
                />
                <div className="portfolio-input-border"></div>
              </div>
              <button
                onClick={handleSubscribe}
                className="portfolio-newsletter-button"
                disabled={isSubmitting}
              >
                <span>{isSubmitting ? 'Subscribing...' : 'Subscribe'}</span>
                <div className="portfolio-button-effect"></div>
              </button>
            </div>
            {subscribeStatus.message && (
              <p
                className={`portfolio-newsletter-message ${
                  subscribeStatus.type === 'success'
                    ? 'portfolio-newsletter-success'
                    : 'portfolio-newsletter-error'
                }`}
              >
                {subscribeStatus.message}
              </p>
            )}
          </div>
        </div>

        <div className="portfolio-bottom-section">
          <div className="portfolio-bottom-content">
            <p className="portfolio-copyright">
              © 2025 Portfolio. Made with{' '}
              <Heart size={14} className="portfolio-heart" /> by SHASHIDHARA.K
            </p>
            <div className="portfolio-bottom-links">
              <Link href="/privacy" className="portfolio-bottom-link">
                Privacy Policy
              </Link>
              <Link href="/terms" className="portfolio-bottom-link">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>

        <button
          onClick={scrollToTop}
          className="portfolio-scroll-top-button"
          aria-label="Scroll to top"
        >
          <ArrowUp size={18} />
          <div className="portfolio-scroll-effect"></div>
        </button>
      </div>
    </section>
  );
};

export default FooterC;