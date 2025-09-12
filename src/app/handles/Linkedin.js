'use client';

import React from 'react';
import './styles/Linkedin.css';
import { FaLinkedin } from 'react-icons/fa';

const Linkedin = () => {
  const handleRedirect = () => {
    window.open('https://www.linkedin.com/in/shashidhara-k-a2374b31b/', '_blank');
  };

  return (
    <div className="li-container">
      <div className="li-header">
        <FaLinkedin className="li-icon" />
        <h2>LinkedIn</h2>
      </div>

      <div className="li-profile">
        <div className="li-left">
          <div className="li-avatar-container">
            <img
              src="https://res.cloudinary.com/dsojdpkgh/image/upload/v1751812555/profile_zrldff.jpg"
              alt="Profile"
              className="li-avatar"
            />
            <div className="li-badge">Open to Work</div>
          </div>
        </div>

        <div className="li-right">
          <h3 className="li-name">
            Shashidhara K <span className="li-pronoun">He/Him</span>
          </h3>
          <p className="li-role">
            BCA STUDENT AT SHC | Full Stack Developer (MERN) | App development | DSA Enthusiast in Python & Java
          </p>
          <p className="li-location">
            Belthangadi, Karnataka, India · <span className="li-contact">Contact info</span>
          </p>
          <a
            href="https://shashi-k.in"
            target="_blank"
            rel="noopener noreferrer"
            className="li-link"
          >
            shashi-k.in
          </a>
          <p className="li-connections">90 connections</p>
          <button className="li-button" onClick={handleRedirect}>
            Visit LinkedIn Profile
          </button>
        </div>
      </div>
    </div>
  );
};

export default Linkedin;
