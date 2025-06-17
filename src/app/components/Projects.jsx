import ProjectCard from './ProjectCard';

export default function Projects() {
  const projects = [
    {
      title: 'Project One',
      description: 'A web app built with Next.js and Tailwind CSS',
      link: '#',
    },
    {
      title: 'Project Two',
      description: 'An e-commerce platform with payment integration',
      link: '#',
    },
    {
      title: 'Project Three',
      description: 'A portfolio website with modern UI',
      link: '#',
    },
  ];

  return (
    <section id="projects" className="projects">
      <h2>My Projects</h2>
      <div className="project-grid">
        {projects.map((project, index) => (
          <ProjectCard
            key={index}
            title={project.title}
            description={project.description}
            link={project.link}
          />
        ))}
      </div>
    </section>
  );
}