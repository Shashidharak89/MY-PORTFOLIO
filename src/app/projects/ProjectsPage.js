'use client';

import React, { useState, useEffect } from 'react';
import { ExternalLink, Github, ArrowRight, Play } from 'lucide-react';

const ProjectsPage = () => {
  const [hoveredProject, setHoveredProject] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState({});

  // Sample project data
  const projects = [
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
  ];

  // Auto-slide images when project is hovered
  useEffect(() => {
    if (hoveredProject) {
      const interval = setInterval(() => {
        setCurrentImageIndex(prev => ({
          ...prev,
          [hoveredProject]: ((prev[hoveredProject] || 0) + 1) % projects.find(p => p.id === hoveredProject).images.length
        }));
      }, 2000);
      
      return () => clearInterval(interval);
    }
  }, [hoveredProject, projects]);

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
            onMouseEnter={() => {
              setHoveredProject(project.id);
              setCurrentImageIndex(prev => ({ ...prev, [project.id]: 0 }));
            }}
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
                  <img 
                    src={project.images[0]} 
                    alt={project.title}
                    className="prj-image"
                  />
                  <div className="prj-image-overlay">
                    <Play className="prj-play-icon" />
                  </div>
                </div>
              </div>

              <div className="prj-expanded-content">
                <div className="prj-image-gallery">
                  <div className="prj-image-container">
                    {project.images.map((image, i) => (
                      <img
                        key={i}
                        src={image}
                        alt={`${project.title} ${i + 1}`}
                        className={`prj-gallery-image ${
                          i === (currentImageIndex[project.id] || 0) ? 'prj-gallery-image-active' : ''
                        }`}
                      />
                    ))}
                  </div>
                  <div className="prj-image-indicators">
                    {project.images.map((_, i) => (
                      <div
                        key={i}
                        className={`prj-indicator ${
                          i === (currentImageIndex[project.id] || 0) ? 'prj-indicator-active' : ''
                        }`}
                      />
                    ))}
                  </div>
                </div>

                <div className="prj-details">
                  <p className="prj-description">{project.description}</p>
                  <div className="prj-actions">
                    <a href={project.liveLink} className="prj-link prj-link-primary">
                      <ExternalLink size={18} />
                      Live Demo
                      <ArrowRight size={16} className="prj-arrow" />
                    </a>
                    <a href={project.githubLink} className="prj-link prj-link-secondary">
                      <Github size={18} />
                      Source Code
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <style jsx>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap');

        .prj-container {
          min-height: 100vh;
          background: linear-gradient(135deg, #fef7f7 0%, #fff5f5 50%, #fef2f2 100%);
          padding: 4rem 2rem;
          font-family: 'Inter', sans-serif;
        }

        .prj-header {
          text-align: center;
          margin-bottom: 4rem;
          animation: prjFadeInUp 0.8s ease-out;
        }

        .prj-title {
          font-size: 3.5rem;
          font-weight: 800;
          color: #1f2937;
          margin-bottom: 1rem;
          line-height: 1.2;
        }

        .prj-title-accent {
          color: #dc2626;
          position: relative;
        }

        .prj-title-accent::after {
          content: '';
          position: absolute;
          bottom: -0.5rem;
          left: 0;
          width: 100%;
          height: 4px;
          background: linear-gradient(90deg, #dc2626, #f87171);
          border-radius: 2px;
          animation: prjAccentLine 1s ease-out 0.5s both;
        }

        .prj-subtitle {
          font-size: 1.2rem;
          color: #6b7280;
          font-weight: 400;
          max-width: 600px;
          margin: 0 auto;
        }

        .prj-grid {
          max-width: 1200px;
          margin: 0 auto;
          display: flex;
          flex-direction: column;
          gap: 2rem;
        }

        .prj-card {
          background: white;
          border-radius: 20px;
          box-shadow: 0 4px 25px rgba(220, 38, 38, 0.08);
          overflow: hidden;
          transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);
          border: 1px solid rgba(220, 38, 38, 0.1);
          animation: prjSlideIn 0.6s ease-out both;
          cursor: pointer;
          position: relative;
        }

        .prj-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 4px;
          background: linear-gradient(90deg, #dc2626, #f87171, #fca5a5);
          transform: scaleX(0);
          transition: transform 0.6s ease;
          transform-origin: left;
        }

        .prj-card:hover::before {
          transform: scaleX(1);
        }

        .prj-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 20px 60px rgba(220, 38, 38, 0.15);
        }

        .prj-card-expanded {
          transform: translateY(-8px) !important;
          box-shadow: 0 25px 70px rgba(220, 38, 38, 0.2) !important;
        }

        .prj-card-content {
          position: relative;
          overflow: hidden;
        }

        .prj-card-main {
          display: flex;
          align-items: center;
          padding: 2rem;
          gap: 2rem;
          transition: all 0.4s ease;
        }

        .prj-card-expanded .prj-card-main {
          padding-bottom: 1rem;
        }

        .prj-card-info {
          flex: 1;
        }

        .prj-card-title {
          font-size: 2rem;
          font-weight: 700;
          color: #1f2937;
          margin-bottom: 1rem;
          transition: color 0.3s ease;
        }

        .prj-card:hover .prj-card-title {
          color: #dc2626;
        }

        .prj-tech-stack {
          display: flex;
          flex-wrap: wrap;
          gap: 0.5rem;
        }

        .prj-tech-tag {
          background: linear-gradient(135deg, #dc2626, #ef4444);
          color: white;
          padding: 0.4rem 0.8rem;
          border-radius: 20px;
          font-size: 0.8rem;
          font-weight: 500;
          box-shadow: 0 2px 8px rgba(220, 38, 38, 0.2);
          transition: transform 0.2s ease;
        }

        .prj-tech-tag:hover {
          transform: translateY(-2px);
        }

        .prj-preview-image {
          width: 200px;
          height: 120px;
          border-radius: 12px;
          overflow: hidden;
          position: relative;
          box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
          transition: transform 0.4s ease;
        }

        .prj-card:hover .prj-preview-image {
          transform: scale(1.05);
        }

        .prj-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
          aspect-ratio: 16/9;
        }

        .prj-image-overlay {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(220, 38, 38, 0.8);
          display: flex;
          align-items: center;
          justify-content: center;
          opacity: 0;
          transition: opacity 0.3s ease;
        }

        .prj-preview-image:hover .prj-image-overlay {
          opacity: 1;
        }

        .prj-play-icon {
          color: white;
          filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.2));
        }

        .prj-expanded-content {
          max-height: 0;
          overflow: hidden;
          transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);
          opacity: 0;
          padding: 0 2rem;
        }

        .prj-card-expanded .prj-expanded-content {
          max-height: 400px;
          opacity: 1;
          padding: 0 2rem 2rem 2rem;
        }

        .prj-image-gallery {
          margin-bottom: 2rem;
        }

        .prj-image-container {
          position: relative;
          width: 100%;
          height: 200px;
          border-radius: 12px;
          overflow: hidden;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
        }

        .prj-gallery-image {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          aspect-ratio: 16/9;
          opacity: 0;
          transition: opacity 0.5s ease;
        }

        .prj-gallery-image-active {
          opacity: 1;
        }

        .prj-image-indicators {
          display: flex;
          justify-content: center;
          gap: 0.5rem;
          margin-top: 1rem;
        }

        .prj-indicator {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: #d1d5db;
          transition: all 0.3s ease;
          cursor: pointer;
        }

        .prj-indicator-active {
          background: #dc2626;
          transform: scale(1.2);
        }

        .prj-details {
          display: flex;
          gap: 2rem;
          align-items: flex-start;
        }

        .prj-description {
          flex: 1;
          color: #4b5563;
          line-height: 1.6;
          font-size: 0.95rem;
        }

        .prj-actions {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
          min-width: 150px;
        }

        .prj-link {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.75rem 1rem;
          border-radius: 10px;
          text-decoration: none;
          font-weight: 500;
          font-size: 0.9rem;
          transition: all 0.3s ease;
          border: 2px solid transparent;
        }

        .prj-link-primary {
          background: linear-gradient(135deg, #dc2626, #ef4444);
          color: white;
          box-shadow: 0 4px 15px rgba(220, 38, 38, 0.3);
        }

        .prj-link-primary:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(220, 38, 38, 0.4);
        }

        .prj-link-secondary {
          background: white;
          color: #dc2626;
          border-color: #dc2626;
        }

        .prj-link-secondary:hover {
          background: #dc2626;
          color: white;
          transform: translateY(-2px);
        }

        .prj-arrow {
          transition: transform 0.3s ease;
        }

        .prj-link-primary:hover .prj-arrow {
          transform: translateX(4px);
        }

        @keyframes prjFadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes prjSlideIn {
          from {
            opacity: 0;
            transform: translateX(-30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes prjAccentLine {
          from {
            transform: scaleX(0);
          }
          to {
            transform: scaleX(1);
          }
        }

        @media (max-width: 768px) {
          .prj-container {
            padding: 2rem 1rem;
          }

          .prj-title {
            font-size: 2.5rem;
          }

          .prj-card-main {
            flex-direction: column;
            text-align: center;
          }

          .prj-preview-image {
            width: 100%;
            max-width: 300px;
          }

          .prj-details {
            flex-direction: column;
            gap: 1rem;
          }

          .prj-actions {
            min-width: auto;
          }
        }
      `}</style>
    </div>
  );
};

export default ProjectsPage;