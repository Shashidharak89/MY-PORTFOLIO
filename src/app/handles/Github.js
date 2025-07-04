'use client';

import React, { useEffect, useState } from 'react';
import './styles/Github.css';

const Github = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetch('https://api.github.com/users/shashidharak89')
      .then(res => res.json())
      .then(data => setUser(data));
  }, []);

  return (
    <div className="gh-wrapper">
      <h2 className="gh-title">GitHub Stats & Contributions</h2>

      {user && (
        <div className="gh-profile-card">
          <div className="gh-card-left">
            <img className="gh-avatar" src={user.avatar_url} alt="Avatar" />
            <div className="gh-user-info">
              <h3>{user.name}</h3>
              <p>{user.bio}</p>
              <p><strong>Location:</strong> {user.location}</p>
              <a href={user.html_url} target="_blank" rel="noreferrer">View GitHub Profile</a>
            </div>
          </div>
          <div className="gh-card-right">
            <p><strong>Username:</strong> {user.login}</p>
            <p><strong>Followers:</strong> {user.followers}</p>
            <p><strong>Following:</strong> {user.following}</p>
            <p><strong>Public Repos:</strong> {user.public_repos}</p>
            <p><strong>Created At:</strong> {new Date(user.created_at).toDateString()}</p>
          </div>
        </div>
      )}

      {/* GitHub Stats Images */}
      <div className="gh-stats-graphs">
        <img
          src="https://github-readme-stats.vercel.app/api?username=shashidharak89&show_icons=true&theme=default&hide_border=false"
          alt="GitHub Stats"
          className="gh-stats-img"
        />
        <img
          src="https://github-readme-streak-stats.herokuapp.com?user=shashidharak89&theme=default&hide_border=false"
          alt="GitHub Streak"
          className="gh-stats-img"
        />
        <img
          src="https://github-readme-activity-graph.vercel.app/graph?username=shashidharak89&theme=light&hide_border=false"
          alt="Contribution Graph"
          className="gh-graph-img"
        />
      </div>
    </div>
  );
};

export default Github;
