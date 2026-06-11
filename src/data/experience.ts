export interface Experience {
  id: number;
  role: string;
  company: string;
  location: string;
  duration: string;
  joining: string;
  description: string;
}

export const experience: Experience[] = [
  {
    id: 1,
    role: "React Developer",
    company: "Shubham Tanks and Liners Pvt. Ltd.",
    location: "Thane, Maharashtra",
    duration: "Feb 2026 – Present",
    joining: "11 February 2026",
    description:
      "Working on modern frontend applications using React, Tailwind CSS and REST APIs. Building scalable UI components and enhancing performance of enterprise dashboards.",
  },
];
