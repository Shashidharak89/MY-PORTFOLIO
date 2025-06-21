'use client';

import React, { useState, useEffect, useRef } from 'react';
import './styles/AboutComponent.css';

const AboutComponent = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [activeSkill, setActiveSkill] = useState(0);
  const aboutRef = useRef(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const skills = [
    { name: 'Frontend Development', level: 95, icon: '🎨' },
    { name: 'Backend Development', level: 90, icon: '⚙️' },
    { name: 'Database Management', level: 85, icon: '🗄️' },
    { name: 'Cloud Technologies', level: 80, icon: '☁️' },
    { name: 'Mobile Development', level: 75, icon: '📱' },
    { name: 'DevOps', level: 70, icon: '🚀' }
  ];

  const achievements = [
    { number: '20+', label: 'Projects Completed', icon: '💼' },
    { number: '2+', label: 'Years Experience', icon: '⏱️' },
    { number: '10+', label: 'Technologies', icon: '💻' },
    { number: '5+', label: 'Happy Clients', icon: '😊' }
  ];

  const technologies = [
    'React', 'Next.js', 'Node.js', 'TypeScript', 'Python', 
    'MongoDB', 'PostgreSQL', 'AWS', 'Docker', 'Kubernetes'
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (aboutRef.current) {
      observer.observe(aboutRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const skillInterval = setInterval(() => {
      setActiveSkill(prev => (prev + 1) % skills.length);
    }, 3000);

    return () => clearInterval(skillInterval);
  }, [skills.length]);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    });
  };

  return (
    <div className="shas-about-container" ref={aboutRef} onMouseMove={handleMouseMove}>
      {/* Animated Background */}
      <div className="shas-bg-animation">
        <div className="shas-floating-shapes">
          {[...Array(6)].map((_, i) => (
            <div key={i} className={`shas-shape shas-shape-${i + 1}`}></div>
          ))}
        </div>
      </div>

      {/* Mouse Follower */}
      <div 
        className="shas-mouse-follower"
        style={{
          left: mousePosition.x,
          top: mousePosition.y
        }}
      ></div>

      {/* Header Section */}
      <div className={`shas-about-header ${isVisible ? 'shas-animate-in' : ''}`}>
        <div className="shas-header-content">
          <h1 className="shas-main-title">
            <span className="shas-title-word">About</span>
            <span className="shas-title-word shas-title-highlight">Me</span>
          </h1>
          <div className="shas-title-underline"></div>
        </div>
      </div>

      {/* Main Content */}
      <div className="shas-content-wrapper">
        
        {/* Profile Section */}
        <div className={`shas-profile-section ${isVisible ? 'shas-slide-up' : ''}`}>
          <div className="shas-profile-card">
            <div className="shas-profile-image">
              <div className="shas-image-placeholder">
                <div className="shas-avatar-icon">👨‍💻</div>
              </div>
              <div className="shas-profile-ring"></div>
            </div>
            
            <div className="shas-profile-content">
              <h2 className="shas-profile-name">Shashidhara K</h2>
              <p className="shas-profile-title">Full Stack Developer</p>
              <div className="shas-profile-description">
                <p>
                  I'm a passionate Full Stack Developer with 2+ years of experience in creating 
                  exceptional digital experiences. I specialize in modern web technologies and 
                  focus on building scalable, user-centric applications that make a difference.
                </p>
                <p>
                  My journey in technology is driven by curiosity and the desire to solve 
                  complex problems through innovative solutions. I believe in writing clean, 
                  maintainable code and staying updated with the latest industry trends.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Skills Section */}
        <div className={`shas-skills-section ${isVisible ? 'shas-fade-in-delayed' : ''}`}>
          <h3 className="shas-section-title">Technical Expertise</h3>
          <div className="shas-skills-grid">
            {skills.map((skill, index) => (
              <div 
                key={index}
                className={`shas-skill-card ${activeSkill === index ? 'shas-skill-active' : ''}`}
              >
                <div className="shas-skill-icon">{skill.icon}</div>
                <h4 className="shas-skill-name">{skill.name}</h4>
                <div className="shas-skill-bar">
                  <div 
                    className="shas-skill-progress"
                    style={{ width: `${skill.level}%` }}
                  ></div>
                </div>
                <span className="shas-skill-percentage">{skill.level}%</span>
              </div>
            ))}
          </div>
        </div>

        {/* Technologies */}
        <div className={`shas-tech-section ${isVisible ? 'shas-slide-in-right' : ''}`}>
          <h3 className="shas-section-title">Technologies I Work With</h3>
          <div className="shas-tech-cloud">
            {technologies.map((tech, index) => (
              <span 
                key={index}
                className="shas-tech-tag"
                style={{ 
                  animationDelay: `${index * 0.1}s`,
                  fontSize: `${Math.random() * 0.5 + 1}rem`
                }}
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* Achievements */}
        <div className={`shas-achievements-section ${isVisible ? 'shas-scale-in' : ''}`}>
          <h3 className="shas-section-title">Achievements</h3>
          <div className="shas-achievements-grid">
            {achievements.map((achievement, index) => (
              <div 
                key={index}
                className="shas-achievement-card"
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <div className="shas-achievement-icon">{achievement.icon}</div>
                <div className="shas-achievement-number">{achievement.number}</div>
                <div className="shas-achievement-label">{achievement.label}</div>
                <div className="shas-achievement-glow"></div>
              </div>
            ))}
          </div>
        </div>

        {/* Personal Touch */}
        <div className={`shas-personal-section ${isVisible ? 'shas-bounce-in' : ''}`}>
          <div className="shas-personal-card">
            <h3 className="shas-section-title">Beyond Code</h3>
            <div className="shas-personal-content">
              <p>
                When I'm not coding, you'll find me exploring new technologies, contributing to 
                open-source projects, or sharing knowledge with the developer community. 
                I believe in continuous learning and enjoy tackling challenging problems 
                that push the boundaries of what's possible.
              </p>
              <div className="shas-interests">
                <span className="shas-interest">🎯 Problem Solving</span>
                <span className="shas-interest">🌱 Open Source</span>
                <span className="shas-interest">📚 Continuous Learning</span>
                <span className="shas-interest">🤝 Mentoring</span>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default AboutComponent;