'use client';

import { useState, useEffect, useRef } from 'react';
import './styles/Skills.css';

const Skills = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [activeCategory, setActiveCategory] = useState('Languages');
  const skillsRef = useRef(null);

  const skillsData = {
    Languages: [  
      { name: 'Python', level: 90, icon: '🐍' },
      { name: 'Java', level: 88, icon: '🔷' },
      { name: 'PHP', level: 88, icon: '🔷' },
      { name: 'JavaScript', level: 85, icon: '🟨' },
      { name: 'C', level: 80, icon: '🔷' },
      { name: 'SQL', level: 90, icon: '🔷' },
      { name: 'R', level: 75, icon: '🔷' },
      { name: 'HTML5', level: 95, icon: '🌐' },
      { name: 'CSS', level: 80, icon: '🎨' }
    ],
    Frameworks: [
      { name: 'React.js', level: 90, icon: '⚛️' },
      { name: 'Next.js', level: 80, icon: '🚀' },
      { name: 'Express.js', level: 85, icon: '⚡' },
      { name: 'Springboot', level: 70, icon: '⚡' },
    ],
    tools: [
      { name: 'Git & GitHub', level: 90, icon: '🐙' },
      { name: 'VS Code', level: 95, icon: '💻' },
      { name: 'Cloudinary', level: 80, icon: '💻' },
      { name: 'Figma', level: 80, icon: '🎨' },
      { name: 'Thunderclient', level: 85, icon: '📮' }
    ]
  };

  useEffect(() => {
    const currentRef = skillsRef.current;

    // Fallback to set isVisible to true after a short delay if IntersectionObserver doesn't trigger
    const fallbackTimeout = setTimeout(() => {
      setIsVisible(true);
    }, 1000);

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          clearTimeout(fallbackTimeout); // Clear fallback if observer triggers
          if (currentRef) {
            observer.unobserve(currentRef); // Unobserve once visible to prevent re-triggering
          }
        }
      },
      { threshold: 0.1 }
    );

    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      clearTimeout(fallbackTimeout);
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, []);

  return (
    <section className="skills-section" ref={skillsRef}>
      <div className="skills-container">
        <div className="skills-header">
          <div className="header-decoration"></div>
          <h2 className="skills-title">My Skills</h2>
          <p className="skills-subtitle">
            Crafting digital experiences with modern technologies
          </p>
          <div className="header-decoration"></div>
        </div>

        <div className="category-tabs">
          {Object.keys(skillsData).map((category) => (
            <button
              key={category}
              className={`tab-button ${activeCategory === category ? 'active' : ''}`}
              onClick={() => setActiveCategory(category)}
            >
              <span className="tab-text">
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </span>
              <div className="tab-indicator"></div>
            </button>
          ))}
        </div>

        <div className="skills-grid">
          {skillsData[activeCategory].map((skill, index) => (
            <div
              key={skill.name}
              className={`skill-card ${isVisible ? 'animate' : ''}`}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="skill-icon">
                <span>{skill.icon}</span>
                <div className="icon-glow"></div>
              </div>
              
              <div className="skill-content">
                <h3 className="skill-name">{skill.name}</h3>
                
                <div className="skill-progress">
                  <div className="progress-track">
                    <div 
                      className="progress-fill"
                      style={{ 
                        width: isVisible ? `${skill.level}%` : '0%',
                        transition: isVisible ? 'width 1.5s cubic-bezier(0.4, 0, 0.2, 1)' : 'none'
                      }}
                    ></div>
                  </div>
                  
                  <div className="skill-percentage">
                    <span className={isVisible ? 'count-up' : ''}>
                      {isVisible ? skill.level : 0}%
                    </span>
                  </div>
                </div>
              </div>

              <div className="skill-hover-effect"></div>
            </div>
          ))}
        </div>

        <div className="floating-elements">
          <div className="floating-circle circle-1"></div>
          <div className="floating-circle circle-2"></div>
          <div className="floating-circle circle-3"></div>
          <div className="floating-triangle triangle-1"></div>
          <div className="floating-triangle triangle-2"></div>
        </div>
      </div>
    </section>
  );
};

export default Skills;