'use client';

import React, { useEffect } from 'react';
import './styles/About.css';

const AboutPage = () => {
  useEffect(() => {
    // Trigger animations on component mount
    const elements = document.querySelectorAll('.animate-on-scroll');
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.1 }
    );

    elements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, []);

  return (
    <div className="about-container">
      <section className="about-hero">
        <h1 className="hero-title animate-on-scroll">About Me</h1>
        <p className="hero-subtitle animate-on-scroll">
          Passionate creator with a drive for innovation and excellence
        </p>
      </section>

      <section className="about-content">
        <div className="content-card animate-on-scroll">
          <h2 className="card-title">My Journey</h2>
          <p className="card-text">
            I'm a dedicated professional with a background in [Your Field], bringing creativity and technical expertise to every project. My journey began with a curiosity for [Your Interest], which evolved into a career focused on delivering impactful solutions.
          </p>
        </div>

        <div className="content-card animate-on-scroll">
          <h2 className="card-title">Skills & Expertise</h2>
          <ul className="skills-list">
            <li className="skill-item">Web Development</li>
            <li className="skill-item">UI/UX Design</li>
            <li className="skill-item">Project Management</li>
            <li className="skill-item">[Your Skill]</li>
          </ul>
        </div>

        <div className="content-card animate-on-scroll">
          <h2 className="card-title">My Mission</h2>
          <p className="card-text">
            My goal is to craft experiences that resonate and inspire. Whether through code, design, or strategy, I aim to push boundaries and create meaningful connections.
          </p>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;