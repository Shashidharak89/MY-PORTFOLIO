'use client';

const sections = [
  'Home', 'Projects', 'Skills', 'Achievements', 'Education', 'Contact'
];

export default function Sidebar() {
  return (
    <nav className="w-48 min-h-screen bg-gray-800 p-4 fixed">
      <h2 className="text-2xl font-bold mb-6">Shashidhara</h2>
      <ul className="space-y-4">
        {sections.map(section => (
          <li key={section}>
            <a
              href={`#${section.toLowerCase()}`}
              className="hover:text-yellow-400 transition-all duration-200"
            >
              {section}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
