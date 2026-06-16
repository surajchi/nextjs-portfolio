export interface Skill {
  name: string;
  icon: string;
}

export interface SkillGroup {
  category: string;
  items: Skill[];
}

export const skills: SkillGroup[] = [
  {
    category: "Frontend",
    items: [
      { name: "HTML", icon: "/assets/html.svg" },
      { name: "JavaScript", icon: "/assets/js.svg" },
      { name: "TypeScript", icon: "/assets/typescript.svg" },
      { name: "React", icon: "/assets/react.svg" },
      { name: "Tailwind", icon: "/assets/tailwind.svg" },
    ],
  },
  {
    category: "Backend",
    items: [
      { name: "Python", icon: "/assets/python.svg" },
      { name: "Django", icon: "/assets/django.svg" },
      { name: "Node.js", icon: "/assets/node.svg" },
      { name: "Express.js", icon: "/assets/express.svg" },
    ],
  },
  {
    category: "Database",
    items: [
      { name: "PostgreSQL", icon: "/assets/postgres.svg" },
      { name: "MongoDB", icon: "/assets/mogo.svg" },
    ],
  },
];
