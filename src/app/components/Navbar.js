'use client';
import React, { useState } from 'react';
import Sidebar from './Sidebar';
import './styles/Navbar.css';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <nav className="pastel-navbar">
        <div className="pastel-navbar-logo">MyPortfolio</div>
        <div className="pastel-navbar-links">
          <a href="#home">Home</a>
          <a href="#about">About</a>
          <a href="#projects">Projects</a>
          <a href="#skills">Skills</a>
          <a href="#resume">Resume</a>
          <a href="#contact">Contact</a>
        </div>
        <div className="pastel-navbar-toggle" onClick={() => setIsOpen(!isOpen)}>☰</div>
      </nav>
      <Sidebar isOpen={isOpen} toggleSidebar={() => setIsOpen(false)} />
    </>
  );
};

export default Navbar;
