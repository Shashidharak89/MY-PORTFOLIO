'use client';


import Sidebar from './components/Sidebar';
import Home from './components/Home';
import Projects from './components/Projects';
import Skills from './components/Skills';
import Achievements from './components/Achievements';
import Education from './components/Education';
import Contact from './components/Contact';


export default function Page() {
  return (
    <div className="flex min-h-screen bg-gray-900 text-white">
      <Sidebar />
      <main className="flex-1 p-6 space-y-12 overflow-y-auto ml-48">
        <Home />
        <Projects />
        <Skills />
        <Achievements />
        <Education />
        <Contact />
      </main>
    </div>
  );
}
