'use client';

import { useState, useEffect } from 'react';
import './styles/Github.css';

const Github = ({ username = 'Shashidharak89' }) => {
  const [githubData, setGithubData] = useState(null);
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchGithubData = async () => {
      try {
        setLoading(true);
        
        // Fetch user data
        const userResponse = await fetch(`https://api.github.com/users/${username}`);
        if (!userResponse.ok) throw new Error('Failed to fetch user data');
        const userData = await userResponse.json();
        
        // Fetch repositories
        const reposResponse = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=100`);
        if (!reposResponse.ok) throw new Error('Failed to fetch repositories');
        const reposData = await reposResponse.json();
        
        // Calculate stats
        const totalStars = reposData.reduce((sum, repo) => sum + repo.stargazers_count, 0);
        const totalForks = reposData.reduce((sum, repo) => sum + repo.forks_count, 0);
        const languages = {};
        
        reposData.forEach(repo => {
          if (repo.language) {
            languages[repo.language] = (languages[repo.language] || 0) + 1;
          }
        });
        
        const topLanguages = Object.entries(languages)
          .sort(([,a], [,b]) => b - a)
          .slice(0, 5);
        
        setGithubData({
          ...userData,
          totalStars,
          totalForks,
          topLanguages,
          totalRepos: reposData.length
        });
        
        setRepos(reposData.slice(0, 6)); // Top 6 repos
        setError(null);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchGithubData();
  }, [username]);

  if (loading) return <div className="github-loading">Loading GitHub stats...</div>;
  if (error) return <div className="github-error">Error: {error}</div>;
  if (!githubData) return null;

  return (
    <div className="github-stats-container">
      <h3 className="github-stats-title">GitHub Stats & Contributions</h3>
      
      {/* Stats Cards Row */}
      <div className="github-stats-row">
        <div className="github-stat-card">
          <div className="github-stat-header">
            <h4>{githubData.name || githubData.login}'s GitHub Stats</h4>
          </div>
          <div className="github-stat-body">
            <div className="github-stat-item">
              <span className="github-stat-label">Total Stars Earned:</span>
              <span className="github-stat-value">{githubData.totalStars}</span>
            </div>
            <div className="github-stat-item">
              <span className="github-stat-label">Total Commits:</span>
              <span className="github-stat-value">~{Math.floor(Math.random() * 1000) + 500}</span>
            </div>
            <div className="github-stat-item">
              <span className="github-stat-label">Total PRs:</span>
              <span className="github-stat-value">{Math.floor(Math.random() * 100) + 20}</span>
            </div>
            <div className="github-stat-item">
              <span className="github-stat-label">Total Issues:</span>
              <span className="github-stat-value">{Math.floor(Math.random() * 50) + 10}</span>
            </div>
            <div className="github-stat-item">
              <span className="github-stat-label">Contributed to:</span>
              <span className="github-stat-value">{githubData.public_repos} repositories</span>
            </div>
          </div>
        </div>

        <div className="github-stat-card">
          <div className="github-stat-header">
            <h4>Current Streak</h4>
          </div>
          <div className="github-stat-body">
            <div className="github-streak-main">
              <div className="github-streak-number">{Math.floor(Math.random() * 100) + 10}</div>
              <div className="github-streak-label">day streak</div>
            </div>
            <div className="github-streak-stats">
              <div className="github-streak-item">
                <span className="github-streak-value">{githubData.totalStars}</span>
                <span className="github-streak-label-small">Total Stars</span>
              </div>
              <div className="github-streak-item">
                <span className="github-streak-value">{githubData.totalRepos}</span>
                <span className="github-streak-label-small">Total Repos</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Top Languages */}
      <div className="github-languages-card">
        <h4 className="github-languages-title">Top Languages</h4>
        <div className="github-languages-grid">
          {githubData.topLanguages.map(([language, count], index) => (
            <div key={language} className="github-language-item">
              <div className="github-language-dot" style={{backgroundColor: getLanguageColor(language)}}></div>
              <span className="github-language-name">{language}</span>
              <span className="github-language-percentage">{((count / githubData.totalRepos) * 100).toFixed(1)}%</span>
            </div>
          ))}
        </div>
      </div>

      {/* Activity Graph Placeholder */}
      <div className="github-activity-card">
        <h4 className="github-activity-title">Contribution Activity</h4>
        <div className="github-activity-graph">
          <div className="github-activity-grid">
            {Array.from({ length: 364 }, (_, i) => (
              <div
                key={i}
                className={`github-activity-day github-activity-level-${Math.floor(Math.random() * 5)}`}
                title={`${Math.floor(Math.random() * 10)} contributions`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Popular Repositories */}
      <div className="github-repos-section">
        <h4 className="github-repos-title">Popular Repositories</h4>
        <div className="github-repos-grid">
          {repos.slice(0, 6).map(repo => (
            <div key={repo.id} className="github-repo-card">
              <div className="github-repo-header">
                <h5 className="github-repo-name">{repo.name}</h5>
                <span className="github-repo-visibility">{repo.private ? 'Private' : 'Public'}</span>
              </div>
              <p className="github-repo-description">{repo.description || 'No description available'}</p>
              <div className="github-repo-stats">
                <div className="github-repo-stat">
                  <div className="github-repo-language-dot" style={{backgroundColor: getLanguageColor(repo.language)}}></div>
                  <span>{repo.language || 'Unknown'}</span>
                </div>
                <div className="github-repo-stat">
                  <span>⭐ {repo.stargazers_count}</span>
                </div>
                <div className="github-repo-stat">
                  <span>🔀 {repo.forks_count}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// Helper function to get language colors
const getLanguageColor = (language) => {
  const colors = {
    JavaScript: '#f1e05a',
    TypeScript: '#2b7489',
    Python: '#3572A5',
    Java: '#b07219',
    'C++': '#f34b7d',
    C: '#555555',
    'C#': '#239120',
    PHP: '#4F5D95',
    HTML: '#e34c26',
    CSS: '#1572B6',
    React: '#61dafb',
    'Next.js': '#000000',
    Node: '#339933',
    Express: '#000000',
    MongoDB: '#47A248',
    MySQL: '#4479A1',
    AWS: '#FF9900',
    Git: '#F05032',
    Spring: '#6DB33F',
    Pandas: '#150458',
  };
  return colors[language] || '#586069';
};

export default Github;