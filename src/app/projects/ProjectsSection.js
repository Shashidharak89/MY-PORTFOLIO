'use client';

import { useState, useEffect } from 'react';
import ImageSlider from './ImageSlider'; // Adjust path as needed
import './styles/ProjectsSection.css';


const ProjectsSection = () => {
  const [isVisible, setIsVisible] = useState(false);



  const projects = [
    {
      id: 1,
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
    {
      id: 2,
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
      title: "CIPHER 2K25",
      description: "CIPHER2K25.in is the official website for CIPHER 2K25, the annual IT Fest organized by the BCA Department of Sacred Heart College. Designed to generate excitement and streamline participation, the site showcases all fest-related information including event lineups, registration details, rules, schedules, and sponsor highlights. With a modern, mobile-friendly interface and dynamic visuals inspired by tech and gaming culture, the website offers a smooth and engaging experience for students, coordinators, and visitors alike.",
      technologies: ["React", "Node.js", "Express js", "MongoDB", "Cloudinary"],
      projectLink: "https://cipher2k25.in",
      sourceCode: "https://github.com/Shashidharak89/ciphen.git",
      slides: [
        { type: 'image', src: 'https://res.cloudinary.com/dsojdpkgh/image/upload/v1750784963/Screenshot_58_ahpt9z.png', title: 'Dashboard View' },
        { type: 'image', src: 'https://res.cloudinary.com/dsojdpkgh/image/upload/v1750784969/Screenshot_59_nnpwga.png', title: 'Dashboard View' },
        { type: 'image', src: 'https://res.cloudinary.com/dsojdpkgh/image/upload/v1750784964/Screenshot_60_ow1mdt.png', title: 'Dashboard View' },
        { type: 'image', src: 'https://res.cloudinary.com/dsojdpkgh/image/upload/v1750784972/Screenshot_71_ymvoas.png', title: 'Dashboard View' },
        { type: 'image', src: 'https://res.cloudinary.com/dsojdpkgh/image/upload/v1750784965/Screenshot_65_azatac.png', title: 'Dashboard View' },
        { type: 'image', src: 'https://res.cloudinary.com/dsojdpkgh/image/upload/v1750784966/Screenshot_64_ycorwx.png', title: 'Dashboard View' },
        { type: 'image', src: 'https://res.cloudinary.com/dsojdpkgh/image/upload/v1750784967/Screenshot_61_edymqn.png', title: 'Dashboard View' },
        { type: 'image', src: 'https://res.cloudinary.com/dsojdpkgh/image/upload/v1750784967/Screenshot_62_dbq1ah.png', title: 'Dashboard View' },
        { type: 'image', src: 'https://res.cloudinary.com/dsojdpkgh/image/upload/v1750784967/Screenshot_67_a6ft3o.png', title: 'Dashboard View' },

        { type: 'image', src: 'https://res.cloudinary.com/dsojdpkgh/image/upload/v1750784970/Screenshot_69_xgpcgu.png', title: 'Dashboard View' },
        { type: 'image', src: 'https://res.cloudinary.com/dsojdpkgh/image/upload/v1750784969/Screenshot_70_cck2sc.png', title: 'Dashboard View' },
        { type: 'image', src: 'https://res.cloudinary.com/dsojdpkgh/image/upload/v1750784969/Screenshot_68_x8mhvd.png', title: 'Dashboard View' },
        { type: 'image', src: 'https://res.cloudinary.com/dsojdpkgh/image/upload/v1750784970/Screenshot_72_qn7qe4.png', title: 'Dashboard View' },
        { type: 'image', src: 'https://res.cloudinary.com/dsojdpkgh/image/upload/v1750784972/Screenshot_63_gmfqkz.png', title: 'Dashboard View' },
        { type: 'image', src: 'https://res.cloudinary.com/dsojdpkgh/image/upload/v1750784972/Screenshot_66_p4nj0z.png', title: 'Dashboard View' }
      ]
    },

    {
      id: 5,
      title: "SHASHI AI",
      description: "SHASHI AI is a Telegram bot (@shashiai_bot) built with a Next.js backend that integrates Gemini AI for intelligent chatbot responses. It also includes a movie search feature, where users can type `$movies-<movie name>` to instantly fetch movie details if available. The bot is designed to be fast, reliable, and user-friendly, offering both conversational AI and entertainment utilities inside Telegram.",
      technologies: ["Next.js", "Node.js", "Gemini AI", "Telegram Bot API"],
      projectLink: "https://t.me/shashiai_bot",
      sourceCode: "https://github.com",
      slides: [
        { type: 'image', src: 'https://res.cloudinary.com/dsojdpkgh/image/upload/v1755786075/720da7fa-62ad-4039-ba43-d18cda100c86.png', title: 'Chat Interface' },
        { type: 'image', src: 'https://res.cloudinary.com/dsojdpkgh/image/upload/v1755790340/6FF9BFE4-44DD-4852-8F18-E756CC20243C_mh6o8u.png', title: 'Movie Search Demo' },
        { type: 'image', src: 'https://res.cloudinary.com/dsojdpkgh/image/upload/v1755786138/319a8803-d02e-4414-aa29-da02a1e98a6e.png', title: 'Gemini AI Response' },
        { type: 'image', src: 'https://res.cloudinary.com/dsojdpkgh/image/upload/v1755786173/36bab387-a8e1-47a3-a28b-d5b10a66b72d.png', title: 'Gemini AI Response' },
        { type: 'image', src: 'https://res.cloudinary.com/dsojdpkgh/image/upload/v1755786226/b6aec87d-affc-4a32-bb7e-08542d379071.png', title: 'Gemini AI Response' },
        { type: 'image', src: 'https://res.cloudinary.com/dsojdpkgh/image/upload/v1755786242/2052cf1f-d9f7-41bf-8052-b8450db1a0d5.png', title: 'Gemini AI Response' },
        { type: 'image', src: 'https://res.cloudinary.com/dsojdpkgh/image/upload/v1755786287/6156e174-9665-4d71-8aaa-20d02fa76e4c.png', title: 'Gemini AI Response' },
        { type: 'image', src: 'https://res.cloudinary.com/dsojdpkgh/image/upload/v1755786442/881c17c7-a13e-40bd-9e83-962ee5679f7e.png', title: 'Gemini AI Response' },
        { type: 'image', src: 'https://res.cloudinary.com/dsojdpkgh/image/upload/v1755786459/9636fff0-738f-47b5-a767-fae8ce932628.png', title: 'Gemini AI Response' },

        { type: 'video', thumbnail: 'https://img.youtube.com/vi/JSt0FmvcvP8/0.jpg', videoSrc: 'https://www.youtube.com/embed/JSt0FmvcvP8', title: 'Bot Demo' }
      ]
    },
        {
      id: 6,
      title: "LEARNIX",
      description: "Learnix is a sleek educational web platform built with Next.js that empowers students to access and share learning resources seamlessly. Designed with modern UI/UX in mind, the site supports effortless navigation, responsive layouts and intuitive content management—making it a compelling tool for collaborative and remote learning.",
      technologies: ["Next.js", "Node.js", "Cloudinary", "MongoDB"],
      projectLink: "https://learnix.shashi-k.in",
      sourceCode: "https://github.com",
      slides: [
        { type: 'image', src: 'https://res.cloudinary.com/dsojdpkgh/image/upload/v1758819907/dashboard_s0ftxp.jpg', title: 'Workout Screen' },
        { type: 'image', src: 'https://res.cloudinary.com/dsojdpkgh/image/upload/v1758819925/profile-skeleton_gsfu0l.jpg', title: 'Workout Screen' },
        { type: 'image', src: 'https://res.cloudinary.com/dsojdpkgh/image/upload/v1758819909/profile-ss_kf3eze.jpg', title: 'Workout Screen' },
        { type: 'image', src: 'https://res.cloudinary.com/dsojdpkgh/image/upload/v1758819912/search_pher6e.jpg', title: 'Workout Screen' },
        { type: 'image', src: 'https://res.cloudinary.com/dsojdpkgh/image/upload/v1758819904/materials-page_dwovnn.jpg', title: 'Workout Screen' },
        { type: 'image', src: 'https://res.cloudinary.com/dsojdpkgh/image/upload/v1758819929/works-first_vovplj.jpg', title: 'Workout Screen' },
        { type: 'image', src: 'https://res.cloudinary.com/dsojdpkgh/image/upload/v1758819924/upload-sub-delete_cbl5e7.jpg', title: 'Workout Screen' },
        { type: 'image', src: 'https://res.cloudinary.com/dsojdpkgh/image/upload/v1758819907/feedback-send_hztwgv.jpg', title: 'Workout Screen' },
        { type: 'image', src: 'https://res.cloudinary.com/dsojdpkgh/image/upload/v1758819923/upload-topic-add_j3qhbc.jpg', title: 'Workout Screen' },
        { type: 'image', src: 'https://res.cloudinary.com/dsojdpkgh/image/upload/v1758819925/work-id_k3bsrb.jpg', title: 'Workout Screen' }

      ]
    },



  ].reverse();

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
                    Live Demo
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