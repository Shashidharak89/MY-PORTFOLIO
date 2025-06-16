export default function Projects() {
  return (
    <section id="projects">
      <h2 className="text-3xl font-semibold mb-4">Projects</h2>
      <ul className="space-y-4">
        <li className="bg-gray-800 p-4 rounded-xl">
          <h3 className="text-xl font-bold">GameNexPlay</h3>
          <p>Online gaming platform with React + Node.js + MongoDB stack.</p>
        </li>
        <li className="bg-gray-800 p-4 rounded-xl">
          <h3 className="text-xl font-bold">Portfolio Website</h3>
          <p>Personal portfolio built with HTML, now migrated to React and Next.js.</p>
        </li>
      </ul>
    </section>
  );
}
