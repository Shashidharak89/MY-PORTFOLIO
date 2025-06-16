// src/app/page.js
'use client';

import Sidebar from './components/Sidebar';
import Home from './components/Home';
import Projects from './components/Projects';
import Skills from './components/Skills';
import Education from './components/Education';
import Achievements from './components/Achievements';
import Contact from './components/Contact';
import './components/styles.css';

export default function Page() {
  return (
    <div className="app-container">
      <Sidebar />
      <main className="main-content">
        <Home />
        <Projects />
        <Skills />
        <Education />
        <Achievements />
        <Contact />
      </main>
    </div>
  );
}
