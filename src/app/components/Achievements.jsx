export default function Achievements() {
  return (
    <section id="achievements">
      <h2>Achievements</h2>
      <ul>
        <li>HackerRank Certified in Python Programming</li>
        <li>Participated in inter-college coding events</li>
      </ul>
      <style jsx>{`
        #achievements {
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 4rem 2rem;
          background: linear-gradient(135deg, #f8d68e 0%, #f4ce83 100%);
          position: relative;
          overflow: hidden;
        }

        h2 {
          font-size: 3rem;
          font-weight: 600;
          color: #ffffff;
          margin-bottom: 2rem;
          text-align: center;
          position: relative;
          text-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
          animation: slideIn 0.8s ease-out;
        }

        h2::after {
          content: '';
          position: absolute;
          bottom: -8px;
          left: 50%;
          transform: translateX(-50%);
          width: 80px;
          height: 3px;
          background: #ffffff;
          border-radius: 2px;
          opacity: 0.8;
        }

        ul {
          list-style: none;
          padding: 0;
          max-width: 600px;
          width: 100%;
        }

        li {
          background: rgba(255, 255, 255, 0.9);
          border-radius: 10px;
          padding: 1.5rem;
          margin-bottom: 1rem;
          font-size: 1.2rem;
          color: #1a1a2e;
          position: relative;
          transition: transform 0.3s ease, box-shadow 0.3s ease;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
        }

        li:hover {
          transform: translateX(10px);
          box-shadow: 0 6px 16px rgba(0, 0, 0, 0.15);
        }

        li::before {
          content: '★';
          position: absolute;
          left: -30px;
          top: 50%;
          transform: translateY(-50%);
          color: #f8d68e;
          font-size: 1.5rem;
          opacity: 0.8;
        }

        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @media (max-width: 768px) {
          h2 {
            font-size: 2.25rem;
          }

          li {
            font-size: 1rem;
            padding: 1rem;
          }

          li::before {
            font-size: 1.2rem;
            left: -25px;
          }
        }
      `}</style>
    </section>
  );
}