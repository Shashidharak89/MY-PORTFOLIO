'use client';

const sections = [
  'Home', 'Projects', 'Skills', 'Achievements', 'Education', 'Contact'
];

export default function Sidebar() {
  return (
    <nav>
      <h2>Shashidhara</h2>
      <ul>
        {sections.map(section => (
          <li key={section}>
            <a href={`#${section.toLowerCase()}`}>
              {section}
            </a>
          </li>
        ))}
      </ul>
      <style jsx>{`
        nav {
          width: 12rem;
          min-height: 100vh;
          background: linear-gradient(to bottom, #1a1a2e 0%, #16213e 100%);
          padding: 1.5rem;
          position: fixed;
          top: 0;
          left: 0;
          box-shadow: 2px 0 8px rgba(0, 0, 0, 0.2);
          z-index: 10;
        }

        h2 {
          font-size: 1.75rem;
          font-weight: 700;
          color: #f8d68e;
          margin-bottom: 2rem;
          text-align: center;
          position: relative;
          letter-spacing: 1px;
          text-shadow: 0 0 5px rgba(248, 214, 142, 0.3);
          animation: fadeIn 0.8s ease-out;
        }

        h2::after {
          content: '';
          position: absolute;
          bottom: -8px;
          left: 50%;
          transform: translateX(-50%);
          width: 50px;
          height: 2px;
          background: #f4ce83;
          border-radius: 1px;
        }

        ul {
          list-style: none;
          padding: 0;
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }

        li {
          position: relative;
        }

        a {
          font-size: 1.1rem;
          color: #ffffff;
          text-decoration: none;
          display: block;
          padding: 0.5rem 1rem;
          border-radius: 8px;
          transition: color 0.3s ease, background 0.3s ease, transform 0.3s ease;
        }

        a:hover {
          color: #f8d68e;
          background: rgba(248, 214, 142, 0.1);
          transform: translateX(5px);
        }

        a::before {
          content: '';
          position: absolute;
          left: 0;
          top: 50%;
          transform: translateY(-50%);
          width: 4px;
          height: 0;
          background: #f4ce83;
          transition: height 0.3s ease;
        }

        a:hover::before {
          height: 100%;
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @media (max-width: 768px) {
          nav {
            width: 10rem;
            padding: 1rem;
          }

          h2 {
            font-size: 1.5rem;
          }

          a {
            font-size: 1rem;
            padding: 0.4rem 0.8rem;
          }
        }
      `}</style>
    </nav>
  );
}