'use client'

import React, { useState, useEffect } from 'react'

const ProjectsPage = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [scrollY, setScrollY] = useState(0)
  
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }
    
    const handleScroll = () => {
      setScrollY(window.scrollY)
    }
    
    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  const projects = [
    {
      id: 1,
      title: "AI Chat Assistant",
      description: "Advanced conversational AI platform with natural language processing and real-time responses",
      tech: ["React", "Node.js", "OpenAI API", "WebSocket"],
      status: "Live",
      year: "2024",
      color: "from-red-500 to-pink-500"
    },
    {
      id: 2,
      title: "Smart Analytics Dashboard",
      description: "Real-time data visualization platform with interactive charts and predictive analytics",
      tech: ["Next.js", "TypeScript", "D3.js", "PostgreSQL"],
      status: "In Progress",
      year: "2024",
      color: "from-blue-500 to-purple-500"
    },
    {
      id: 3,
      title: "E-commerce Platform",
      description: "Full-stack e-commerce solution with payment integration and inventory management",
      tech: ["React", "Express", "MongoDB", "Stripe"],
      status: "Live",
      year: "2023",
      color: "from-green-500 to-teal-500"
    },
    {
      id: 4,
      title: "Mobile Task Manager",
      description: "Cross-platform mobile app for team collaboration and project management",
      tech: ["React Native", "Firebase", "Redux", "Expo"],
      status: "Live",
      year: "2023",
      color: "from-orange-500 to-red-500"
    },
    {
      id: 5,
      title: "Blockchain Voting System",
      description: "Secure voting platform using blockchain technology for transparency and immutability",
      tech: ["Solidity", "Web3.js", "Ethereum", "IPFS"],
      status: "Prototype",
      year: "2024",
      color: "from-purple-500 to-indigo-500"
    }
  ]

  const imageUrl = "https://thumbs.dreamstime.com/b/conceptually-chatgpt-chat-gpt-ai-chatbot-artificial-intelligence-can-communicate-messages-humans-276811069.jpg"

  return (
    <>
      <style jsx>{`
        .pf-floating-orb-primary {
          position: absolute;
          top: -10%;
          left: -10%;
          width: 24rem;
          height: 24rem;
          background: radial-gradient(circle, rgba(220, 38, 38, 0.3) 0%, rgba(220, 38, 38, 0.1) 50%, transparent 100%);
          border-radius: 50%;
          filter: blur(40px);
          animation: pf-float-orb 20s ease-in-out infinite;
          pointer-events: none;
        }
        
        .pf-floating-orb-secondary {
          position: absolute;
          bottom: -10%;
          right: -10%;
          width: 20rem;
          height: 20rem;
          background: radial-gradient(circle, rgba(185, 28, 28, 0.2) 0%, rgba(185, 28, 28, 0.1) 50%, transparent 100%);
          border-radius: 50%;
          filter: blur(30px);
          animation: pf-float-orb 25s ease-in-out infinite reverse;
          pointer-events: none;
        }
        
        @keyframes pf-float-orb {
          0%, 100% { 
            transform: translateY(0px) rotate(0deg) scale(1); 
          }
          33% { 
            transform: translateY(-30px) rotate(120deg) scale(1.1); 
          }
          66% { 
            transform: translateY(20px) rotate(240deg) scale(0.9); 
          }
        }
        
        .pf-gradient-text {
          background: linear-gradient(135deg, #dc2626 0%, #b91c1c 50%, #dc2626 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          background-size: 200% 200%;
          animation: pf-gradient-shift 4s ease-in-out infinite;
          position: relative;
        }
        
        .pf-gradient-text::after {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, #dc2626, #b91c1c);
          filter: blur(20px);
          opacity: 0.3;
          z-index: -1;
          animation: pf-glow-pulse 2s ease-in-out infinite alternate;
        }
        
        @keyframes pf-gradient-shift {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        
        @keyframes pf-glow-pulse {
          0% { opacity: 0.2; transform: scale(0.95); }
          100% { opacity: 0.4; transform: scale(1.05); }
        }
        
        .pf-project-card {
          background: rgba(255, 255, 255, 0.9);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 255, 255, 0.3);
          border-radius: 1.5rem;
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
          transition: all 0.7s cubic-bezier(0.4, 0, 0.2, 1);
          transform: translateY(50px);
          opacity: 0;
          animation: pf-slide-up 0.8s ease-out forwards;
          position: relative;
          overflow: hidden;
        }
        
        .pf-project-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
          transition: left 0.7s;
        }
        
        .pf-project-card:hover::before {
          left: 100%;
        }
        
        .pf-project-card:hover {
          transform: translateY(-12px);
          box-shadow: 0 25px 50px rgba(220, 38, 38, 0.2);
          border-color: rgba(220, 38, 38, 0.3);
        }
        
        @keyframes pf-slide-up {
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }
        
        .pf-slide-in-left {
          animation: pf-slide-in-left 0.8s ease-out forwards;
        }
        
        .pf-slide-in-right {
          animation: pf-slide-in-right 0.8s ease-out forwards;
        }
        
        @keyframes pf-slide-in-left {
          from {
            transform: translateX(-100px) translateY(50px) rotate(-2deg);
            opacity: 0;
          }
          to {
            transform: translateX(0) translateY(0) rotate(0deg);
            opacity: 1;
          }
        }
        
        @keyframes pf-slide-in-right {
          from {
            transform: translateX(100px) translateY(50px) rotate(2deg);
            opacity: 0;
          }
          to {
            transform: translateX(0) translateY(0) rotate(0deg);
            opacity: 1;
          }
        }
        
        .pf-image-gallery {
          position: relative;
          height: 100%;
          border-radius: 1rem;
          overflow: hidden;
          background: linear-gradient(45deg, #f3f4f6, #e5e7eb);
        }
        
        .pf-image-slider {
          height: 100%;
          display: flex;
          transition: transform 0.6s ease-in-out;
          animation: pf-auto-slide 12s linear infinite paused;
        }
        
        .pf-project-card:hover .pf-image-slider {
          animation-play-state: running;
        }
        
        .pf-image-slide {
          min-width: 100%;
          height: 100%;
          background-size: cover;
          background-position: center;
          position: relative;
        }
        
        .pf-image-slide::after {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(45deg, 
            rgba(220, 38, 38, 0.1) 0%, 
            transparent 30%, 
            transparent 70%, 
            rgba(185, 28, 28, 0.1) 100%);
          opacity: 0;
          transition: opacity 0.3s;
        }
        
        .pf-project-card:hover .pf-image-slide::after {
          opacity: 1;
        }
        
        @keyframes pf-auto-slide {
          0% { transform: translateX(0); }
          20% { transform: translateX(0); }
          25% { transform: translateX(-100%); }
          45% { transform: translateX(-100%); }
          50% { transform: translateX(-200%); }
          70% { transform: translateX(-200%); }
          75% { transform: translateX(-300%); }
          95% { transform: translateX(-300%); }
          100% { transform: translateX(0); }
        }
        
        .pf-tech-tag {
          background: rgba(107, 114, 128, 0.1);
          color: #374151;
          padding: 0.5rem 1rem;
          border-radius: 9999px;
          font-size: 0.875rem;
          font-weight: 500;
          transition: all 0.3s ease;
          border: 1px solid transparent;
        }
        
        .pf-tech-tag:hover {
          background: rgba(220, 38, 38, 0.1);
          color: #dc2626;
          border-color: rgba(220, 38, 38, 0.3);
          transform: translateY(-2px);
        }
        
        .pf-status-badge {
          padding: 0.25rem 0.75rem;
          border-radius: 9999px;
          font-size: 0.75rem;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          position: relative;
          overflow: hidden;
        }
        
        .pf-status-live {
          background: rgba(34, 197, 94, 0.1);
          color: #059669;
          border: 1px solid rgba(34, 197, 94, 0.3);
        }
        
        .pf-status-progress {
          background: rgba(245, 158, 11, 0.1);
          color: #d97706;
          border: 1px solid rgba(245, 158, 11, 0.3);
        }
        
        .pf-status-prototype {
          background: rgba(59, 130, 246, 0.1);
          color: #2563eb;
          border: 1px solid rgba(59, 130, 246, 0.3);
        }
        
        .pf-button-primary {
          background: linear-gradient(135deg, #dc2626, #b91c1c);
          color: white;
          padding: 0.75rem 1.5rem;
          border-radius: 9999px;
          font-weight: 600;
          transition: all 0.3s ease;
          border: none;
          cursor: pointer;
          position: relative;
          overflow: hidden;
        }
        
        .pf-button-primary::before {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, #b91c1c, #dc2626);
          opacity: 0;
          transition: opacity 0.3s;
        }
        
        .pf-button-primary:hover::before {
          opacity: 1;
        }
        
        .pf-button-primary:hover {
          transform: translateY(-2px);
          box-shadow: 0 10px 25px rgba(220, 38, 38, 0.4);
        }
        
        .pf-button-secondary {
          background: transparent;
          color: #dc2626;
          padding: 0.75rem 1.5rem;
          border: 2px solid #dc2626;
          border-radius: 9999px;
          font-weight: 600;
          transition: all 0.3s ease;
          cursor: pointer;
          position: relative;
          overflow: hidden;
        }
        
        .pf-button-secondary::before {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, #dc2626, #b91c1c);
          transform: translateY(100%);
          transition: transform 0.3s ease;
        }
        
        .pf-button-secondary:hover::before {
          transform: translateY(0);
        }
        
        .pf-button-secondary:hover {
          color: white;
          transform: translateY(-2px);
          box-shadow: 0 10px 25px rgba(220, 38, 38, 0.3);
        }
        
        .pf-parallax-bg {
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, 
            rgba(255, 255, 255, 1) 0%,
            rgba(250, 250, 250, 1) 50%,
            rgba(255, 255, 255, 1) 100%);
          overflow: hidden;
        }
        
        .pf-geometric-shape {
          position: absolute;
          opacity: 0.05;
          pointer-events: none;
        }
        
        .pf-shape-1 {
          top: 10%;
          right: 5%;
          width: 100px;
          height: 100px;
          background: #dc2626;
          clip-path: polygon(50% 0%, 0% 100%, 100% 100%);
          animation: pf-rotate-slow 30s linear infinite;
        }
        
        .pf-shape-2 {
          bottom: 20%;
          left: 8%;
          width: 80px;
          height: 80px;
          background: #b91c1c;
          border-radius: 50%;
          animation: pf-float-gentle 20s ease-in-out infinite;
        }
        
        .pf-shape-3 {
          top: 60%;
          right: 15%;
          width: 60px;
          height: 60px;
          background: #dc2626;
          transform: rotate(45deg);
          animation: pf-pulse-slow 15s ease-in-out infinite;
        }
        
        @keyframes pf-rotate-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        
        @keyframes pf-float-gentle {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        
        @keyframes pf-pulse-slow {
          0%, 100% { transform: rotate(45deg) scale(1); }
          50% { transform: rotate(45deg) scale(1.2); }
        }
        
        .pf-cursor-glow {
          position: fixed;
          pointer-events: none;
          width: 20px;
          height: 20px;
          background: radial-gradient(circle, rgba(220, 38, 38, 0.6) 0%, transparent 70%);
          border-radius: 50%;
          filter: blur(10px);
          z-index: 9999;
          transition: transform 0.1s ease;
        }
        
        .pf-number-badge {
          background: linear-gradient(135deg, #dc2626, #b91c1c);
          color: white;
          width: 3rem;
          height: 3rem;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 800;
          font-size: 1.25rem;
          position: relative;
          box-shadow: 0 4px 15px rgba(220, 38, 38, 0.3);
        }
        
        .pf-number-badge::after {
          content: '';
          position: absolute;
          inset: -2px;
          background: conic-gradient(from 0deg, #dc2626, #b91c1c, #dc2626);
          border-radius: 50%;
          z-index: -1;
          animation: pf-rotate-border 3s linear infinite;
        }
        
        @keyframes pf-rotate-border {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        
        .pf-cta-card {
          background: rgba(255, 255, 255, 0.95);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 255, 255, 0.3);
          border-radius: 1.5rem;
          padding: 2rem;
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
          transition: all 0.5s ease;
          position: relative;
          overflow: hidden;
        }
        
        .pf-cta-card::before {
          content: '';
          position: absolute;
          top: -50%;
          left: -50%;
          width: 200%;
          height: 200%;
          background: conic-gradient(
            transparent,
            rgba(220, 38, 38, 0.1),
            transparent,
            rgba(185, 28, 28, 0.1),
            transparent
          );
          animation: pf-rotate-slow 20s linear infinite;
          opacity: 0;
          transition: opacity 0.3s;
        }
        
        .pf-cta-card:hover::before {
          opacity: 1;
        }
        
        .pf-cta-card:hover {
          transform: translateY(-8px) scale(1.02);
          box-shadow: 0 20px 40px rgba(220, 38, 38, 0.15);
        }
        
        @media (max-width: 1024px) {
          .pf-image-gallery {
            height: 200px;
          }
          
          .pf-floating-orb-primary,
          .pf-floating-orb-secondary {
            display: none;
          }
        }
        
        @media (max-width: 768px) {
          .pf-project-card {
            margin: 1rem 0;
          }
          
          .pf-slide-in-left,
          .pf-slide-in-right {
            animation: pf-slide-up 0.8s ease-out forwards;
          }
        }
      `}</style>
      
      <div className="min-h-screen relative overflow-hidden">
        {/* Animated Background */}
        <div className="pf-parallax-bg">
          <div 
            className="pf-floating-orb-primary"
            style={{
              transform: `translate(${mousePosition.x * 0.02}px, ${mousePosition.y * 0.02 - scrollY * 0.5}px)`
            }}
          />
          <div 
            className="pf-floating-orb-secondary"
            style={{
              transform: `translate(${mousePosition.x * -0.015}px, ${mousePosition.y * -0.015 - scrollY * 0.3}px)`
            }}
          />
          
          {/* Geometric Shapes */}
          <div className="pf-geometric-shape pf-shape-1" />
          <div className="pf-geometric-shape pf-shape-2" />
          <div className="pf-geometric-shape pf-shape-3" />
        </div>

        {/* Custom Cursor Glow */}
        <div 
          className="pf-cursor-glow"
          style={{
            left: mousePosition.x - 10,
            top: mousePosition.y - 10,
          }}
        />

        <div className="relative z-10 container mx-auto px-6 py-16">
          {/* Header Section */}
          <div className="text-center mb-20">
            <div className="inline-block">
              <h1 className="text-6xl md:text-7xl font-bold mb-4 pf-gradient-text">
                My Projects
              </h1>
              <div className="w-32 h-1 bg-gradient-to-r from-red-600 to-red-700 mx-auto rounded-full relative">
                <div className="absolute inset-0 bg-gradient-to-r from-red-600 to-red-700 rounded-full animate-pulse"></div>
              </div>
            </div>
            <p className="text-xl text-gray-600 mt-8 max-w-2xl mx-auto leading-relaxed">
              Crafting digital experiences that merge innovation with elegant design
            </p>
          </div>

          {/* Projects Grid */}
          <div className="max-w-6xl mx-auto space-y-8">
            {projects.map((project, index) => (
              <div
                key={project.id}
                className={`pf-project-card group ${
                  index % 2 === 0 ? 'pf-slide-in-left' : 'pf-slide-in-right'
                }`}
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                {/* Project Content */}
                <div className="flex flex-col lg:flex-row relative z-10">
                  {/* Text Content */}
                  <div className="lg:w-2/3 p-8 lg:p-12">
                    <div className="flex items-center space-x-6 mb-6">
                      <div className="pf-number-badge">
                        {String(project.id).padStart(2, '0')}
                      </div>
                      <div className="flex-1">
                        <h3 className="text-2xl lg:text-3xl font-bold text-gray-800 mb-3">
                          {project.title}
                        </h3>
                        <div className="flex items-center space-x-4">
                          <span className={`pf-status-badge ${
                            project.status === 'Live' 
                              ? 'pf-status-live' 
                              : project.status === 'In Progress'
                              ? 'pf-status-progress'
                              : 'pf-status-prototype'
                          }`}>
                            {project.status}
                          </span>
                          <span className="text-gray-500 text-sm font-medium">{project.year}</span>
                        </div>
                      </div>
                    </div>
                    
                    <p className="text-gray-600 text-lg mb-8 leading-relaxed">
                      {project.description}
                    </p>
                    
                    <div className="flex flex-wrap gap-3 mb-8">
                      {project.tech.map((tech, techIndex) => (
                        <span
                          key={techIndex}
                          className="pf-tech-tag"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                    
                    <div className="flex flex-wrap gap-4">
                      <button className="pf-button-primary">
                        <span className="relative z-10">View Project</span>
                      </button>
                      <button className="pf-button-secondary">
                        <span className="relative z-10">Source Code</span>
                      </button>
                    </div>
                  </div>

                  {/* Image Gallery */}
                  <div className="lg:w-1/3 relative h-64 lg:h-auto">
                    <div className="absolute inset-4 pf-image-gallery">
                      <div className="pf-image-slider">
                        {[1, 2, 3, 4].map((_, imgIndex) => (
                          <div
                            key={imgIndex}
                            className="pf-image-slide"
                            style={{
                              backgroundImage: `url(${imageUrl})`,
                              backgroundSize: 'cover',
                              backgroundPosition: 'center'
                            }}
                          />
                        ))}
                      </div>
                      
                      {/* Hover Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-br from-red-600/90 to-red-700/90 opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-center justify-center rounded-xl">
                        <div className="text-center text-white transform scale-75 group-hover:scale-100 transition-transform duration-500">
                          <p className="font-semibold text-lg">View Gallery</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Call to Action */}
          <div className="text-center mt-20">
            <div className="inline-block pf-cta-card">
              <div className="relative z-10">
                <h3 className="text-3xl font-bold text-gray-800 mb-4">
                  Ready to work together?
                </h3>
                <p className="text-gray-600 text-lg mb-6">
                  Let's create something amazing together
                </p>
                <button className="pf-button-primary text-lg px-8 py-4">
                  <span className="relative z-10">Get In Touch</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default ProjectsPage