export interface SearchItem {
  title: string;
  description: string;
  path: string;
  category: string;
}

export const searchIndex: SearchItem[] = [
  {
    title: "Overview & Vision",
    description: "Deep dive into ESECURE's mission to combat legal obfuscation and the core architectural vision.",
    path: "/",
    category: "Introduction"
  },
  {
    title: "Quickstart Guide",
    description: "Get up and running in minutes with the pre-built extension and production backend.",
    path: "/quick-setup",
    category: "Introduction"
  },
  {
    title: "System Design",
    description: "Exhaustive breakdown of the hybrid Flask/React/Gemini stack and the scraping algorithms.",
    path: "/architecture",
    category: "Core Architecture"
  },
  {
    title: "API Protocol",
    description: "Detailed RESTful API reference, including request payloads, headers, and AI response lifecycle.",
    path: "/api-docs",
    category: "Core Architecture"
  },
  {
    title: "Local Setup",
    description: "Comprehensive guide for setting up the Python backend and React frontend locally.",
    path: "/developer-guide",
    category: "Developer Guides"
  },
  {
    title: "Production Deployment",
    description: "Step-by-step instructions for publishing the backend to Render with Gunicorn.",
    path: "/deployment",
    category: "Developer Guides"
  },
  {
    title: "Frontend Deployment",
    description: "How to deploy the documentation site to Vercel or Netlify with SPA routing support.",
    path: "/frontend-deployment",
    category: "Developer Guides"
  },
  {
    title: "Documentation Engineering",
    description: "A meta-guide on how this documentation site was built using React, Vite, and Tailwind.",
    path: "/docs-guide",
    category: "Developer Guides"
  }
];
