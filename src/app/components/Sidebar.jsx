import React from 'react';
import './styles/Sidebar.css';

const Sidebar = ({ isOpen, toggleSidebar }) => {
  return (
    <div className={`pastel-sidebar ${isOpen ? 'open' : ''}`}>
      <div className="sidebar-close" onClick={toggleSidebar}>×</div>
      <a href="#home" onClick={toggleSidebar}>Home</a>
      <a href="#about" onClick={toggleSidebar}>About</a>
      <a href="#projects" onClick={toggleSidebar}>Projects</a>
      <a href="#skills" onClick={toggleSidebar}>Skills</a>
      <a href="#resume" onClick={toggleSidebar}>Resume</a>
      <a href="#contact" onClick={toggleSidebar}>Contact</a>
    </div>
  );
};

export default Sidebar;
