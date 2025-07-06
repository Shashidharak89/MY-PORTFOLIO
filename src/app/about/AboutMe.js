/* eslint-disable react/no-unescaped-entities */
'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link'; // Added import for Link
import profile from './images/profile.jpg';
import './styles/AboutMe.css';

const AboutMe = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [activeSkill, setActiveSkill] = useState(null);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const skills = [
    { name: 'Frontend Development', level: 85, color: '#2563eb' },
    { name: 'Backend Development', level: 80, color: '#dc2626' },
    { name: 'Mobile App Development', level: 75, color: '#1f2937' },
    { name: 'UI/UX Design', level: 70, color: '#2563eb' }
  ];

  const interests = [
    'Web Development',
    'Mobile Applications',
    'Open Source',
    'Tech Innovation',
    'Problem Solving',
    'Continuous Learning'
  ];

  return (
    <div className="about-container">
      <div className="about-wrapper">
        {/* Header Section */}
        <div className={`about-header ${isVisible ? 'fade-in' : ''}`}>
          <div className="profile-image-container">
            <Image
              src={profile}
              alt="Profile Picture"
              className="profile-image"
              width={150}
              height={150}
              priority
            />
          </div>
          <h1 className="about-title">About Me</h1>
          <p className="about-subtitle">Full-Stack Developer & Tech Enthusiast</p>
        </div>

        {/* Personal Information */}
        <div className={`info-section ${isVisible ? 'slide-up' : ''}`}>
          <h2 className="section-title">Personal Information</h2>
          <div className="info-grid">
            <div className="info-card">
              <h3 className="info-label">Full Name</h3>
              <p className="info-value">SHASHIDHARA K</p>
            </div>
            <div className="info-card">
              <h3 className="info-label">Age</h3>
              <p className="info-value">21 Years</p>
            </div>
            <div className="info-card">
              <h3 className="info-label">Date of Birth</h3>
              <p className="info-value">October 20, 2003</p>
            </div>
            <div className="info-card">
              <h3 className="info-label">Location</h3>
              <p className="info-value">Belthangady 574214, Mangalore, Karnataka, India</p>
            </div>
          </div>
        </div>

        {/* Education Section */}
        <div className={`education-section ${isVisible ? 'slide-left' : ''}`}>
          <h2 className="section-title">Education</h2>
          <div className="education-timeline">
            <div className="timeline-item">
              <div className="timeline-marker"></div>
              <div className="timeline-content">
                <h3 className="education-degree">Bachelor of Computer Applications</h3>
                <p className="education-field">Sacred Heart College, Madanthyar</p>
                <p className="education-school">Mangalore University</p>
                <p className="education-year">2022 - 2025</p>
                <p className="education-gpa">CGPA: 8.52/10</p>
              </div>
            </div>
            <div className="timeline-item">
              <div className="timeline-marker"></div>
              <div className="timeline-content">
                <h3 className="education-degree">Currently Pursuing</h3>
                <p className="education-field">Advanced Web Development</p>
                <p className="education-school">Self-Learning & Online Courses</p>
                <p className="education-year">2025 - Present</p>
              </div>
            </div>
          </div>
        </div>

        {/* Skills Section */}
        <div className={`skills-section ${isVisible ? 'slide-right' : ''}`}>
          <h2 className="section-title">Technical Skills</h2>
          <div className="skills-grid">
            {skills.map((skill, index) => (
              <div 
                key={index} 
                className="skill-card"
                onMouseEnter={() => setActiveSkill(index)}
                onMouseLeave={() => setActiveSkill(null)}
              >
                <h3 className="skill-name">{skill.name}</h3>
                <div className="skill-bar">
                  <div 
                    className="skill-progress"
                    style={{ 
                      width: activeSkill === index ? `${skill.level}%` : '0%',
                      backgroundColor: skill.color,
                      transition: 'width 1s ease-in-out'
                    }}
                  ></div>
                </div>
                <span className="skill-percentage">{skill.level}%</span>
              </div>
            ))}
          </div>
        </div>

        {/* Interests Section */}
        <div className={`interests-section ${isVisible ? 'fade-in-up' : ''}`}>
          <h2 className="section-title">Interests & Passions</h2>
          <div className="interests-grid">
            {interests.map((interest, index) => (
              <div key={index} className="interest-tag">
                {interest}
              </div>
            ))}
          </div>
        </div>

        {/* Internship Section */}
        <div className={`internship-section ${isVisible ? 'zoom-in' : ''}`}>
          <h2 className="section-title">Open for Opportunities</h2>
          <div className="opportunity-cards">
            <div className="opportunity-card frontend-card">
              <h3 className="opportunity-title">Frontend Development</h3>
              <p className="opportunity-description">
                Seeking internship opportunities in React, Next.js, and modern frontend technologies
              </p>
              <div className="opportunity-tech">
                <span className="tech-tag">React</span>
                <span className="tech-tag">Next.js</span>
                <span className="tech-tag">JavaScript</span>
              </div>
            </div>
            <div className="opportunity-card backend-card">
              <h3 className="opportunity-title">Backend Development</h3>
              <p className="opportunity-description">
                Looking for internship roles in Node.js, databases, and server-side development
              </p>
              <div className="opportunity-tech">
                <span className="tech-tag">Node.js</span>
                <span className="tech-tag">MongoDB</span>
                <span className="tech-tag">Express</span>
              </div>
            </div>
            <div className="opportunity-card mobile-card">
              <h3 className="opportunity-title">Mobile App Development</h3>
              <p className="opportunity-description">
                Interested in React Native and cross-platform mobile development internships
              </p>
              <div className="opportunity-tech">
                <span className="tech-tag">React Native</span>
                <span className="tech-tag">Flutter</span>
                <span className="tech-tag">Mobile UI</span>
              </div>
            </div>
          </div>
        </div>

        {/* Contact CTA */}
        <div className={`contact-cta ${isVisible ? 'bounce-in' : ''}`}>
          <h2 className="cta-title">Let's Connect!</h2>
          <p className="cta-description">
            I'm always excited to discuss new opportunities and collaborate on interesting projects.
          </p>
          <Link href="/contact">
            <button className="cta-button">
              Get In Touch
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AboutMe;