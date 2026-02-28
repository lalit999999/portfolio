import {
  Github,
  Linkedin,
  Twitter,
  Instagram,
  Code2,
  Database,
  Server,
  Layout,
  Terminal,
  Cpu,
  FileCode2,
} from "lucide-react";

export const portfolioData = {
  personalInfo: {
    name: "Lalit Gurjar",
    tagline: "Full Stack Developer | UI/UX Enthusiast ",
    description:
      "Hi! I’m Lalit, a Student in NIT Patna. I have a passion for building web applications and love Reading articles and books. My approach combines technical expertise with creative problem-solving to deliver exceptional results.",
    image:
      "https://res.cloudinary.com/dsmyka9cr/image/upload/v1770302058/My%20Brand/p_photho_zbnwwh.jpg",
    resumeLink:
      "https://res.cloudinary.com/dsmyka9cr/image/upload/v1772289982/lalit_resume_wwbyyj.pdf",
  },
  education: [
    {
      id: 1,
      title: "B.Tech in Computer Science",
      institution: "NIT Patna",
      year: "2024 - present",
    },
    {
      id: 2,
      title: "Higher Secondary (12th)",
      institution: "MHBGSSS patodi",
      board: "RBSE",
      year: "2023",
    },
  ],
  // languages
  // Java
  // Python
  // C++
  // C
  // JavaScript
  // Frontend
  // React
  // Html5
  // CSS
  // Backend
  // Node.js
  // Python
  // Database
  // Oracle
  // MySQL
  // MongoDB
  skills: [
    {
      category: "Frontend",
      items: [
        { name: "React", icon: Code2 },
        { name: "HTML5", icon: Layout },
        { name: "Tailwind CSS", icon: Layout },
        { name: "Vite", icon: Code2 },
      ],
    },
    {
      category: "language",
      items: [
        { name: "C++", icon: Code2 },
        { name: "Java", icon: Layout },
        { name: "Python", icon: Layout },
        { name: "JavaScript", icon: FileCode2 },
        { name: "C", icon: FileCode2 },
      ],
    },
    {
      category: "Backend",
      items: [
        { name: "Node.js", icon: Server },
        { name: "Express", icon: Server },
        // { name: "Python", icon: Terminal },
      ],
    },
    {
      category: "Database",
      items: [
        { name: "MongoDB", icon: Database },
        { name: "MySQL", icon: Database },
        { name: "Oracle", icon: Database },
      ],
    },
    {
      category: "Tools",
      items: [
        { name: "Git/Github", icon: Terminal },
        { name: "VScode", icon: Terminal },
        // { name: "Docker", icon: Cpu },
      ],
    },
  ],
  learning: {
    technologies: ["Next.js 14", "System Design"],
    note: "Currently deep diving into distributed systems and high-performance computing.",
  },
  projects: [
    {
      id: 1,
      title: "MiniYouTube Backend",
      description:
        "Developed a RESTful backend system for a Mini YouTube–like video sharing platform to manage users,videos, and authentication",
      tech: [
        "Node.js",
        "Express.js",
        "MongoDB",
        "JWT",
        "bcrypt",
        "Multer",
        "Cloudinary",
      ],
      //
      github: "https://github.com/lalit999999/miniyoutube_backend",
    },
    {
      id: 2,
      title: "EduShare (Frontend Project)",
      description:
        "Developed a responsive front-end web application for an educational platform aimed at supporting the student community. The project was built using React for creating dynamic user interfaces and Vite as the fast build tool for optimized development and performance.",
      tech: ["React", "Vite", "JavaScript", "HTML5", "CSS3", "ESLint"],
      github: "https://github.com/lalit999999/Edushare-",
    },
  ],
  socials: [
    { name: "GitHub", url: "https://github.com/lalit999999", icon: Github },
    {
      name: "LinkedIn",
      url: "https://www.linkedin.com/in/lalitgujar/",
      icon: Linkedin,
    },
    { name: "Twitter", url: "https://x.com/lalit7363", icon: Twitter },
    {
      name: "Instagram",
      url: "https://www.instagram.com/joker_style_l",
      icon: Instagram,
    },
  ],
};
