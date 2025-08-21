'use client';

import { useState } from 'react';
import Image from 'next/image';
import ImageSlider from './ImageSlider';
import { projects } from './data';
import './styles/ProjectPage.css';

const ProjectsPage = () => {
  const [hoveredProject, setHoveredProject] = useState(null);

  return (
    <div className="prj-container">
      <div className="prj-header">
        <h1 className="prj-title">
          <span className="prj-title-accent">Featured</span> Projects
        </h1>
        <p className="prj-subtitle">
          Discover the innovative solutions I&apos;ve crafted with passion and precision
        </p>
      </div>

      <div className="prj-grid">
        {projects.map((project, index) => (
          <div
            key={project.id}
            className={`prj-card ${hoveredProject === project.id ? 'prj-card-expanded' : ''}`}
            onMouseEnter={() => setHoveredProject(project.id)}
            onMouseLeave={() => setHoveredProject(null)}
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <div className="prj-card-content">
              <div className="prj-card-main">
                <div className="prj-card-info">
                  <h3 className="prj-card-title">{project.title}</h3>
                  <div className="prj-tech-stack">
                    {project.technologies.map((tech, i) => (
                      <span key={i} className="prj-tech-tag">{tech}</span>
                    ))}
                  </div>
                </div>
                
                <div className="prj-preview-image">
                  <Image 
                    src={project.slides[0].src} 
                    alt={project.title}
                    className="prj-image"
                    width={200}
                    height={120}
                    style={{ objectFit: 'cover', aspectRatio: '16/9' }}
                  />
                  <div className="prj-image-overlay">
                    <span className="prj-play-icon">▶</span>
                  </div>
                </div>
              </div>

              <div className="prj-expanded-content">
                <ImageSlider slides={project.slides} title={project.title} isActive={hoveredProject === project.id} />
                <div className="prj-details">
                  <p className="prj-description">{project.description}</p>
                  <div className="prj-actions">
                    <a href={project.liveLink} className="prj-link prj-link-primary" target="_blank" rel="noopener noreferrer">
                      <span>🔗</span>
                      Live Demo
                      <span className="prj-arrow">→</span>
                    </a>
                    <a href={project.githubLink} className="prj-link prj-link-secondary" target="_blank" rel="noopener noreferrer">
                      <span>📂</span>
                      Source Code
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProjectsPage;
