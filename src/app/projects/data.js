// data.js

export const commonSlides = [
  {
    type: 'image',
    src: 'https://res.cloudinary.com/dsojdpkgh/image/upload/v1743850448/bca2025_profiles/mtx0ziwcusmcxxobpip1.jpg',
    alt: 'Slide 1',
  },
  {
    type: 'image',
    src: 'https://aimst.edu.my/wp-content/uploads/2023/04/artificial-intelligence-new-technology-science-futuristic-abstract-human-brain-ai-technology-cpu-central-processor-unit-chipset-big-data-machine-learning-cyber-mind-domination-generative-ai.jpg',
    alt: 'Slide 2',
  },
  {
    type: 'image',
    src: 'https://aimst.edu.my/wp-content/uploads/2023/04/artificial-intelligence-new-technology-science-futuristic-abstract-human-brain-ai-technology-cpu-central-processor-unit-chipset-big-data-machine-learning-cyber-mind-domination-generative-ai.jpg',
    alt: 'Slide 3',
  },
  {
    type: 'video',
    thumbnail: 'https://img.youtube.com/vi/ECFNE4gCT7s/maxresdefault.jpg',
    videoSrc: 'https://www.youtube.com/embed/ECFNE4gCT7s?autoplay=1&rel=0',
    title: 'YouTube Video',
  },
];

export const commonSlides1 = [
  {
    type: 'image',
    src: 'https://res.cloudinary.com/dsojdpkgh/image/upload/v1740932445/team_photos/ojavhm6mj8jdjnjvm6ub.jpg',
    alt: 'Slide 1',
  },
  {
    type: 'image',
    src: 'https://aimst.edu.my/wp-content/uploads/2023/04/artificial-intelligence-new-technology-science-futuristic-abstract-human-brain-ai-technology-cpu-central-processor-unit-chipset-big-data-machine-learning-cyber-mind-domination-generative-ai.jpg',
    alt: 'Slide 2',
  },
  {
    type: 'image',
    src: 'https://aimst.edu.my/wp-content/uploads/2023/04/artificial-intelligence-new-technology-science-futuristic-abstract-human-brain-ai-technology-cpu-central-processor-unit-chipset-big-data-machine-learning-cyber-mind-domination-generative-ai.jpg',
    alt: 'Slide 3',
  },
  {
    type: 'video',
    thumbnail: 'https://img.youtube.com/vi/ECFNE4gCT7s/maxresdefault.jpg',
    videoSrc: 'https://www.youtube.com/embed/ECFNE4gCT7s?autoplay=1&rel=0',
    title: 'YouTube Video',
  },
];

export const projects = [
  {
    id: 1,
    title: 'Gamenexplay',
    description: 'GameNexPlay.live is an interactive browser-based gaming platform I developed, offering users a seamless experience to play a variety of online games without any installation. The website features engaging tournaments, reward-based gameplay, and a user-friendly interface, making it an exciting destination for casual and competitive gamers alike.',
    technologies: ['React', 'Node.js', 'MongoDB'],
    liveLink: 'https://gamenexplay.live',
    githubLink: 'https://github.com/example',
    slides: commonSlides,
  },
  {
    id: 2,
    title: 'Task Management App',
    description: 'An intuitive task management application with real-time collaboration features. Built with modern frameworks and includes drag-and-drop functionality, team collaboration tools, and advanced analytics dashboard.',
    technologies: ['Next.js', 'TypeScript', 'PostgreSQL', 'Socket.io'],
    liveLink: 'https://example.com',
    githubLink: 'https://github.com/example',
    slides: commonSlides1,
  },
  {
    id: 3,
    title: 'AI Chat Assistant',
    description: 'An intelligent chat assistant powered by advanced AI models. Features natural language processing, context awareness, and seamless integration with multiple platforms for enhanced user interaction.',
    technologies: ['Python', 'FastAPI', 'React', 'OpenAI API'],
    liveLink: 'https://example.com',
    githubLink: 'https://github.com/example',
    slides: commonSlides,
  },
  {
    id: 4,
    title: 'Portfolio Dashboard',
    description: 'A comprehensive dashboard for managing and showcasing creative portfolios. Includes analytics, project management, client communication tools, and customizable themes for different industries.',
    technologies: ['Vue.js', 'Express', 'MySQL', 'Chart.js'],
    liveLink: 'https://example.com',
    githubLink: 'https://github.com/example',
    slides: commonSlides,
  },
  {
    id: 5,
    title: 'E-Commerce Store',
    description: 'A modern e-commerce web app with product browsing, cart, and checkout flow. Features payment integration, order history, and responsive design for mobile and desktop.',
    technologies: ['Next.js', 'Stripe', 'MongoDB', 'TailwindCSS'],
    liveLink: 'https://example-ecommerce.com',
    githubLink: 'https://github.com/example/ecommerce',
    slides: [
      {
        type: 'image',
        src: 'https://via.placeholder.com/400x200.png?text=Ecommerce+1',
        alt: 'Ecommerce Screenshot 1',
      },
      {
        type: 'image',
        src: 'https://via.placeholder.com/400x200.png?text=Ecommerce+2',
        alt: 'Ecommerce Screenshot 2',
      },
      {
        type: 'video',
        thumbnail: 'https://img.youtube.com/vi/abcd1234/maxresdefault.jpg',
        videoSrc: 'https://www.youtube.com/embed/abcd1234?autoplay=1&rel=0',
        title: 'Demo Video',
      },
    ],
  },
  {
    id: 6,
    title: 'Blog Platform',
    description: 'A feature-rich blogging platform where users can create accounts, write posts, comment, and follow authors. Includes a rich text editor, SEO optimization, and dark mode support.',
    technologies: ['Next.js', 'Prisma', 'PostgreSQL', 'TailwindCSS'],
    liveLink: 'https://example-blog.com',
    githubLink: 'https://github.com/example/blog-platform',
    slides: [
      {
        type: 'image',
        src: 'https://via.placeholder.com/400x200.png?text=Blog+Home',
        alt: 'Blog Home Screenshot',
      },
      {
        type: 'image',
        src: 'https://via.placeholder.com/400x200.png?text=Blog+Post',
        alt: 'Blog Post Screenshot',
      },
    ],
  },
];
