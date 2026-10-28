'use client';

import React from 'react';
import { FaRocket, FaLaptopCode, FaGithub, FaArrowUpRightFromSquare } from 'react-icons/fa6';
import { SiLeetcode } from 'react-icons/si';
import './styles/MobileStatsSection.css';

export default function MobileStatsSection() {
  const stats = [
    {
      label: 'Projects Completed',
      value: '10+',
      icon: <FaRocket />,
      badge: 'Builds'
    },
    {
      label: 'LeetCode Solved',
      value: '500+',
      icon: <SiLeetcode />,
      link: 'https://leetcode.com/u/shashidhara_k/',
      ariaLabel: 'View LeetCode profile — 500+ problems solved',
      badge: 'Problems'
    },
    {
      label: 'GitHub Contributions',
      value: '4500+',
      icon: <FaGithub />,
      link: 'https://github.com/Shashidharak89',
      ariaLabel: 'View GitHub profile — 4500+ contributions',
      badge: 'Commits'
    },
    {
      label: 'Technologies Used',
      value: '10+',
      icon: <FaLaptopCode />,
      badge: 'Stack'
    }
  ];

  return (
    <section className="mobile-stats-snap-section" aria-label="Metrics and Impact">
      {/* Ambient background glow */}
      <div className="mobile-stats-orb" aria-hidden="true" />

      <div className="mobile-stats-wrapper">
        <header className="mobile-stats-header">
          <div className="mobile-stats-pill">
            <span className="mobile-stats-pill-dot" />
            <span>Highlights</span>
          </div>
          <h2 className="mobile-stats-title">Metrics &amp; Impact</h2>
          <p className="mobile-stats-subtitle">
            Consistent practice, shipped projects, and proven problem solving
          </p>
        </header>

        <div className="mobile-stats-grid">
          {stats.map((stat) => {
            const isClickable = Boolean(stat.link);
            const CardTag = isClickable ? 'a' : 'div';
            const linkProps = isClickable
              ? {
                  href: stat.link,
                  target: '_blank',
                  rel: 'noopener noreferrer',
                  'aria-label': stat.ariaLabel,
                }
              : {};

            return (
              <CardTag
                key={stat.label}
                className="mobile-stat-card"
                {...linkProps}
              >
                <div className="mobile-stat-top-row">
                  <div className="mobile-stat-icon-wrapper">
                    {stat.icon}
                  </div>
                  {isClickable ? (
                    <span className="mobile-stat-link-arrow" aria-hidden="true">
                      <FaArrowUpRightFromSquare />
                    </span>
                  ) : (
                    <span className="mobile-stat-badge">{stat.badge}</span>
                  )}
                </div>

                <div className="mobile-stat-value">{stat.value}</div>
                <div className="mobile-stat-label">{stat.label}</div>
              </CardTag>
            );
          })}
        </div>

        <div className="mobile-stats-hint">
          Tap on LeetCode or GitHub cards to view live profiles
        </div>
      </div>
    </section>
  );
}
