'use client';

import React from 'react';
import './styles/Instagram.css';
import { FaInstagram } from 'react-icons/fa';

const Instagram = () => {
  const handleRedirect = () => {
    window.open('https://www.instagram.com/luminous_alpha_/', '_blank');
  };

  return (
    <div className="ig-container">
      <div className="ig-header">
        <div className="ig-profile-pic" onClick={handleRedirect}>
          <img
            src="https://res.cloudinary.com/dsojdpkgh/image/upload/v1751812555/profile_zrldff.jpg"
            alt="Profile"
          />
        </div>
        <div className="ig-info">
          <div className="ig-username-row">
            <h2 className="ig-username">luminous_alpha_</h2>
            <button className="ig-button" onClick={handleRedirect}>
              Visit Profile
            </button>
          </div>
          <div className="ig-stats">
            <span><strong>3</strong> posts</span>
            <span><strong>4,576</strong> followers</span>
            <span><strong>3,804</strong> following</span>
          </div>
          <div className="ig-bio">
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

      <div className="ig-highlights">
        {['FRNDS', '💻🧑‍💻', 'highlight story', 'SHC 🤩', 'REELS 🔥', 'NATURE 🌌🏞️', 'ME ❄️🌀'].map((title, index) => (
          <div key={index} className="ig-highlight" onClick={handleRedirect}>
            <img
              src="https://res.cloudinary.com/dsojdpkgh/image/upload/v1751812555/profile_zrldff.jpg"
              alt="Highlight"
            />
            <p>{title}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Instagram;
