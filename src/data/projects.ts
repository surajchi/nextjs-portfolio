export interface Project {
  id: number;
  title: string;
  description: string;
  /** One or more images. A single image shows statically; multiple become a slideshow. */
  images: string[];
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
    images: [
      "/images/Screenshot 2026-06-16 111730.png",
      "/images/Screenshot 2026-06-16 111743.png",
      "/images/Screenshot 2026-06-16 111817.png",
      "/images/Screenshot 2026-06-16 112432.png",
    ],
    tech: ["React", "Tailwind", "Django", "Rest API"],
    demo: "#",
    github: "#",
    details:
      "This platform allows traders to automatically sync trades, track performance and visualize analytics using charts.",
  },
  {
    id: 2,
    title: "Food Redistribution Platform",
    description: "A full-stack platform for donating, discovering, and claiming surplus food.",
    images: [
      "/images/Screenshot 2026-06-16 111730.png",
      "/images/Screenshot 2026-06-16 111743.png",
      "/images/Screenshot 2026-06-16 111817.png",
      "/images/Screenshot 2026-06-16 112432.png",
    ],
    tech: ["React", "Tailwind CSS", "Django", "Python", "JWT"],
    demo: "#",
    github: "#",
    details:
      "Developed a full-stack food redistribution platform enabling donors and receivers to post, browse, and claim surplus food. Implemented JWT-based authentication, role-based access control, geo-tagged food listings with expiry tracking, image uploads, and real-time notifications. Built an admin dashboard using Django ORM and designed a responsive user interface with React and Tailwind CSS.",
  },
];
