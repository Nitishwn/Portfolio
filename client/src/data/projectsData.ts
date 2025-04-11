export interface Project {
  title: string;
  description: string;
  image: string;
  technologies: string[];
  demoLink: string;
  codeLink: string;
}

export const projectsData: Project[] = [
  {
    title: "E-commerce Platform",
    description: "A full-featured online store with payment integration, inventory management, and an intuitive admin dashboard.",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80",
    technologies: ["React", "Node.js", "MongoDB", "Stripe"],
    demoLink: "#",
    codeLink: "#"
  },
  {
    title: "Task Management App",
    description: "A productivity application that helps teams organize tasks, track progress, and meet deadlines effectively.",
    image: "https://images.unsplash.com/photo-1499951360447-b19be8fe80f5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80",
    technologies: ["Vue.js", "Firebase", "Tailwind CSS"],
    demoLink: "#",
    codeLink: "#"
  },
  {
    title: "Fitness Tracking App",
    description: "An application that allows users to track workouts, set fitness goals, and monitor progress over time.",
    image: "https://images.unsplash.com/photo-1624953587687-daf255b6b80a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80",
    technologies: ["React Native", "Express", "PostgreSQL"],
    demoLink: "#",
    codeLink: "#"
  },
  {
    title: "Weather Dashboard",
    description: "An interactive weather application with real-time data, forecasts, and location-based services.",
    image: "https://images.unsplash.com/photo-1588681664899-f142ff2dc9b1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80",
    technologies: ["JavaScript", "CSS3", "Weather API"],
    demoLink: "#",
    codeLink: "#"
  },
  {
    title: "Real Estate Platform",
    description: "A comprehensive platform for property listings, virtual tours, and connecting buyers with agents.",
    image: "https://images.unsplash.com/photo-1577563908411-5077b6dc7624?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80",
    technologies: ["Next.js", "Strapi CMS", "Mapbox"],
    demoLink: "#",
    codeLink: "#"
  },
  {
    title: "Blogging Platform",
    description: "A feature-rich blogging application with markdown support, comments, and analytics dashboard.",
    image: "https://images.unsplash.com/photo-1590935217802-a3bfd2a31349?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80",
    technologies: ["Angular", "Django", "AWS"],
    demoLink: "#",
    codeLink: "#"
  }
];
