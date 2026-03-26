export interface Project {
  title: string;
  description: string;
  tech: string[];
  image?: string;
  githubUrl?: string;
  liveUrl?: string;
  date?: string;
  featured?: boolean;
  category?: "web" | "data" | "systems" | "other";
}

export interface Experience {
  company: string;
  role: string;
  period: string;
  achievements: string[];
}

export interface Skill {
  name: string;
  category: "language" | "framework" | "database" | "tool";
  proficiency: number;
}

export const siteConfig = {
  name: "Haegen Quinston",
  title: "Computer Science Student & Aspiring Data Scientist",
  email: "haegenquinston@gmail.com",
  github: "https://github.com/haegenpro",
  linkedin: "https://linkedin.com/in/haegenquinston/",
  currentlyWorking: "Machine Learning research project",
  currentlyReading: "Designing Data-Intensive Applications",
};

export const skills: Skill[] = [
  { name: "Python", category: "language", proficiency: 95 },
  { name: "SQL", category: "language", proficiency: 90 },
  { name: "Java", category: "language", proficiency: 85 },
  { name: "C/C++", category: "language", proficiency: 90 },
  { name: "Go", category: "language", proficiency: 70 },
  { name: "JavaScript", category: "language", proficiency: 93 },
  { name: "TypeScript", category: "language", proficiency: 93 },
  { name: "React", category: "framework", proficiency: 91 },
  { name: "Next.js", category: "framework", proficiency: 90 },
  { name: "Prisma", category: "framework", proficiency: 83 },
  { name: "Git", category: "tool", proficiency: 88 },
  { name: "Bootstrap", category: "framework", proficiency: 75 },
  { name: "MySQL", category: "database", proficiency: 90 },
  { name: "PostgreSQL", category: "database", proficiency: 86 },
];

export const projects: Project[] = [
  {
    title: "Sparta HMIF ITB Website",
    description:
      "Complete front-end for the 'Sparta' student orientation program website, serving over 300 students with responsive design and REST API integration.",
    tech: ["React", "TypeScript", "Tailwind CSS", "Axios"],
    image: "/projects/sparta-website.png",
    date: "2025-06",
    featured: true,
    category: "web",
  },
  {
    title: "Investment Festival ITB",
    description:
      "Marketing campaign for Investment Festival 2024, featuring conference registration, competition management, and media partnership integration.",
    tech: ["React", "Next.js", "JavaScript", "Bootstrap"],
    image: "/projects/investment-festival.jpg",
    date: "2024-08",
    category: "other",
  },
  {
    title: "Pothole Image Segmentation Project",
    description:
      "Computer vision project for identifying and segmenting potholes in urban road images, utilizing deep learning techniques.",
    tech: ["Python", "TensorFlow", "Hugging Face", "Computer Vision"],
    image: "/projects/pothole-segmentation.png",
    date: "2026-02",
    category: "data",
  },
  {
    title: "Indonesian Custom Home Image Classification",
    description:
      "Computer vision project for classifying custom home images in Indonesia, utilizing deep learning models.",
    tech: ["Python", "TensorFlow", "Hugging Face", "Computer Vision"],
    image: "/projects/home-classification.png",
    date: "2025-11",
    category: "data",
  },
  {
    title: "E-Commerce Prototype Application",
    description:
      "Full-stack e-commerce application prototype with user authentication, product management, and secure payment processing.",
    tech: ["PHP", "PostgreSQL", "HTML/CSS", "Laravel"],
    image: "/projects/e-commerce-website.png",
    date: "2025-10",
    category: "web",
  },
  {
    title: "Database Management System",
    description:
      "Advanced database project implementing complex queries and optimization techniques across multiple database systems.",
    tech: ["MySQL", "PostgreSQL", "MongoDB", "SQL"],
    image: "/projects/database-system.png",
    date: "2025-05",
    category: "systems",
  },
];

export const experiences: Experience[] = [
  {
    company: "Sparta HMIF ITB",
    role: "Frontend Specialist",
    period: "Jun 2025 - Present",
    achievements: [
      "Engineered and deployed the complete front-end for the 'Sparta' website, serving over 300 students",
      "Built responsive, reusable components using React, TypeScript, and Tailwind CSS",
      "Integrated REST APIs via Axios for seamless data communication",
    ],
  },
  {
    company: "Investment Festival ITB 2024",
    role: "Director of Marketing",
    period: "Apr 2024 - Nov 2024",
    achievements: [
      "Spearheaded a multi-channel marketing campaign for Investment Festival events",
      "Orchestrated influencer collaborations and targeted community outreach",
      "Forged over 20 media partnerships, resulting in an 80% increase in registration",
    ],
  },
  {
    company: "Institut Teknologi Bandung",
    role: "Computer Science Student",
    period: "Aug 2023 - Present",
    achievements: [
      "Maintaining GPA of 3.71/4.00 in Computer Science program",
      "Completed courses in AI, Algorithm Strategies, Web Development, and Advanced Databases",
      "Selected for Bakti BCA Scholarship (top 8% from 10,000+ applicants)",
    ],
  },
];
