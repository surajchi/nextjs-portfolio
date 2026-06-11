# Portfolio — Next.js 14 + TypeScript + shadcn/ui

Converted from Vite/React (JS) → **Next.js 14** with **TypeScript** and **shadcn/ui** components.
Color palette updated to **#CBBD93** (warm sand) × **#CCA25A** (golden amber).

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript (strict)
- **Styling**: Tailwind CSS v3 + CSS Variables
- **UI Components**: shadcn/ui (Button, Card, Badge, Dialog, Input, Textarea, Label)
- **Animation**: Framer Motion
- **Theme**: next-themes (dark/light with view-transition circle reveal)
- **Email**: EmailJS

## Color Palette

| Token | Light Mode | Dark Mode |
|-------|-----------|-----------|
| Primary accent | `#CCA25A` | `#CCA25A` |
| Secondary accent | `#CBBD93` | `#CBBD93` |
| Background | `#faf7f0` | `#0c0a06` |
| Card bg | `rgba(255,252,244,0.88)` | `rgba(255,240,200,0.04)` |

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## Project Structure

```
├── app/
│   ├── blog/
│   │   └── page.tsx          # Blog listing page
│   ├── globals.css            # Design tokens + Tailwind
│   ├── layout.tsx             # Root layout with ThemeProvider
│   ├── not-found.tsx          # 404 page
│   └── page.tsx               # Home page
├── components/
│   ├── ui/                    # shadcn/ui components
│   │   ├── badge.tsx
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   ├── dialog.tsx
│   │   ├── input.tsx
│   │   └── label.tsx
│   ├── BlogModal.tsx
│   ├── Navbar.tsx
│   ├── ProjectModal.tsx
│   ├── SectionWrapper.tsx
│   └── ThemeToggle.tsx
├── data/
│   ├── blog.ts
│   ├── experience.ts
│   ├── projects.ts
│   └── skills.ts
├── lib/
│   ├── theme-provider.tsx
│   └── utils.ts
├── sections/
│   ├── About.tsx
│   ├── BlogPreview.tsx
│   ├── Contact.tsx
│   ├── Experience.tsx
│   ├── Hero.tsx
│   ├── Projects.tsx
│   ├── Resume.tsx
│   └── Skills.tsx
└── public/
    ├── assets/              # Copy SVG skill icons here
    ├── project/image.png
    └── resume.pdf
```

## Assets Setup

Copy your SVG assets from the original project into `public/assets/`:
```bash
cp src/assets/*.svg public/assets/
cp public/resume.pdf public/resume.pdf
cp project/image.png public/project/image.png
```

## shadcn Components Used

| Component | Used In |
|-----------|---------|
| `Button` | Hero CTAs, Resume download, Contact form submit |
| `Card` | About highlights, Experience, Projects, Blog, Resume |
| `Badge` | Skill tags, Blog labels, Project tech stack |
| `Dialog` | Project modal, Blog modal |
| `Input` | Contact form name & email |
| `Textarea` | Contact form message |
| `Label` | Contact form field labels |

## EmailJS Setup

Update `sections/Contact.tsx` with your EmailJS credentials:
```ts
const SERVICE_ID           = "your_service_id";
const TEMPLATE_ID          = "your_template_id";
const AUTO_REPLY_TEMPLATE_ID = "your_autoreply_template_id";
const PUBLIC_KEY           = "your_public_key";
```
