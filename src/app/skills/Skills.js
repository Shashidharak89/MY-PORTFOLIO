'use client';

import { useState, useEffect, useRef } from 'react';
import { 
  FaPython, FaJava, FaPhp, FaJs, FaHtml5, FaCss3Alt, FaReact, 
  FaGitAlt, FaFigma, FaDatabase, FaBolt, FaCode // Added FaCode
} from 'react-icons/fa';
import { SiNextdotjs, SiExpress, SiSpringboot, SiVisualstudiocode, 
  SiCloudinary, SiR } from 'react-icons/si';
import './styles/Skills.css';

const Skills = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [activeCategory, setActiveCategory] = useState('Languages');
  const skillsRef = useRef(null);

  // Skills data
  const skillsData = {
    Languages: [  
      { name: 'Python', level: 90, icon: FaPython },
      { name: 'Java', level: 88, icon: FaJava },
      { name: 'PHP', level: 88, icon: FaPhp },
      { name: 'JavaScript', level: 85, icon: FaJs },
      { name: 'C', level: 80, icon: FaCode }, // FaCode is now properly imported
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

  useEffect(() => {
    const currentRef = skillsRef.current;

    const handleIntersection = (entries) => {
      const [entry] = entries;
      if (entry.isIntersecting) {
        setIsVisible(true);
      }
    };

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
  }, []);

  const handleCategoryChange = (category) => setActiveCategory(category);

  return (
    <section className="standard-skills-section" ref={skillsRef}>
      <div className="standard-skills-container">
        <header className="standard-skills-header">
          <h2 className="standard-skills-title">My Skills</h2>
          <p className="standard-skills-subtitle">
            Professional expertise in modern technologies
          </p>
        </header>

        <nav className="standard-category-tabs">
          {Object.keys(skillsData).map((category) => (
            <button
              key={category}
              className={`standard-tab-button ${activeCategory === category ? 'active' : ''}`}
              onClick={() => handleCategoryChange(category)}
              aria-label={`View ${category} skills`}
            >
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </button>
          ))}
        </nav>

        <div className="standard-skills-grid">
          {skillsData[activeCategory].map((skill, index) => {
            const IconComponent = skill.icon;
            return (
              <div
                key={skill.name}
                className={`standard-skill-card ${isVisible ? 'animate' : ''}`}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="standard-skill-icon">
                  {IconComponent ? (
                    <IconComponent />
                  ) : (
                    <span className="fallback-icon">{skill.name[0]}</span>
                  )}
                </div>
                
                <div className="standard-skill-content">
                  <h3 className="standard-skill-name">{skill.name}</h3>
                  
                  <div className="standard-skill-progress">
                    <div className="standard-progress-track">
                      <div 
                        className="standard-progress-fill"
                        style={{ 
                          width: isVisible ? `${skill.level}%` : '0%',
                          transitionDelay: `${index * 100}ms`
                        }}
                      ></div>
                    </div>
                    
                    <div className="standard-skill-percentage">
                      <span className={isVisible ? 'count-up' : ''}>
                        {isVisible ? skill.level : 0}%
                      </span>
                    </div>
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