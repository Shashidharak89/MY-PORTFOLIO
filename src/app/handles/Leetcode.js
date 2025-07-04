"use client";

import { useEffect, useState } from 'react';

const LeetcodeProfile = () => {
  const [username, setUsername] = useState('shashidharak'); // default username
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchLeetcodeStats = async () => {
    setLoading(true);
    setError('');
    try {
      const res = await fetch('/api/leetcode', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username }),
      });

      const json = await res.json();

      if (res.ok) {
        setData(json.matchedUser);
      } else {
        throw new Error(json.error || 'Failed to fetch LeetCode data');
      }
    } catch (err) {
      console.error('Error fetching:', err);
      setError(err.message);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchLeetcodeStats();
  }, []);

  return (
    <div style={styles.container}>
      <h2>LeetCode Profile</h2>
      {loading && <p>Loading...</p>}
      {error && <p style={styles.error}>⚠️ {error}</p>}
      {data ? (
        <div style={styles.card}>
          <img src={data.profile.userAvatar} alt="avatar" style={styles.avatar} />
          <h3>{data.profile.realName} ({data.username})</h3>
          <p><strong>Ranking:</strong> {data.profile.ranking}</p>
          <p><strong>Reputation:</strong> {data.profile.reputation}</p>

          <h4>Solved Problems:</h4>
          <ul>
            {data.submitStats.acSubmissionNum.map((item) => (
              <li key={item.difficulty}>
                {item.difficulty}: {item.count} problems
              </li>
            ))}
          </ul>
        </div>
      ) : null}
    </div>
  );
};

const styles = {
  container: {
    maxWidth: '500px',
    margin: 'auto',
    padding: '1rem',
    backgroundColor: '#111',
    color: '#fff',
    fontFamily: 'Arial, sans-serif',
    borderRadius: '10px',
  },
  card: {
    marginTop: '1rem',
    padding: '1rem',
    border: '1px solid #444',
    borderRadius: '8px',
    backgroundColor: '#1e1e1e',
  },
  avatar: {
    width: '80px',
    height: '80px',
    borderRadius: '50%',
  },
  error: {
    color: 'red',
  },
};

export default LeetcodeProfile;
