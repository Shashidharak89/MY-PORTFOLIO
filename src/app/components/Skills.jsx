export default function Skills() {
  const skills = ['HTML', 'CSS', 'JavaScript', 'React', 'Next.js', 'MongoDB', 'Node.js', 'Tailwind CSS'];

  return (
    <section id="skills" style={{ padding: '2rem', backgroundColor: '#f8d68e' }}>
      <h2 style={{ fontSize: '2rem', fontWeight: '600', marginBottom: '1rem', color: '#fff' }}>
        Skills
      </h2>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
        {skills.map(skill => (
          <span
            key={skill}
            style={{
              backgroundColor: '#f4ce83',
              color: '#fff',
              padding: '0.5rem 1rem',
              borderRadius: '9999px',
              fontSize: '1rem',
            }}
          >
            {skill}
          </span>
        ))}
      </div>
    </section>
  );
}