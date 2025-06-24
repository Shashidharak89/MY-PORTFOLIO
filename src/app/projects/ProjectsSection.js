'use client';

import { useState, useEffect } from 'react';
import ImageSlider from './ImageSlider'; // Adjust path as needed
import './styles/ProjectsSection.css';


const ProjectsSection = () => {
  const [isVisible, setIsVisible] = useState(false);

  // Default projects data with provided image and video
  const defaultImageSrc = "https://th.bing.com/th/id/OIP.26T9Qi27BkdU6aOWRXDZ-gHaHa?rs=1&pid=ImgDetMain&cb=idpwebp2&o=7&rm=3";
  const defaultVideoSrc = "https://www.youtube.com/embed/F8QMo4SDqK4?si=48rYpmi8grOtwjiC";
  const defaultVideoThumbnail = "https://img.youtube.com/vi/F8QMo4SDqK4/maxresdefault.jpg";

  const projects = [
    {
      id: 1,
      title: "AI-Powered Web Application",
      description: "A sophisticated web application leveraging artificial intelligence to provide intelligent recommendations and automated decision-making capabilities. Built with modern frameworks and deployed on cloud infrastructure for scalability.",
      technologies: ["React", "Node.js", "TensorFlow", "AWS"],
      projectLink: "https://gamenexplay.live",
      sourceCode: "https://github.com",
      slides: [
        { type: 'image', src: 'https://res.cloudinary.com/dsojdpkgh/image/upload/v1750774357/Screenshot_26_eqtroy.png', title: 'Dashboard View' },
        { type: 'image', src: 'https://res.cloudinary.com/dsojdpkgh/image/upload/v1750774359/Screenshot_29_j01rmq.png', title: 'Analytics Panel' },
        { type: 'image', src: 'https://res.cloudinary.com/dsojdpkgh/image/upload/v1750774366/Screenshot_28_rozreh.png', title: 'Analytics Panel' },
        { type: 'image', src: 'https://res.cloudinary.com/dsojdpkgh/image/upload/v1750774368/Screenshot_30_tp10bu.png', title: 'Analytics Panel' },
        { type: 'image', src: 'https://res.cloudinary.com/dsojdpkgh/image/upload/v1750774372/Screenshot_27_mqrpxq.png', title: 'Analytics Panel' },
        { type: 'image', src: 'https://res.cloudinary.com/dsojdpkgh/image/upload/v1750774378/Screenshot_32_dk20yq.png', title: 'Analytics Panel' },
        { type: 'image', src: 'https://res.cloudinary.com/dsojdpkgh/image/upload/v1750774382/Screenshot_31_dxp9xw.png', title: 'Analytics Panel' }
        
      ]
    },
    {
      id: 2,
      title: "E-Commerce Platform",
      description: "A comprehensive e-commerce solution featuring real-time inventory management, secure payment processing, and advanced analytics dashboard. Designed for scalability and optimal user experience across all devices.",
      technologies: ["Next.js", "Stripe", "MongoDB", "Redis"],
      projectLink: "https://gamenexplay.live",
      sourceCode: "https://github.com",
      slides: [
        { type: 'image', src: defaultImageSrc, title: 'Homepage' },
        { type: 'image', src: defaultImageSrc, title: 'Product Page' },
        { type: 'video', thumbnail: defaultVideoThumbnail, videoSrc: defaultVideoSrc, title: 'Platform Demo' }
      ]
    },
    {
      id: 3,
      title: "Mobile Fitness Tracker",
      description: "Cross-platform mobile application for fitness tracking with real-time workout monitoring, social features, and personalized coaching. Integrates with various wearable devices and health platforms.",
      technologies: ["React Native", "Firebase", "Python", "ML Kit"],
      projectLink: "https://gamenexplay.live",
      sourceCode: "https://github.com",
      slides: [
        { type: 'image', src: defaultImageSrc, title: 'Workout Screen' },
        { type: 'video', thumbnail: defaultVideoThumbnail, videoSrc: defaultVideoSrc, title: 'App Demo' },
        { type: 'image', src: defaultImageSrc, title: 'Statistics View' }
      ]
    }
  ];

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 200);
    return () => clearTimeout(timer);
  }, []);

  const handleProjectLinkClick = (link) => {
    window.open(link, '_blank', 'noopener,noreferrer');
  };

  const handleSourceCodeClick = (link) => {
    window.open(link, '_blank', 'noopener,noreferrer');
  };

  return (
    <section className="projects-section-unique" id="projects">
      <div className="projects-container-unique">
        <div className={`projects-header-unique ${isVisible ? 'projects-header-visible-unique' : ''}`}>
          <h2 className="projects-title-unique">My Projects</h2>
          <div className="projects-title-underline-unique"></div>
        </div>

        <div className="projects-list-unique">
          {projects.map((project, index) => (
            <div
              key={project.id}
              className={`project-item-unique ${isVisible ? 'project-item-visible-unique' : ''}`}
              style={{ animationDelay: `${0.3 + index * 0.2}s` }}
            >
              {/* Project Header */}
              <div className="project-header-unique">
                <div className="project-number-badge-unique">
                  {String(index + 1).padStart(2, '0')}
                </div>
                <h3 className="project-title-unique">{project.title}</h3>
              </div>

              {/* Image Slider with 16:9 ratio */}
              <div className="project-slider-container-unique">
                <ImageSlider
                  slides={project.slides}
                  title={project.title}
                  isActive={true}
                  projectLink={project.projectLink}
                  sourceCode={project.sourceCode}
                />
              </div>

              {/* Project Details */}
              <div className="project-details-unique">
                <p className="project-description-unique">
                  {project.description}
                </p>

                <div className="project-technologies-unique">
                  <h4 className="tech-title-unique">Technologies Used:</h4>
                  <div className="tech-list-unique">
                    {project.technologies.map((tech, idx) => (
                      <span key={idx} className="tech-tag-unique">{tech}</span>
                    ))}
                  </div>
                </div>

                <div className="project-actions-unique">
                  <button 
                    className="project-btn-primary-unique"
                    onClick={() => handleProjectLinkClick(project.projectLink)}
                  >
                    View Project
                  </button>
                  <button 
                    className="project-btn-secondary-unique"
                    onClick={() => handleSourceCodeClick(project.sourceCode)}
                  >
                    Source Code
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;