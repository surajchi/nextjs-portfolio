export interface Project {
  id: number;
  title: string;
  description: string;
  image: string;
  tech: string[];
  demo: string;
  github: string;
  details: string;
}

export const projects: Project[] = [
  {
    id: 1,
    title: "Trading Journal Platform",
    description: "Track, analyze and improve your trades.",
    image: "/project/image.png",
    tech: ["React", "Tailwind", "Redux", "Flask"],
    demo: "#",
    github: "#",
    details:
      "This platform allows traders to automatically sync trades, track performance and visualize analytics using charts.",
  },
];
