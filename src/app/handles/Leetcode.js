// src/components/Leetcode.js
"use client";

import React, { useEffect, useState } from "react";
import "./styles/Leetcode.css";

const Leetcode = () => {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await fetch("https://leetcode-stats-api.vercel.app/shashidhara_k99");
        const data = await res.json();
        setStats([
          { difficulty: "Easy", count: data.easySolved },
          { difficulty: "Medium", count: data.mediumSolved },
          { difficulty: "Hard", count: data.hardSolved },
          { difficulty: "All", count: data.totalSolved },
        ]);
      } catch (err) {
        console.error("Error fetching LeetCode data:", err);
      }
    };

    fetchStats();
  }, []);

  return (
    <div className="leetcode-container">
      <h2 className="leetcode-title">LeetCode Stats</h2>
      {stats ? (
        <div className="leetcode-stats">
          {stats.map((item) => (
            <div key={item.difficulty} className={`leetcode-card ${item.difficulty.toLowerCase()}`}>
              <h3>{item.difficulty}</h3>
              <p>{item.count} Problems Solved</p>
            </div>
          ))}
        </div>
      ) : (
        <p className="leetcode-loading">Loading stats...</p>
      )}
    </div>
  );
};

export default Leetcode;