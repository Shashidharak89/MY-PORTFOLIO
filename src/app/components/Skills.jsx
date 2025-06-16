export default function Skills() {
  const skills = ['HTML', 'CSS', 'JavaScript', 'React', 'Next.js', 'MongoDB', 'Node.js', 'Tailwind CSS'];

  return (
    <section id="skills">
      <h2 className="text-3xl font-semibold mb-4">Skills</h2>
      <div className="flex flex-wrap gap-4">
        {skills.map(skill => (
          <span key={skill} className="bg-purple-700 px-4 py-2 rounded-full">
            {skill}
          </span>
        ))}
      </div>
    </section>
  );
}
