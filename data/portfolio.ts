export interface Project {
  title: string;
  description: string;
  tech: string[];
  image?: string;
  githubUrl?: string;
  liveUrl?: string;
  date?: string;
  featured?: boolean;
  category?: "web" | "data" | "systems" | "algorithm" | "other";
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

export interface Award {
  title: string;
  organization: string;
  date: string;
  description: string;
  highlight?: string;
  tier: "gold" | "silver" | "bronze";
}

export const siteConfig = {
  name: "Haegen Quinston",
  title: "Computer Science Student & Aspiring Data Scientist",
  email: "haegenquinston@gmail.com",
  github: "https://github.com/haegenpro",
  linkedin: "https://linkedin.com/in/haegenquinston/",
  currentlyWorking: "Exploring AI research & building side projects",
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
    title: "Minesweeper AI Solver",
    description:
      "Modular Minesweeper engine with a graph-based logic solver, pattern recognition (1-1, 1-2 patterns), and probabilistic guessing for unconstrained cells. Includes a performance simulator across difficulty levels. Try the live demo in the Algorithm Lab above.",
    tech: ["Python", "Graph Theory", "Probability", "Constraint Solving"],
    githubUrl: "https://github.com/haegenpro/Minesweeper_Model",
    date: "2025-01",
    featured: true,
    category: "algorithm",
  },
  {
    title: "Sparta HMIF ITB Website",
    description:
      "Front-end for the 'Sparta' student orientation portal, proven to serve 600+ concurrent users with a responsive, scalable architecture built using React and Tailwind CSS.",
    tech: ["React", "TypeScript", "Tailwind CSS", "Axios"],
    image: "/projects/sparta-website.png",
    date: "2025-06",
    category: "web",
  },
  {
    title: "Pothole Semantic Segmentation",
    description:
      "State-of-the-art EoMT-DINOv3 architecture for urban road pothole detection and segmentation. Ranked 2nd out of 260+ teams at A Renewal Agent 7.0 Data Science Competition.",
    tech: ["Python", "PyTorch", "Hugging Face", "Computer Vision", "DINOv3"],
    date: "2026-02",
    category: "data",
  },
  {
    title: "Indonesian Traditional House Classifier",
    description:
      "DINOv3-based deep learning model for classifying Indonesian traditional house images across multiple regional styles. Finalist (top 5 / 120+ teams) at Logika UI 2025.",
    tech: ["Python", "PyTorch", "Hugging Face", "Computer Vision", "DINOv3"],
    date: "2025-11",
    category: "data",
  },
  {
    title: "Rush Hour Puzzle Solver",
    description:
      "Interactive puzzle solver implementing UCS, GBFS, A*, and Beam Search algorithms with a React GUI featuring step-by-step animation, playback controls, and configurable heuristics.",
    tech: ["JavaScript", "React", "Node.js", "A*", "Graph Search"],
    githubUrl: "https://github.com/haegenpro/Tucil3_13523103_13523109",
    date: "2025-06",
    category: "algorithm",
  },
  {
    title: "Image Compression (Quadtree)",
    description:
      "C++ image compressor using adaptive quadtree decomposition with five error metrics (MAD, Max Pixel Diff, Variance, Entropy, SSIM). Supports target compression ratio via binary search, with GIF output of the compression process.",
    tech: ["C++", "Quadtree", "SSIM", "Binary Search", "Image Processing"],
    githubUrl: "https://github.com/haegenpro/Tucil2_13523099_13523109",
    date: "2025-04",
    category: "algorithm",
  },
  {
    title: "FreeCell A* Solver",
    description:
      "Academic Java implementation of a FreeCell solitaire solver using Best-First Search with custom heuristics. Accompanied by a research paper documenting the algorithm design and experimental results.",
    tech: ["Java", "A*", "Best-First Search", "Heuristics"],
    githubUrl: "https://github.com/haegenpro/AStar_FreeCell_Solver",
    date: "2025-03",
    category: "algorithm",
  },
  {
    title: "Wisuda Oktober HMIF ITB Website",
    description:
      "Lightweight, interactive information site for the HMIF graduation event series, built with framework-free custom components using TailwindCSS and vanilla HTML.",
    tech: ["TailwindCSS", "HTML", "Vanilla JS"],
    date: "2025-10",
    category: "web",
  },
  {
    title: "Investment Festival ITB",
    description:
      "Marketing campaign website for Investment Festival 2024, featuring conference registration, competition management, and media partnership integration.",
    tech: ["React", "Next.js", "JavaScript", "Bootstrap"],
    image: "/projects/investment-festival.jpg",
    date: "2024-08",
    category: "other",
  },
  {
    title: "Robocode Tank Battle Bots",
    description:
      "Competitive C# bots for Robocode TankRoyale implementing four distinct greedy strategies with real-time position evaluation, movement prediction, and energy management.",
    tech: ["C#", "Robocode", "Greedy Algorithm", "Game AI"],
    githubUrl: "https://github.com/haegenpro/Tubes1_HitnRun",
    date: "2024-12",
    category: "algorithm",
  },
  {
    title: "E-Commerce Prototype Application",
    description:
      "Full-stack e-commerce prototype with user authentication, product management, and secure payment processing.",
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
    company: "Wisuda Oktober HMIF ITB 2025",
    role: "Frontend Specialist",
    period: "Sept 2025 - Oct 2025",
    achievements: [
      "Built and deployed lightweight, interactive pages for the HMIF graduation event information site",
      "Crafted custom, framework-free components using TailwindCSS and vanilla HTML",
      "Optimized for performance with zero framework overhead",
    ],
  },
  {
    company: "Sparta HMIF ITB 2025",
    role: "Frontend Specialist",
    period: "Jun 2025 - Sept 2025",
    achievements: [
      "Developed and launched the 'Sparta' student orientation portal using React and Tailwind CSS",
      "Delivered a responsive, scalable application proven to serve 600+ concurrent users",
      "Built reusable components and integrated REST APIs via Axios",
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
      "Maintaining GPA of 3.76/4.00 in Computer Science program",
      "Completed courses in AI, Algorithm Strategies, Web Development, and Advanced Databases",
      "Selected for Bakti BCA Scholarship (top 8% from 10,000+ applicants)",
    ],
  },
];

export const awards: Award[] = [
  {
    title: "2nd Place — A Renewal Agent 7.0 Data Science Competition",
    organization: "Institut Teknologi Sepuluh Nopember (ITS)",
    date: "Feb 2026",
    description:
      "Deployed a state-of-the-art EoMT-DINOv3 architecture for pothole semantic segmentation and successfully defended the technical pipeline to a panel of judges in the final round.",
    highlight: "2nd / 260+ teams",
    tier: "silver",
  },
  {
    title: "Bakti BCA Scholarship",
    organization: "Bank Central Asia (BCA)",
    date: "Jan 2025",
    description:
      "Selected for the Bakti BCA Scholarship program as one of 800 recipients. Devised and executed a strategic e-commerce expansion for a partner F&B business, driving a 30% increase in sales.",
    highlight: "800 / 10,000+ applicants",
    tier: "gold",
  },
  {
    title: "Finalist — Logika UI 2025 Data Science Competition",
    organization: "Universitas Indonesia (UI)",
    date: "Nov 2025",
    description:
      "Applied the DINOv3 deep learning model to an Indonesian traditional house image classification task and presented strategic findings in a final pitching round.",
    highlight: "Top 5 / 120+ teams",
    tier: "bronze",
  },
];
