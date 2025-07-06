'use client';

import React from 'react';
import './styles/Instagram.css';
import { FaInstagram } from 'react-icons/fa';

const Instagram = () => {
  const handleRedirect = () => {
    window.open('https://www.instagram.com/luminous_alpha_/', '_blank');
  };

  return (
    <div className="insta-wrapper">
      <div className="insta-topbar">
        <FaInstagram className="insta-logo-icon" />
        <span className="insta-title">Instagram</span>
      </div>

      <div className="insta-profile">
        <div className="insta-pic-section" onClick={handleRedirect}>
          <img
            src="https://res.cloudinary.com/dsojdpkgh/image/upload/v1751812555/profile_zrldff.jpg"
            alt="Profile"
            className="insta-avatar"
          />
        </div>
        <div className="insta-details">
          <div className="insta-header-row">
            <h2 className="insta-username">luminous_alpha_</h2>
            <button className="insta-button" onClick={handleRedirect}>
              Visit Profile
            </button>
          </div>
          <div className="insta-stats">
            <span><strong>3</strong> posts</span>
            <span><strong>4,576</strong> followers</span>
            <span><strong>3,804</strong> following</span>
          </div>
          <div className="insta-bio">
            <p><strong>Shashi kulal 🌟</strong></p>
            <p>@luminous_alpha_</p>
            <p>#sacredite</p>
            <p>Turning negativity into motivation 💀</p>
            <a href="https://portfolio.gamenexplay.live" target="_blank" rel="noopener noreferrer">
              portfolio.gamenexplay.live
            </a>
          </div>
        </div>
      </div>

      <div className="insta-highlights-scroll">
        <div className="insta-highlights">
          {['FRNDS', '💻🧑‍💻', 'highlight story', 'SHC 🤩', 'REELS 🔥', 'NATURE 🌌🏞️', 'ME ❄️🌀'].map((title, index) => (
            <div key={index} className="insta-highlight" onClick={handleRedirect}>
              <img
                src="https://res.cloudinary.com/dsojdpkgh/image/upload/v1751812555/profile_zrldff.jpg"
                alt={title}
              />
              <p>{title}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Instagram;
