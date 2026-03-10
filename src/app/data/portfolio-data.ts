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
  Hash,
  Wifi,
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
      "https://res.cloudinary.com/dsmyka9cr/image/upload/v1773147070/NIT_Patna_Resume_Template_v2_1-1_rgveom.pdf",
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
      category: "Backend & API",
      items: [
        { name: "Node.js", icon: Server },
        { name: "Express", icon: Server },
        { name: "Postman", icon: Server },
        { name: "REST API", icon: Server },
        // Postman ,REST api
        // { name: "Python", icon: Terminal },
      ],
    },
    {
      category: "Database",
      items: [
        { name: "MongoDB", icon: Database },
        { name: "MySQL", icon: Database },
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
      live: "https://github.com/lalit999999/miniyoutube_backend",
    },
    {
      id: 2,
      title: "EduShare (Frontend Project)",
      description:
        "Developed a responsive front-end web application for an educational platform aimed at supporting the student community. The project was built using React for creating dynamic user interfaces and Vite as the fast build tool for optimized development and performance.",
      tech: ["React", "Vite", "JavaScript", "HTML5", "CSS3", "ESLint"],
      github: "https://github.com/lalit999999/Edushare-",
      live: "https://edushare.mewithblender.shop/",
    },
    {
      id: 2,
      title: "Local Service Booking Platform (Full stack application)",
      description:
        "Built a MERN-based service marketplace platform with RESTful APIs for services, bookings, categories,and reviews.Implemented JWT authentication and role-based authorization for Customer, Provider, and Admin access ,Designed a booking lifecycle system (Requested → Confirmed → In-progress → Completed → Cancelled).Structured MongoDB schemas using Mongoose for scalable data management and CRUD operations.Integrated image uploads using Multer and Cloudinary for profile and service-related images.",
      tech: [
        "React",
        "Vite",
        "Node.js",
        "Express.js",
        "MongoDB",
        "JWT",
        "Axios",
        "Cloudinary",
        "Multer",
        "CORS",
        "Dotenv",
      ],
      github: "https://github.com/lalit999999/service_provider_frontend",
      live: "https://l-s-p.lalitgurjar.in/",
    },
  ],
  certifications: [
    {
      id: 1,
      title: "OCI AI Foundations Associate (2025)",
      issuer: "Oracle",
      date: "sept 2025",
      credentialUrl:
        "https://mylearn.oracle.com/ou/learning-path/become-a-oci-ai-foundations-associate-2025/147781",
      image:
        "https://res.cloudinary.com/dsmyka9cr/image/upload/v1773149399/oraclecirtificate_elmzum.jpg",
      skills: ["Basic ML", "AI"],
      color: "emerald",
    },
    // {
    //   id: 2,
    //   title: "Full Stack Web Development",
    //   issuer: "Udemy",
    //   date: "Feb 2025",
    //   credentialUrl: "#",
    //   image:
    //     "https://res.cloudinary.com/dsmyka9cr/image/upload/v1/certs/fullstack-cert.jpg",
    //   skills: ["React", "Node.js", "MongoDB", "Express.js"],
    //   color: "blue",
    // },
    // {
    //   id: 3,
    //   title: "SQL and Databases",
    //   issuer: "Coursera",
    //   date: "Mar 2025",
    //   credentialUrl: "#",
    //   image:
    //     "https://res.cloudinary.com/dsmyka9cr/image/upload/v1/certs/sql-cert.jpg",
    //   skills: ["SQL", "MySQL", "Database Design"],
    //   color: "violet",
    // },
  ],
  socials: [
    { name: "GitHub", url: "https://github.com/lalit999999", icon: Github },
    {
      name: "LinkedIn",
      url: "https://www.linkedin.com/in/lalitgujar/",
      icon: Linkedin,
    },
    { name: "Twitter", url: "https://x.com/lalit7363", icon: Twitter },
    { name: "Blog", url: "https://hashnode.com/@lalitgujjar", icon: Hash },
  ],
};
