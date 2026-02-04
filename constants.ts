import { NavItem, Project } from './types';

export const NAV_ITEMS: NavItem[] = [
  { label: 'Home', path: '/' },
  { label: 'Projects', path: '/projects' },
  { label: 'About', path: '/about' },
  { label: 'Contact', path: '/contact' },
];

export const PROJECTS: Project[] = [
  {
    id: '1',
    title: 'Neon E-Commerce',
    description: 'A futuristic shopping experience built with Next.js and Stripe integration. Features real-time inventory and 3D product previews.',
    fullDescription: 'A futuristic shopping experience built with Next.js and Stripe integration. Features real-time inventory and 3D product previews.',
    techStack: ['Next.js', 'Stripe', 'Three.js', 'Tailwind'],
    category: 'Web App',
    thumbnail: 'https://picsum.photos/800/600?random=1',
    githubUrl: 'https://github.com',
    liveUrl: 'https://example.com',
    date: '2023-12-01'
  },
  {
    id: '2',
    title: 'AI Dashboard',
    description: 'Data visualization dashboard for machine learning models using D3.js and Python backend.',
    fullDescription: 'Data visualization dashboard for machine learning models using D3.js and Python backend.',
    techStack: ['React', 'D3.js', 'Python', 'FastAPI'],
    category: 'AI Project',
    thumbnail: 'https://picsum.photos/800/600?random=2',
    githubUrl: 'https://github.com',
    date: '2023-11-15'
  },
  {
    id: '3',
    title: 'Crypto Tracker',
    description: 'Real-time cryptocurrency tracking application with websocket connections and interactive charts.',
    fullDescription: 'Real-time cryptocurrency tracking application with websocket connections and interactive charts.',
    techStack: ['TypeScript', 'WebSockets', 'Recharts'],
    category: 'Web App',
    thumbnail: 'https://picsum.photos/800/600?random=3',
    githubUrl: 'https://github.com',
    liveUrl: 'https://example.com',
    date: '2023-10-20'
  },
  {
    id: '4',
    title: 'Social Graph',
    description: 'A social network graph visualization tool allowing users to explore connections between various entities.',
    fullDescription: 'A social network graph visualization tool allowing users to explore connections between various entities.',
    techStack: ['React', 'GraphQL', 'Neo4j'],
    category: 'Learning',
    thumbnail: 'https://picsum.photos/800/600?random=4',
    githubUrl: 'https://github.com',
    date: '2023-09-05'
  }
];

export const SKILLS = [
  "React / Next.js",
  "TypeScript",
  "Tailwind CSS",
  "Three.js / R3F",
  "Node.js",
  "PostgreSQL",
  "GraphQL",
  "Framer Motion"
];