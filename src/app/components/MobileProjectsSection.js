'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  FaGooglePlay,
  FaUpRightFromSquare,
  FaRocket,
  FaArrowRight
} from 'react-icons/fa6';
import './styles/MobileProjectsSection.css';

import learnixImg from './images/projects/learnix.jpeg';
import cipherImg from './images/projects/cipher2k25.jpeg';
import shopxImg from './images/projects/shopx.jpeg';

export default function MobileProjectsSection() {
  const featuredProjects = [
    {
      id: 'learnix',
      number: '01',
      title: 'LEARNIX Mobile App & Web',
      category: 'Education Platform & Android App',
      shortDesc: 'A comprehensive learning portal for students to access study notes, materials, and academic resources with an Android app published on Google Play Store.',
      technologies: ['Next.js', 'Node.js', 'Cloudinary', 'MongoDB', 'Android'],
      image: learnixImg,
      playStoreLink: 'https://play.google.com/store/apps/details?id=com.shashidharak.learnix',
      liveLink: 'https://learnix.shashi-k.in',
    },
    {
      id: 'cipher2k25',
      number: '02',
      title: 'CIPHER 2K25',
      category: 'Annual IT Fest Platform',
      shortDesc: 'Official digital hub for CIPHER 2K25 IT Fest featuring registrations, event schedules, sponsor highlights, and dynamic tech visuals.',
      technologies: ['React', 'Node.js', 'Express.js', 'MongoDB', 'Cloudinary'],
      image: cipherImg,
      liveLink: 'https://ciphen-2k25.vercel.app/',
    },
    {
      id: 'shopx',
      number: '03',
      title: 'ShopX E-Commerce Platform',
      category: 'Full-Stack Shopping Experience',
      shortDesc: 'Full-stack MERN e-commerce web application featuring seamless product browsing, cart management, checkout workflows, and admin panel.',
      technologies: ['React.js', 'Node.js', 'Express.js', 'MongoDB'],
      image: shopxImg,
      liveLink: 'https://e-commerce-mern-beta.vercel.app',
    }
  ];

  return (
    <section className="mobile-projects-section" id="mobile-projects" aria-label="Featured Projects">
      {/* Header */}
      <header className="mobile-projects-header">
        <div className="mobile-projects-pill">
          <span className="mobile-projects-pill-dot" />
          <span>Featured Work</span>
        </div>
        <h2 className="mobile-projects-title">Selected Projects</h2>
        <p className="mobile-projects-subtitle">
          Real-world applications built with clean code and modern engineering
        </p>
      </header>

      {/* Orderly Vertically Scrollable Project Cards */}
      <div className="mobile-projects-list">
        {featuredProjects.map((proj) => (
          <article key={proj.id} className="mobile-project-card">
            {/* Top Image Box */}
            <div className="mobile-project-image-box">
              <Image
                src={proj.image}
                alt={proj.title}
                className="mobile-project-img"
                placeholder="blur"
              />
              <div className="mobile-project-badge-row">
                <span className="mobile-project-number">{proj.number}</span>
                <span className="mobile-project-cat-badge">{proj.category}</span>
              </div>
            </div>

            {/* Below Description & Actions */}
            <div className="mobile-project-content">
              <h3 className="mobile-project-heading">{proj.title}</h3>
              <p className="mobile-project-desc">{proj.shortDesc}</p>

              <div className="mobile-project-tech-row">
                {proj.technologies.map((tech) => (
                  <span key={tech} className="mobile-project-tech-pill">
                    {tech}
                  </span>
                ))}
              </div>

              <div className="mobile-project-actions">
                {proj.playStoreLink && (
                  <a
                    href={proj.playStoreLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mobile-project-btn playstore"
                  >
                    <FaGooglePlay />
                    <span>Play Store</span>
                  </a>
                )}

                {proj.liveLink && (
                  <a
                    href={proj.liveLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mobile-project-btn live"
                  >
                    <FaUpRightFromSquare />
                    <span>Visit Live</span>
                  </a>
                )}
              </div>
            </div>
          </article>
        ))}

        {/* Finale Call-To-Action Card */}
        <div className="mobile-projects-cta-card">
          <div className="mobile-cta-icon-circle" aria-hidden="true">
            <FaRocket />
          </div>
          <h3 className="mobile-cta-title">Want to see more work?</h3>
          <p className="mobile-cta-desc">
            Browse all my projects with live demos, full architectures, and case studies.
          </p>
          <Link href="/projects" className="mobile-cta-button">
            <span>Explore All Projects</span>
            <FaArrowRight className="mobile-cta-arrow" />
          </Link>
        </div>
      </div>
    </section>
  );
}
