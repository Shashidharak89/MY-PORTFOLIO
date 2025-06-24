'use client';

import { useState, useEffect } from 'react';
import ImageSlider from './ImageSlider'; // Adjust path as needed
import './styles/ProjectsSection.css';


const ProjectsSection = () => {
  const [isVisible, setIsVisible] = useState(false);

  

  const projects = [
    {
      id: 1,
      title: "Gamenexplay",
      description: "GameNexPlay.live is an interactive online gaming platform that offers users a variety of browser-based games without the need for downloads or installations. Designed with a sleek and responsive user interface, GameNexPlay provides a seamless experience across devices. The platform includes features such as coin-based rewards, redeemable gift cards, and user accounts, making gameplay both engaging and rewarding. Whether you're a casual gamer or a competitive player, GameNexPlay.live brings entertainment and excitement directly to your screen.",
      technologies: ["React", "Node.js", "Express js", "MongoDB"],
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
      title: "Color Prediction",
      description: "Color Prediction Game is a web-based betting platform where users can predict the outcome of color-based results (e.g., Red, Green, or Violet) and earn coins or rewards based on their predictions. Built with Next.js, this project provides a real-time, responsive experience that mimics the structure of popular online color prediction/betting apps. The interface is user-friendly, with wallet integration, result history, and secure prediction flow, making it both entertaining and engaging.",
      technologies: ["Next.js", "Node.js", "MongoDB"],
      projectLink: "https://color-prediction-next-js.vercel.app",
      sourceCode: "hhttps://github.com/Shashidharak89/Color-Prediction-NextJS.git",
      slides: [
        { type: 'image', src: 'https://res.cloudinary.com/dsojdpkgh/image/upload/v1750775188/Screenshot_33_s0gcac.png', title: 'Homepage' },
        { type: 'image', src: 'https://res.cloudinary.com/dsojdpkgh/image/upload/v1750775190/Screenshot_35_yg1jhz.png', title: 'Product Page' },
        { type: 'image', src: 'https://res.cloudinary.com/dsojdpkgh/image/upload/v1750775189/Screenshot_34_djpczm.png', title: 'Product Page' },
        { type: 'video', thumbnail: 'https://img.youtube.com/vi/JSt0FmvcvP8/0.jpg', videoSrc: 'https://www.youtube.com/embed/JSt0FmvcvP8', title: 'Platform Demo' }
      ]
    },
    {
      id: 3,
      title: "G.K Groups",
      description: "GKGRP.com is the official digital platform of GK Groups, a multifaceted company with expertise across three major domains: GK Design to Build, GK Industries, and GK Properties. The website serves as a unified portal to showcase the company’s diverse operations — from innovative architectural design and construction services, to manufacturing and industrial solutions, and real estate development. With a modern, intuitive interface, GKGRP.com reflects the group’s commitment to quality, professionalism, and growth across sectors.",
      technologies: ["React", "Node.js", "Express js", "MongoDB"],
      projectLink: "https://gkgrp.com",
      sourceCode: "https://github.com",
      slides: [
        { type: 'image', src: 'https://res.cloudinary.com/dsojdpkgh/image/upload/v1750775689/Screenshot_36_da2req.png', title: 'Workout Screen' },
        { type: 'image', src: 'https://res.cloudinary.com/dsojdpkgh/image/upload/v1750775693/Screenshot_38_aekgyv.png', title: 'Workout Screen' },
        { type: 'image', src: 'https://res.cloudinary.com/dsojdpkgh/image/upload/v1750775694/Screenshot_37_djce25.png', title: 'Workout Screen' },
        { type: 'image', src: 'https://res.cloudinary.com/dsojdpkgh/image/upload/v1750775701/Screenshot_39_q5ydzo.png', title: 'Workout Screen' },
        { type: 'image', src: 'https://res.cloudinary.com/dsojdpkgh/image/upload/v1750775701/Screenshot_42_jxlakw.png', title: 'Workout Screen' },
        { type: 'image', src: 'https://res.cloudinary.com/dsojdpkgh/image/upload/v1750775716/Screenshot_41_ksd11o.png', title: 'Workout Screen' },
        { type: 'image', src: 'https://res.cloudinary.com/dsojdpkgh/image/upload/v1750775716/Screenshot_40_dwh3d1.png', title: 'Workout Screen' },
        { type: 'image', src: 'https://res.cloudinary.com/dsojdpkgh/image/upload/v1750775717/Screenshot_46_wssult.png', title: 'Workout Screen' },
        { type: 'image', src: 'https://res.cloudinary.com/dsojdpkgh/image/upload/v1750775721/Screenshot_43_k20btq.png', title: 'Workout Screen' },
        { type: 'image', src: 'https://res.cloudinary.com/dsojdpkgh/image/upload/v1750775722/Screenshot_44_qhep3t.png', title: 'Workout Screen' }

      ]
    },
    {
      id: 4,
      title: "Department of BCA",
      description: "This is an official academic website developed for the Bachelor of Computer Applications (BCA) Department at Sacred Heart College. The platform serves as a centralized hub for students, faculty, and visitors, providing seamless access to important departmental information, faculty profiles, academic resources, event highlights, and contact details. Designed with a clean and responsive interface, the website ensures easy navigation across devices and reflects the department’s commitment to transparency, technology, and student engagement.",
      technologies: ["HTML", "CSS", "Javascript"],
      projectLink: "https://bcasacredheart2024.github.io/Department_of_bca",
      sourceCode: "hhttps://github.com",
      slides: [
        { type: 'image', src: 'https://res.cloudinary.com/dsojdpkgh/image/upload/v1750782478/Screenshot_50_dksygb.png', title: 'Homepage' },
        { type: 'image', src: 'https://res.cloudinary.com/dsojdpkgh/image/upload/v1750782488/Screenshot_49_rynkf9.png', title: 'Product Page' },
        { type: 'image', src: 'https://res.cloudinary.com/dsojdpkgh/image/upload/v1750782510/Screenshot_48_nuenyn.png', title: 'Product Page' },
        { type: 'image', src: 'https://res.cloudinary.com/dsojdpkgh/image/upload/v1750782511/Screenshot_53_fnphdn.png', title: 'Product Page' },
        { type: 'image', src: 'https://res.cloudinary.com/dsojdpkgh/image/upload/v1750782513/Screenshot_52_smjcwc.png', title: 'Product Page' },
        { type: 'image', src: 'https://res.cloudinary.com/dsojdpkgh/image/upload/v1750782518/Screenshot_51_kgx7lm.png', title: 'Product Page' },
        { type: 'image', src: 'https://res.cloudinary.com/dsojdpkgh/image/upload/v1750782529/Screenshot_56_r7qatt.png', title: 'Product Page' },
        { type: 'image', src: 'https://res.cloudinary.com/dsojdpkgh/image/upload/v1750782529/Screenshot_55_rm9akg.png', title: 'Product Page' },
        { type: 'image', src: 'https://res.cloudinary.com/dsojdpkgh/image/upload/v1750782529/Screenshot_54_cjhgxv.png', title: 'Product Page' },
        { type: 'image', src: 'https://res.cloudinary.com/dsojdpkgh/image/upload/v1750782581/Screenshot_57_nwy1hx.png', title: 'Product Page' }
      ]
    },
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