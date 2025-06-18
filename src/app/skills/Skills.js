'use client';

import { useState, useEffect, useRef } from 'react';
import './styles/Skills.css';

const Skills = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [activeCategory, setActiveCategory] = useState('frontend');
  const skillsRef = useRef(null);

  const skillsData = {
    frontend: [
      { name: 'React.js', level: 90, icon: '⚛️' },
      { name: 'Next.js', level: 85, icon: '🚀' },
      { name: 'JavaScript', level: 88, icon: '🟨' },
      { name: 'TypeScript', level: 82, icon: '🔷' },
      { name: 'HTML5', level: 95, icon: '🌐' },
      { name: 'CSS3', level: 90, icon: '🎨' },
      { name: 'Tailwind CSS', level: 87, icon: '💨' },
      { name: 'SASS/SCSS', level: 83, icon: '💎' }
    ],
    backend: [
      { name: 'Node.js', level: 85, icon: '🚀' },
      { name: 'Express.js', level: 80, icon: '⚡' },
      { name: 'Python', level: 78, icon: '🐍' },
      { name: 'MongoDB', level: 75, icon: '🍃' },
      { name: 'PostgreSQL', level: 72, icon: '🐘' },
      { name: 'GraphQL', level: 70, icon: '📊' },
      { name: 'REST APIs', level: 88, icon: '🔗' },
      { name: 'Firebase', level: 76, icon: '🔥' }
    ],
    tools: [
      { name: 'Git & GitHub', level: 90, icon: '🐙' },
      { name: 'VS Code', level: 95, icon: '💻' },
      { name: 'Docker', level: 68, icon: '🐳' },
      { name: 'AWS', level: 65, icon: '☁️' },
      { name: 'Figma', level: 80, icon: '🎨' },
      { name: 'Webpack', level: 72, icon: '📦' },
      { name: 'Jest', level: 75, icon: '🧪' },
      { name: 'Postman', level: 85, icon: '📮' }
    ]
  };

  useEffect(() => {
    const currentRef = skillsRef.current;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
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
                        animationDelay: `${index * 0.1 + 0.5}s`
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