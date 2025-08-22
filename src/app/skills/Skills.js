'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { 
  FaPython, FaJava, FaPhp, FaJs, FaHtml5, FaCss3Alt, FaReact, 
  FaGitAlt, FaFigma, FaDatabase, FaBolt, FaCode
} from 'react-icons/fa';
import { SiNextdotjs, SiExpress, SiSpringboot, SiVisualstudiocode, 
  SiCloudinary, SiR } from 'react-icons/si';
  import './styles/Skills.css';

const Skills = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [activeCategory, setActiveCategory] = useState('Languages');
  const skillsRef = useRef(null);
  const countAnimationRef = useRef(new Map());

  // Skills data
  const skillsData = {
    Languages: [  
      { name: 'Python', level: 90, icon: FaPython },
      { name: 'Java', level: 88, icon: FaJava },
      { name: 'PHP', level: 88, icon: FaPhp },
      { name: 'JavaScript', level: 85, icon: FaJs },
      { name: 'C', level: 80, icon: FaCode },
      { name: 'SQL', level: 90, icon: FaDatabase },
      { name: 'R', level: 75, icon: SiR },
      { name: 'HTML5', level: 95, icon: FaHtml5 },
      { name: 'CSS', level: 80, icon: FaCss3Alt }
    ],
    Frameworks: [
      { name: 'React.js', level: 90, icon: FaReact },
      { name: 'Next.js', level: 80, icon: SiNextdotjs },
      { name: 'Express.js', level: 85, icon: SiExpress },
      { name: 'Springboot', level: 70, icon: SiSpringboot },
    ],
    Tools: [
      { name: 'Git & GitHub', level: 90, icon: FaGitAlt },
      { name: 'VS Code', level: 95, icon: SiVisualstudiocode },
      { name: 'Cloudinary', level: 80, icon: SiCloudinary },
      { name: 'Figma', level: 80, icon: FaFigma },
      { name: 'Thunder Client', level: 85, icon: FaBolt }
    ]
  };

  // Intersection observer for animations
  const handleIntersection = useCallback((entries) => {
    const [entry] = entries;
    if (entry.isIntersecting && !isVisible) {
      setIsVisible(true);
    }
  }, [isVisible]);

  useEffect(() => {
    const currentRef = skillsRef.current;

    let observer;
    if (currentRef && 'IntersectionObserver' in window) {
      observer = new IntersectionObserver(handleIntersection, { 
        threshold: 0.1,
        rootMargin: '50px'
      });
      observer.observe(currentRef);
    } else {
      setIsVisible(true);
    }

    return () => {
      if (observer && currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [handleIntersection]);

  // Animate counter numbers
  useEffect(() => {
    if (!isVisible) return;

    skillsData[activeCategory].forEach((skill, index) => {
      const key = `${activeCategory}-${skill.name}`;
      if (countAnimationRef.current.has(key)) return;

      const startTime = Date.now();
      const duration = 1500;
      const startDelay = index * 100 + 400;

      setTimeout(() => {
        const animateCount = () => {
          const elapsed = Date.now() - startTime - startDelay;
          const progress = Math.min(elapsed / duration, 1);
          const currentValue = Math.floor(progress * skill.level);

          const element = document.querySelector(`[data-skill="${key}"] .classic-percentage-number`);
          if (element) {
            element.textContent = `${currentValue}%`;
          }

          if (progress < 1) {
            requestAnimationFrame(animateCount);
          } else {
            countAnimationRef.current.set(key, true);
          }
        };
        animateCount();
      }, startDelay);
    });
  }, [isVisible, activeCategory, skillsData]);

  const handleCategoryChange = (category) => {
    if (category !== activeCategory) {
      setActiveCategory(category);
      countAnimationRef.current.clear();
    }
  };

  return (
    <section className="classic-skills-section" ref={skillsRef}>
      <div className="classic-skills-container">
        <div className="classic-skills-header">
          <h2 className="classic-skills-title">My Skills</h2>
          <p className="classic-skills-subtitle">
            Professional expertise in modern technologies
          </p>
        </div>

        <div className="classic-category-tabs">
          {Object.keys(skillsData).map((category) => (
            <button
              key={category}
              className={`classic-tab-button ${activeCategory === category ? 'classic-tab-active' : ''}`}
              onClick={() => handleCategoryChange(category)}
              aria-label={`View ${category} skills`}
            >
              {category}
            </button>
          ))}
        </div>

        <div className="classic-skills-grid">
          {skillsData[activeCategory].map((skill, index) => {
            const IconComponent = skill.icon;
            return (
              <div
                key={`${activeCategory}-${skill.name}`}
                className={`classic-skill-card ${isVisible ? 'classic-card-visible' : ''}`}
                style={{ '--animation-delay': `${index * 100}ms` }}
                data-skill={`${activeCategory}-${skill.name}`}
              >
                <div className="classic-skill-icon">
                  {IconComponent ? (
                    <IconComponent className="classic-icon" />
                  ) : (
                    <span className="classic-fallback-icon">{skill.name[0]}</span>
                  )}
                </div>
                
                <div className="classic-skill-content">
                  <h3 className="classic-skill-name">{skill.name}</h3>
                  
                  <div className="classic-progress-container">
                    <div className="classic-progress-bar">
                      <div 
                        className="classic-progress-fill"
                        style={{ '--skill-level': `${skill.level}%` }}
                      ></div>
                    </div>
                    <span className="classic-skill-percentage">
                      <span className="classic-percentage-number">0%</span>
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Skills;