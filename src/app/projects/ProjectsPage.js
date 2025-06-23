'use client';

import { useState, useMemo } from 'react';
import Image from 'next/image';
import ImageSlider from './ImageSlider';
import './styles/ProjectPage.css';

const ProjectsPage = () => {
  const [hoveredProject, setHoveredProject] = useState(null);

  const projects = useMemo(() => [
    {
      id: 1,
      title: "E-Commerce Platform",
      description: "A full-stack e-commerce solution built with modern technologies. Features include user authentication, payment integration, inventory management, and responsive design for optimal user experience across all devices.",
      technologies: ["React", "Node.js", "MongoDB", "Stripe"],
      liveLink: "https://example.com",
      githubLink: "https://github.com/example",
      images: [
        "https://pixlr.com/images/generator/simple-generator.webp",
        "https://pixlr.com/images/generator/simple-generator.webp",
        "https://pixlr.com/images/generator/simple-generator.webp",
        "https://pixlr.com/images/generator/simple-generator.webp"
      ]
    },
    {
      id: 2,
      title: "Task Management App",
      description: "An intuitive task management application with real-time collaboration features. Built with modern frameworks and includes drag-and-drop functionality, team collaboration tools, and advanced analytics dashboard.",
      technologies: ["Next.js", "TypeScript", "PostgreSQL", "Socket.io"],
      liveLink: "https://example.com",
      githubLink: "https://github.com/example",
      images: [
        "https://pixlr.com/images/generator/simple-generator.webp",
        "https://pixlr.com/images/generator/simple-generator.webp",
        "https://pixlr.com/images/generator/simple-generator.webp",
        "https://pixlr.com/images/generator/simple-generator.webp"
      ]
    },
    {
      id: 3,
      title: "AI Chat Assistant",
      description: "An intelligent chat assistant powered by advanced AI models. Features natural language processing, context awareness, and seamless integration with multiple platforms for enhanced user interaction.",
      technologies: ["Python", "FastAPI", "React", "OpenAI API"],
      liveLink: "https://example.com",
      githubLink: "https://github.com/example",
      images: [
        "https://pixlr.com/images/generator/simple-generator.webp",
        "https://pixlr.com/images/generator/simple-generator.webp",
        "https://pixlr.com/images/generator/simple-generator.webp",
        "https://pixlr.com/images/generator/simple-generator.webp"
      ]
    },
    {
      id: 4,
      title: "Portfolio Dashboard",
      description: "A comprehensive dashboard for managing and showcasing creative portfolios. Includes analytics, project management, client communication tools, and customizable themes for different industries.",
      technologies: ["Vue.js", "Express", "MySQL", "Chart.js"],
      liveLink: "https://example.com",
      githubLink: "https://github.com/example",
      images: [
        "https://pixlr.com/images/generator/simple-generator.webp",
        "https://pixlr.com/images/generator/simple-generator.webp",
        "https://pixlr.com/images/generator/simple-generator.webp",
        "https://pixlr.com/images/generator/simple-generator.webp"
      ]
    }
  ], []);

  return (
    <div className="prj-container">
      <div className="prj-header">
        <h1 className="prj-title">
          <span className="prj-title-accent">Featured</span> Projects
        </h1>
        <p className="prj-subtitle">
          Discover the innovative solutions I've crafted with passion and precision
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
                    src={project.images[0]} 
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
                <ImageSlider images={project.images} title={project.title} isActive={hoveredProject === project.id} />
                <div className="prj-details">
                  <p className="prj-description">{project.description}</p>
                  <div className="prj-actions">
                    <a href={project.liveLink} className="prj-link prj-link-primary">
                      <span>🔗</span>
                      Live Demo
                      <span className="prj-arrow">→</span>
                    </a>
                    <a href={project.githubLink} className="prj-link prj-link-secondary">
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