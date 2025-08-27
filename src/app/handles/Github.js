'use client';

import React, { useEffect, useState } from 'react';
import GitHubCalendar from 'react-github-calendar';
import './styles/Github.css';

const Github = () => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                setLoading(true);
                const response = await fetch('https://api.github.com/users/shashidharak89');
                if (!response.ok) throw new Error('Failed to fetch user data');
                const data = await response.json();
                setUser(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchUserData();
    }, []);

    if (loading) {
        return (
            <div className="gh-nexus-wrapper">
                <div className="gh-nexus-loader">
                    <div className="gh-nexus-spinner"></div>
                    <p>Loading GitHub data...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="gh-nexus-wrapper">
                <div className="gh-nexus-error">
                    <p>Error loading GitHub data: {error}</p>
                </div>
            </div>
        );
    }

    return (
        <div className="gh-nexus-wrapper">
            <div className="gh-nexus-header">
                <h2 className="gh-nexus-title">GitHub Analytics & Contributions</h2>
                <div className="gh-nexus-title-underline"></div>
            </div>

            {user && (
                <div className="gh-nexus-profile-section">
                    <div className="gh-nexus-profile-card">
                        <div className="gh-nexus-profile-left">
                            <div className="gh-nexus-avatar-container">
                                <img 
                                    className="gh-nexus-avatar" 
                                    src={user.avatar_url} 
                                    alt={`${user.name || user.login}'s avatar`}
                                    loading="lazy"
                                />
                                <div className="gh-nexus-avatar-ring"></div>
                            </div>
                            <div className="gh-nexus-user-info">
                                <h3 className="gh-nexus-name">{user.name || user.login}</h3>
                                <p className="gh-nexus-username">@{user.login}</p>
                                {user.bio && <p className="gh-nexus-bio">{user.bio}</p>}
                                {user.location && (
                                    <p className="gh-nexus-location">
                                        <span className="gh-nexus-icon">📍</span>
                                        {user.location}
                                    </p>
                                )}
                                <a 
                                    href={user.html_url} 
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                    className="gh-nexus-profile-link"
                                >
                                    View GitHub Profile
                                    <span className="gh-nexus-external-icon">↗</span>
                                </a>
                            </div>
                        </div>
                        
                        <div className="gh-nexus-profile-right">
                            <div className="gh-nexus-stats-grid">
                                <div className="gh-nexus-stat-item">
                                    <span className="gh-nexus-stat-number">{user.public_repos}</span>
                                    <span className="gh-nexus-stat-label">Repositories</span>
                                </div>
                                <div className="gh-nexus-stat-item">
                                    <span className="gh-nexus-stat-number">{user.followers}</span>
                                    <span className="gh-nexus-stat-label">Followers</span>
                                </div>
                                <div className="gh-nexus-stat-item">
                                    <span className="gh-nexus-stat-number">{user.following}</span>
                                    <span className="gh-nexus-stat-label">Following</span>
                                </div>
                                <div className="gh-nexus-stat-item">
                                    <span className="gh-nexus-stat-number">
                                        {new Date().getFullYear() - new Date(user.created_at).getFullYear()}+
                                    </span>
                                    <span className="gh-nexus-stat-label">Years Active</span>
                                </div>
                            </div>
                            <div className="gh-nexus-join-date">
                                <p>Member since {new Date(user.created_at).toLocaleDateString('en-US', { 
                                    year: 'numeric', 
                                    month: 'long'
                                })}</p>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            <div className="gh-nexus-analytics-section">
                <h3 className="gh-nexus-section-title">Performance Analytics</h3>
                <div className="gh-nexus-stats-container">
                    <div className="gh-nexus-stat-card">
                        <img
                            src="https://github-readme-stats.vercel.app/api?username=shashidharak89&show_icons=true&theme=default&hide_border=false&title_color=dc2626&icon_color=dc2626&text_color=1f2937&bg_color=ffffff"
                            alt="GitHub Statistics"
                            className="gh-nexus-stats-image"
                            loading="lazy"
                        />
                    </div>
                    <div className="gh-nexus-stat-card">
                        <img
                            src="https://github-readme-streak-stats.herokuapp.com?user=shashidharak89&theme=default&hide_border=false&stroke=dc2626&ring=dc2626&fire=dc2626&currStreakLabel=1f2937&sideLabels=1f2937&currStreakNum=dc2626&sideNums=dc2626&dates=64748b&background=ffffff"
                            alt="GitHub Streak Statistics"
                            className="gh-nexus-stats-image"
                            loading="lazy"
                        />
                    </div>
                </div>
                
                <div className="gh-nexus-activity-section">
                    <div className="gh-nexus-activity-card">
                        <img
                            src="https://github-readme-activity-graph.vercel.app/graph?username=shashidharak89&theme=minimal&bg_color=ffffff&color=1f2937&line=dc2626&point=dc2626&area=true&hide_border=false"
                            alt="GitHub Activity Graph"
                            className="gh-nexus-activity-graph"
                            loading="lazy"
                        />
                    </div>
                </div>
            </div>

            <div className="gh-nexus-calendar-section">
                <h3 className="gh-nexus-section-title">Contribution Timeline</h3>
                <div className="gh-nexus-calendar-container">
                    <GitHubCalendar
                        username="shashidharak89"
                        blockSize={15}
                        blockMargin={5}
                        colorScheme="light"
                        fontSize={14}
                        theme={{
                            light: ['#f3f4f6', '#fecaca', '#f87171', '#ef4444', '#dc2626']
                        }}
                    />
                </div>
            </div>
        </div>
    );
};

export default Github;