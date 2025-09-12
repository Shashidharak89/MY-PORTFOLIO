'use client';

import React from 'react';
import './styles/Instagram.css';
import { FaInstagram } from 'react-icons/fa';

const Instagram = () => {
  const handleRedirect = () => {
    window.open('https://www.instagram.com/luminous_alpha_/', '_blank');
  };

  // List of highlights with specific links (as requested)
  const highlights = [
    {
      title: 'FRNDS',
      link: 'https://www.instagram.com/s/aGlnaGxpZ2h0OjE3ODY1OTQ2ODYxNTMzOTg3?story_media_id=2184297870807367469_13282588137&igsh=MTFod2l0MjFjNGU0cA==',
      image: 'https://res.cloudinary.com/dsojdpkgh/image/upload/v1751812555/profile_zrldff.jpg',
    },
    {
      title: '💻🧑‍💻',
      link: 'https://www.instagram.com/s/aGlnaGxpZ2h0OjE3ODc3NzY3NTY0OTIxNzIz?story_media_id=3130873057895116997_13282588137&igsh=b3RtbDJvZThhaGRi',
      image: 'https://res.cloudinary.com/dsojdpkgh/image/upload/v1751812555/profile_zrldff.jpg',
    },
    {
      title: 'SHC 🤩',
      link: 'https://www.instagram.com/s/aGlnaGxpZ2h0OjE3OTcyNjg4MjU0NjMzNTE4?story_media_id=3141737469686662180_13282588137&igsh=MTBwcXFtaDBld3dpeA==',
      image: 'https://res.cloudinary.com/dsojdpkgh/image/upload/v1751812555/profile_zrldff.jpg',
    },
    {
      title: 'REELS 🔥',
      link: 'https://www.instagram.com/s/aGlnaGxpZ2h0OjE4MDMwODM0NTkyODc5MTE2?story_media_id=3126410282200230517_13282588137&igsh=MThoaWRmeWU3MG9rYg==',
      image: 'https://res.cloudinary.com/dsojdpkgh/image/upload/v1751812555/profile_zrldff.jpg',
    },
    {
      title: 'NATURE 🌌🏞️',
      link: 'https://www.instagram.com/s/aGlnaGxpZ2h0OjE3OTY4MjY4NTY5ODYyMDE1?story_media_id=2868851949952138910_13282588137&igsh=YWNwenVjbXc0OWJr',
      image: 'https://res.cloudinary.com/dsojdpkgh/image/upload/v1751812555/profile_zrldff.jpg',
    },
    {
      title: 'ME ❄️🌀',
      link: 'https://www.instagram.com/s/aGlnaGxpZ2h0OjE3OTQwMzgzNjI0Mjc0MTU5?story_media_id=2932852016272679109_13282588137&igsh=NGswNTVpNjJqeDU5',
      image: 'https://res.cloudinary.com/dsojdpkgh/image/upload/v1751812555/profile_zrldff.jpg',
    },
  ];

  return (
    <div className="insta-wrapper">
      <div className="insta-topbar">
        <FaInstagram className="insta-logo-icon" />
        <span className="insta-title">Instagram</span>
      </div>

      <div className="insta-profile">
        <div className="insta-pic-section" onClick={handleRedirect}>
          <img
            src="https://res.cloudinary.com/dsojdpkgh/image/upload/v1752031938/IMG_20250709_085909_fu3evc.jpg"
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
            <span><strong>4,571</strong> followers</span>
            <span><strong>3,743</strong> following</span>
          </div>
          <div className="insta-bio">
            <p><strong>Shashi kulal 🌟</strong></p>
            <p>@luminous_alpha_</p>
            <p>𝐍𝐌𝐀𝐌𝐈𝐓 𝐍𝐈𝐓𝐓𝐄</p>
            <p>Turning negativity into motivation 💀</p>
            <a href="https://portfolio.gamenexplay.live" target="_blank" rel="noopener noreferrer">
              shashi-k.in
            </a>
          </div>
        </div>
      </div>

      <div className="insta-highlights-scroll">
        <div className="insta-highlights">
          {highlights.map((hl, index) => (
            <div
              key={index}
              className="insta-highlight"
              onClick={() => window.open(hl.link, '_blank')}
            >
              <img src={hl.image} alt={hl.title} />
              <p>{hl.title}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Instagram;
