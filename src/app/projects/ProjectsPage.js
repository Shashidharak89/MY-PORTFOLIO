'use client';

import { useState, useMemo } from 'react';
import Image from 'next/image';
import ImageSlider from './ImageSlider';
import './styles/ProjectPage.css';

const ProjectsPage = () => {
  const [hoveredProject, setHoveredProject] = useState(null);

  // Common slides array for all projects (images and video)
  const commonSlides = [
    {
      type: 'image',
      src: 'https://res.cloudinary.com/dsojdpkgh/image/upload/v1743850448/bca2025_profiles/mtx0ziwcusmcxxobpip1.jpg',
      alt: 'Slide 1',
    },
    {
      type: 'image',
      src: 'https://aimst.edu.my/wp-content/uploads/2023/04/artificial-intelligence-new-technology-science-futuristic-abstract-human-brain-ai-technology-cpu-central-processor-unit-chipset-big-data-machine-learning-cyber-mind-domination-generative-ai.jpg',
      alt: 'Slide 2',
    },
    {
      type: 'image',
      src: 'https://aimst.edu.my/wp-content/uploads/2023/04/artificial-intelligence-new-technology-science-futuristic-abstract-human-brain-ai-technology-cpu-central-processor-unit-chipset-big-data-machine-learning-cyber-mind-domination-generative-ai.jpg',
      alt: 'Slide 3',
    },
    {
      type: 'video',
      thumbnail: 'https://img.youtube.com/vi/ECFNE4gCT7s/maxresdefault.jpg',
      videoSrc: 'https://www.youtube.com/embed/ECFNE4gCT7s?autoplay=1&rel=0',
      title: 'YouTube Video',
    },
  ];
  const commonSlides1 = [
    {
      type: 'image',
      src: 'https://res.cloudinary.com/dsojdpkgh/image/upload/v1740932445/team_photos/ojavhm6mj8jdjnjvm6ub.jpg',
      alt: 'Slide 1',
    },
    {
      type: 'image',
      src: 'https://aimst.edu.my/wp-content/uploads/2023/04/artificial-intelligence-new-technology-science-futuristic-abstract-human-brain-ai-technology-cpu-central-processor-unit-chipset-big-data-machine-learning-cyber-mind-domination-generative-ai.jpg',
      alt: 'Slide 2',
    },
    {
      type: 'image',
      src: 'https://aimst.edu.my/wp-content/uploads/2023/04/artificial-intelligence-new-technology-science-futuristic-abstract-human-brain-ai-technology-cpu-central-processor-unit-chipset-big-data-machine-learning-cyber-mind-domination-generative-ai.jpg',
      alt: 'Slide 3',
    },
    {
      type: 'video',
      thumbnail: 'https://img.youtube.com/vi/ECFNE4gCT7s/maxresdefault.jpg',
      videoSrc: 'https://www.youtube.com/embed/ECFNE4gCT7s?autoplay=1&rel=0',
      title: 'YouTube Video',
    },
  ];

  const projects = useMemo(() => [
    {
      id: 1,
      title: 'Gamenexplay',
      description: 'GameNexPlay.live is an interactive browser-based gaming platform I developed, offering users a seamless experience to play a variety of online games without any installation. The website features engaging tournaments, reward-based gameplay, and a user-friendly interface, making it an exciting destination for casual and competitive gamers alike.',
      technologies: ['React', 'Node.js', 'MongoDB', 'Node.js'],
      liveLink: 'https://gamenexplay.live',
      githubLink: 'https://github.com/example',
      slides: commonSlides,
    },
    {
      id: 2,
      title: 'Task Management App',
      description: 'An intuitive task management application with real-time collaboration features. Built with modern frameworks and includes drag-and-drop functionality, team collaboration tools, and advanced analytics dashboard.',
      technologies: ['Next.js', 'TypeScript', 'PostgreSQL', 'Socket.io'],
      liveLink: 'https://example.com',
      githubLink: 'https://github.com/example',
      slides: commonSlides1,
    },
    {
      id: 3,
      title: 'AI Chat Assistant',
      description: 'An intelligent chat assistant powered by advanced AI models. Features natural language processing, context awareness, and seamless integration with multiple platforms for enhanced user interaction.',
      technologies: ['Python', 'FastAPI', 'React', 'OpenAI API'],
      liveLink: 'https://example.com',
      githubLink: 'https://github.com/example',
      slides: commonSlides,
    },
    {
      id: 4,
      title: 'Portfolio Dashboard',
      description: 'A comprehensive dashboard for managing and showcasing creative portfolios. Includes analytics, project management, client communication tools, and customizable themes for different industries.',
      technologies: ['Vue.js', 'Express', 'MySQL', 'Chart.js'],
      liveLink: 'https://example.com',
      githubLink: 'https://github.com/example',
      slides: commonSlides,
    },
  ], [commonSlides]); // Added commonSlides to dependencies

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