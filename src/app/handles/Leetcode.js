'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import './styles/Leetcode.css';

const LeetcodeProfile = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const username = 'shashidhara_k99'; // Default or pass as prop

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch('/api/leetcode', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ username }),
        });

        const result = await res.json();
        setData(result?.matchedUser);
        setLoading(false);
      } catch (error) {
        console.error('Failed to fetch LeetCode data:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <div className="lc-loading">Loading LeetCode profile...</div>;
  if (!data) return <div className="lc-error">No data found.</div>;

  const { profile, submitStats } = data;
  const { realName, userAvatar, ranking, reputation } = profile;
  const stats = submitStats.acSubmissionNum;

  return (
    <div className="lc-container">
      <h2 className="lc-title">LeetCode Stats</h2>
      <div className="lc-card">
        <img className="lc-avatar" src={userAvatar} alt="User Avatar" />
        <div className="lc-info">
          <h3 className="lc-name">{realName}</h3>
          <p className="lc-username">@{data.username}</p>
          <p className="lc-rank">Ranking: <strong>{ranking}</strong></p>
          <p className="lc-reputation">Reputation: <strong>{reputation}</strong></p>
          <Link
            href={`https://leetcode.com/${data.username}`}
            target="_blank"
            rel="noopener noreferrer"
            className="lc-profile-btn"
          >
            View Profile
          </Link>
        </div>
      </div>
      <div className="lc-stats">
        {stats.map((item, index) => (
          <div key={index} className="lc-stat-box">
            <p className="lc-difficulty">{item.difficulty}</p>
            <p className="lc-count">{item.count} solved</p>
            <p className="lc-sub">({item.submissions} submissions)</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LeetcodeProfile;