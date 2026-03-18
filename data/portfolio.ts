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
  { name: "Python", category: "language", proficiency: 90 },
  { name: "SQL", category: "language", proficiency: 85 },
  { name: "Java", category: "language", proficiency: 80 },
  { name: "C/C++", category: "language", proficiency: 75 },
  { name: "Go", category: "language", proficiency: 65 },
  { name: "JavaScript", category: "language", proficiency: 85 },
  { name: "TypeScript", category: "language", proficiency: 85 },
  { name: "React", category: "framework", proficiency: 85 },
  { name: "Next.js", category: "framework", proficiency: 80 },
  { name: "Prisma", category: "framework", proficiency: 70 },
  { name: "Git", category: "tool", proficiency: 85 },
  { name: "Bootstrap", category: "framework", proficiency: 75 },
  { name: "MySQL", category: "database", proficiency: 80 },
  { name: "PostgreSQL", category: "database", proficiency: 75 },
  { name: "MongoDB", category: "database", proficiency: 70 },
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
    title: "Investment Festival ITB Platform",
    description:
      "Marketing campaign platform for Investment Festival 2024, featuring conference registration, competition management, and media partnership integration.",
    tech: ["React", "Next.js", "JavaScript", "Bootstrap"],
    image: "/projects/investment-festival.png",
    date: "2024-04",
    category: "web",
  },
  {
    title: "E-Commerce Expansion Strategy",
    description:
      "Strategic e-commerce platform expansion for F&B business partner through Bakti BCA Scholarship program, achieving 30% sales increase in first month.",
    tech: ["Data Analysis", "Strategy", "E-Commerce", "Business Development"],
    image: "/projects/ecommerce-strategy.png",
    date: "2024-08",
    category: "data",
  },
  {
    title: "Data Analysis Project",
    description:
      "Advanced data analysis and predictive modeling project using Python and SQL for algorithm optimization and pattern recognition.",
    tech: ["Python", "SQL", "Data Analysis", "Machine Learning"],
    image: "/projects/data-analysis.png",
    date: "2024-06",
    category: "data",
  },
  {
    title: "Algorithm Optimization Tool",
    description:
      "Complex algorithm and data structure implementation project showcasing proficiency in computational problem-solving.",
    tech: ["Java", "C/C++", "Algorithms", "Data Structures"],
    image: "/projects/algorithm-tool.png",
    date: "2024-03",
    category: "systems",
  },
  {
    title: "Database Management System",
    description:
      "Advanced database project implementing complex queries and optimization techniques across multiple database systems.",
    tech: ["MySQL", "PostgreSQL", "MongoDB", "SQL"],
    image: "/projects/database-system.png",
    date: "2024-01",
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
