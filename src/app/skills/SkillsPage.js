'use client'

import { useState, useEffect, useRef } from 'react'

export default function SkillsPage() {
  const [activeCategory, setActiveCategory] = useState('technical')
  const [visibleSkills, setVisibleSkills] = useState(new Set())
  const observerRef = useRef(null)
  const skillsRef = useRef(null)

  const skillCategories = {
    technical: {
      title: 'Technical Skills',
      icon: '💻',
      skills: [
        { name: 'JavaScript', level: 95, icon: '🟨' },
        { name: 'React/Next.js', level: 90, icon: '⚛️' },
        { name: 'TypeScript', level: 85, icon: '🔷' },
        { name: 'Node.js', level: 88, icon: '🟢' },
        { name: 'Python', level: 82, icon: '🐍' },
        { name: 'SQL', level: 78, icon: '🗄️' }
      ]
    },
    design: {
      title: 'Design & Creative',
      icon: '🎨',
      skills: [
        { name: 'UI/UX Design', level: 87, icon: '✨' },
        { name: 'Figma', level: 83, icon: '🔸' },
        { name: 'Adobe Creative Suite', level: 75, icon: '🎭' },
        { name: 'CSS Animations', level: 92, icon: '💫' },
        { name: 'Responsive Design', level: 94, icon: '📱' },
        { name: 'Prototyping', level: 80, icon: '🔧' }
      ]
    },
    tools: {
      title: 'Tools & Platforms',
      icon: '🛠️',
      skills: [
        { name: 'Git/GitHub', level: 89, icon: '📝' },
        { name: 'Docker', level: 76, icon: '🐳' },
        { name: 'AWS', level: 71, icon: '☁️' },
        { name: 'MongoDB', level: 84, icon: '🍃' },
        { name: 'GraphQL', level: 79, icon: '📊' },
        { name: 'REST APIs', level: 91, icon: '🔗' }
      ]
    }
  }

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisibleSkills(prev => new Set([...prev, entry.target.dataset.skill]))
          }
        })
      },
      { threshold: 0.3 }
    )

    observerRef.current = observer

    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (skillsRef.current && observerRef.current) {
      const skillElements = skillsRef.current.querySelectorAll('[data-skill]')
      skillElements.forEach(el => observerRef.current.observe(el))
    }
  }, [activeCategory])

  const SkillBar = ({ skill, index }) => {
    const isVisible = visibleSkills.has(skill.name)
    
    return (
      <div
        data-skill={skill.name}
        className={`transform transition-all duration-700 ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
        }`}
        style={{ transitionDelay: `${index * 100}ms` }}
      >
        <div className="group hover:scale-105 transition-transform duration-300 bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg hover:shadow-xl border border-blue-100">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              <span className="text-2xl group-hover:scale-110 transition-transform duration-300">
                {skill.icon}
              </span>
              <h3 className="text-lg font-semibold text-gray-800">{skill.name}</h3>
            </div>
            <span className="text-blue-600 font-bold text-lg">{skill.level}%</span>
          </div>
          
          <div className="relative h-3 bg-gray-200 rounded-full overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-200 to-blue-300 rounded-full"></div>
            <div
              className={`absolute top-0 left-0 h-full bg-gradient-to-r from-blue-500 to-blue-700 rounded-full transition-all duration-1000 ease-out ${
                isVisible ? 'animate-pulse' : ''
              }`}
              style={{
                width: isVisible ? `${skill.level}%` : '0%',
                transitionDelay: `${index * 150 + 300}ms`
              }}
            ></div>
          </div>
          
          {/* Floating particles effect */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-xl">
            {[...Array(3)].map((_, i) => (
              <div
                key={i}
                className={`absolute w-1 h-1 bg-blue-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
                style={{
                  left: `${20 + i * 30}%`,
                  top: `${30 + i * 20}%`,
                  animationDelay: `${i * 200}ms`
                }}
              ></div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-20 left-10 w-32 h-32 bg-blue-200/30 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute top-40 right-20 w-24 h-24 bg-blue-300/20 rounded-full blur-lg animate-bounce" style={{ animationDuration: '3s' }}></div>
        <div className="absolute bottom-32 left-1/4 w-20 h-20 bg-blue-400/25 rounded-full blur-md animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute bottom-20 right-1/3 w-28 h-28 bg-blue-300/20 rounded-full blur-xl animate-bounce" style={{ animationDuration: '4s', animationDelay: '2s' }}></div>
      </div>

      <div className="relative z-10 container mx-auto px-4 py-16">
        {/* Header Section */}
        <div className="text-center mb-16 animate-fade-in">
          <div className="inline-block p-4 bg-blue-600 rounded-full mb-6 animate-bounce">
            <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent mb-4">
            My Skills
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            A comprehensive overview of my technical expertise and creative abilities
          </p>
          
          {/* Animated underline */}
          <div className="mt-6 flex justify-center">
            <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-blue-700 rounded-full animate-pulse"></div>
          </div>
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap justify-center gap-4 mb-16">
          {Object.entries(skillCategories).map(([key, category]) => (
            <button
              key={key}
              onClick={() => {
                setActiveCategory(key)
                setVisibleSkills(new Set())
              }}
              className={`group flex items-center space-x-3 px-8 py-4 rounded-full transition-all duration-300 transform hover:scale-105 ${
                activeCategory === key
                  ? 'bg-blue-600 text-white shadow-lg scale-105'
                  : 'bg-white/80 text-gray-700 hover:bg-blue-50 shadow-md'
              }`}
            >
              <span className={`text-2xl transition-transform duration-300 ${
                activeCategory === key ? 'animate-bounce' : 'group-hover:scale-110'
              }`}>
                {category.icon}
              </span>
              <span className="font-semibold">{category.title}</span>
              
              {/* Active indicator */}
              {activeCategory === key && (
                <div className="w-2 h-2 bg-blue-200 rounded-full animate-pulse"></div>
              )}
            </button>
          ))}
        </div>

        {/* Skills Grid */}
        <div ref={skillsRef} className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {skillCategories[activeCategory].skills.map((skill, index) => (
              <SkillBar key={skill.name} skill={skill} index={index} />
            ))}
          </div>
        </div>

        {/* Stats Section */}
        <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          {[
            { number: '50+', label: 'Projects Completed', icon: '🚀' },
            { number: '3+', label: 'Years Experience', icon: '⏱️' },
            { number: '20+', label: 'Technologies Mastered', icon: '💡' }
          ].map((stat, index) => (
            <div
              key={index}
              className="text-center p-8 bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 border border-blue-100"
              style={{ animationDelay: `${index * 200}ms` }}
            >
              <div className="text-4xl mb-4 animate-bounce" style={{ animationDelay: `${index * 300}ms` }}>
                {stat.icon}
              </div>
              <div className="text-4xl font-bold text-blue-600 mb-2">{stat.number}</div>
              <div className="text-gray-600 font-medium">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-20">
          <div className="inline-flex items-center space-x-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white px-8 py-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 cursor-pointer group">
            <span className="font-semibold text-lg">Let's Work Together</span>
            <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fade-in {
          animation: fade-in 1s ease-out;
        }
      `}</style>
    </div>
  )
}