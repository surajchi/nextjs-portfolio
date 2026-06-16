export interface BlogPost {
  id: number;
  slug: string;
  date: string;
  title: string;
  summary: string;
  content: string;
}

export const blogPosts: BlogPost[] = [
  {
    id: 1,
    slug: "from-fresher-to-react-developer",
    date: "2026-02-11",
    title: "From Fresher to React Developer",
    summary: "My journey of getting placed as a React Developer.",
    content: `
## 🚀 My Journey

I started learning frontend from scratch...

### What React Taught Me

- Component Architecture
- State Management
- Performance Optimization
- Scalable UI Design

### My Placement

I got placed as a **React Developer** on
📅 11 February 2026

Now I work on enterprise dashboards and scalable UI systems.
    `,
  },
  {
    id: 2,
    slug: "why-i-added-typescript-to-my-stack",
    date: "2026-05-20",
    title: "Why I Added TypeScript to My Stack",
    summary:
      "How moving from JavaScript to TypeScript made my React apps safer, faster to refactor, and far easier to maintain.",
    content: `
## 🧩 The Problem With Plain JavaScript

When my projects were small, JavaScript felt fast and flexible. But as my
dashboards grew, the same bugs kept coming back:

- Passing the **wrong shape** of data into a component
- Calling a function with a missing argument
- Typos in object keys that failed silently at runtime

Every one of these only showed up *after* I refreshed the browser. I was
debugging in the wrong place — at runtime instead of while writing the code.

## ⚡ What TypeScript Changed

TypeScript moved those errors from the browser into my editor. The moment I
typed something wrong, it told me — before I ever hit save.

### The Wins That Mattered Most

- **Autocomplete everywhere** — props, API responses, and store values all suggest themselves.
- **Fearless refactoring** — rename a field and every broken usage lights up instantly.
- **Self-documenting code** — an \`interface\` describes exactly what a component expects.
- **Safer API layers** — I type my backend responses once and reuse them across the app.

### A Small Example

Instead of guessing what a project object looks like, I now describe it:

\`\`\`ts
interface Project {
  id: number;
  title: string;
  images: string[];
}
\`\`\`

Now any component that touches a \`Project\` knows its shape, and the compiler
catches mistakes the instant I make them.

## 🎯 My Takeaway

TypeScript did not slow me down — it **removed an entire category of bugs** and
made me confident enough to refactor large features without fear. For any React
app that is going to grow, I now reach for TypeScript from day one.
    `,
  },
  {
    id: 3,
    slug: "building-a-food-redistribution-platform",
    date: "2026-04-08",
    title: "Building a Full-Stack Food Redistribution Platform",
    summary:
      "Lessons from building a platform that connects food donors with receivers using React, Django, and JWT authentication.",
    content: `
## 🍲 The Idea

Every day, restaurants and grocery stores throw away perfectly good surplus
food while people nearby go hungry. I wanted to build a bridge between the two —
a platform where **donors post surplus food** and **receivers claim it** before
it goes to waste.

## 🏗️ The Architecture

I split the project into a clear frontend and backend so each side could grow
independently.

### Frontend — React + Tailwind CSS

- A responsive interface that works on phones, where most donors actually are
- Real-time listings with **expiry tracking** so stale food disappears automatically
- A clean claim flow that takes just a couple of taps

### Backend — Django + Django REST Framework

- **JWT-based authentication** to keep accounts secure
- **Role-based access control** separating donors, receivers, and admins
- **Geo-tagged listings** so people only see food near them
- An admin dashboard built on the Django ORM for moderation

## 🔐 The Hardest Part: Trust & Roles

The trickiest challenge was not the code — it was **permissions**. A receiver
should never edit a donor's listing, and an admin needs to oversee everything.
Role-based access control on every endpoint made that boundary explicit and
safe.

### What I Learned

- Design the **data model and roles first** — everything else follows from it.
- **Real-time notifications** dramatically improve how fast food gets claimed.
- Good UX on mobile matters more than any feature on the backend.

## 🌱 The Result

A working full-stack platform that turns surplus into meals instead of waste —
and a project that taught me how to think about an entire system, not just the UI.
    `,
  },
  {
    id: 4,
    slug: "designing-a-trading-journal-react-django",
    date: "2026-03-15",
    title: "Designing a Trading Journal With React & Django REST",
    summary:
      "How I built a tool that syncs trades automatically and turns raw numbers into analytics traders can actually use.",
    content: `
## 📈 Why a Trading Journal?

Most traders track their trades in messy spreadsheets and never review them
properly. I wanted to build a tool that does the boring part automatically —
**sync trades, track performance, and visualize the results** — so traders can
focus on improving instead of bookkeeping.

## 🧱 The Stack

- **React + Tailwind** for a fast, interactive dashboard
- **Django REST Framework** to expose a clean, well-structured API
- **Charts** to turn rows of numbers into patterns you can actually see

## 🔄 Automatic Trade Sync

The core feature is syncing trades without manual entry. The backend normalizes
every trade into a consistent format, and the frontend simply renders whatever
the API returns.

### Turning Data Into Insight

A list of trades is not useful on its own. The value comes from the analytics
layer:

- **Win rate** and average profit per trade
- **Equity curve** showing growth over time
- **Performance by symbol** to spot what is working
- **Drawdown tracking** to manage risk

## 🎨 Designing for Focus

A trading dashboard can easily become noisy. I leaned on a calm layout, clear
typography, and charts that highlight **one insight at a time** rather than
drowning the user in metrics.

### What This Project Taught Me

- A strong **REST API contract** keeps the frontend and backend honest.
- **Visualization is a feature**, not a decoration — it is where the value lives.
- Performance matters: charts must stay smooth even with thousands of trades.

## 🏁 The Outcome

A platform that quietly does the analysis in the background and gives traders a
clear, honest picture of how they are really doing.
    `,
  },
];
