'use client';

import React, { useEffect, useState } from 'react';
import './styles/GFGProfile.css';

const GFGProfile = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const username = 'shashidhazdn'; // your GFG username

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`https://geeks-for-geeks-stats-api.vercel.app/?raw=Y&userName=${username}`);
        const result = await res.json();
        setData(result);
        setLoading(false);
      } catch (error) {
        console.error('Failed to fetch GFG data:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <div className="gfg-loading">Loading GeeksforGeeks profile...</div>;
  if (!data) return <div className="gfg-error">No data found.</div>;

  const { userName, Easy, Medium, Hard, School, Basic, totalProblemsSolved } = data;

  return (
    <div className="gfg-container">
      <h2 className="gfg-title">GeeksforGeeks Stats</h2>
      <div className="gfg-card">
        <img
          className="gfg-avatar"
          src="https://media.geeksforgeeks.org/wp-content/cdn-uploads/gfg_200X200.png"
          alt="GFG Avatar"
        />
        <div className="gfg-info">
          <h3 className="gfg-name">GFG User</h3>
          <p className="gfg-username">@{userName}</p>
          <p className="gfg-total">Total Solved: <strong>{totalProblemsSolved}</strong></p>
        </div>
      </div>
      <div className="gfg-stats">
        <div className="gfg-stat-box"><p className="gfg-difficulty">Easy</p><p className="gfg-count">{Easy}</p></div>
        <div className="gfg-stat-box"><p className="gfg-difficulty">Medium</p><p className="gfg-count">{Medium}</p></div>
        <div className="gfg-stat-box"><p className="gfg-difficulty">Hard</p><p className="gfg-count">{Hard}</p></div>
        <div className="gfg-stat-box"><p className="gfg-difficulty">School</p><p className="gfg-count">{School}</p></div>
        <div className="gfg-stat-box"><p className="gfg-difficulty">Basic</p><p className="gfg-count">{Basic}</p></div>
      </div>
    </div>
  );
};

export default GFGProfile;
