# Welcome to My Portfolio

Vibhor Mishra | Software Engineering Portfolio

A high-performance, production-ready developer portfolio showcasing full-stack applications, intelligent software systems, and active engineering roadmaps. This repository contains the source code for the centralized hub of my engineering work, built with an emphasis on type safety, semantic structure, and optimized user experience.
🔗 Live Deployment: vibhormishra.dev

Key Highlights
• Engineering Roadmap: A dedicated section mapping out active project lifecycles, frontend/backend architecture focuses, and design phases.
• Production-Ready Systems: Technical deep-dives into built platforms, emphasizing real-world problem-solving and architectural design.
• Performance Optimization: Server-side synchronization and rapid client-side rendering for seamless, fluid navigation.

Technical Stack
• Framework: TanStack Start (Full-stack React framework with type-safe routing)
• Language: TypeScript (Strict type checking and robust system architecture)
• Styling: Tailwind CSS (Utility-first components and responsive layouts)
• Core Library: React (Component-driven, declarative user interfaces)

Local Development
Follow these steps to set up the environment and run the portfolio codebase locally on your machine.
Prerequisites
Ensure you have Node.js and npm installed. If you need to manage multiple environments, consider installing via nvm.
Installation & Execution

# Clone the repository
git clone <com/vibhormishra1/My-portfolio>

# Navigate into the project directory
cd <My-portfolio>

# Install the required dependencies
npm i

# Boot up the local development server
npm run dev

Once execution completes, the local development server will spin up. Open your terminal's local address link (typically http://localhost:3000) to view the application.

📂 Repository Structure Overview
├── public/             # Static assets, vector icons, and images
├── src/
│   ├── assets/         # Media files and project graphics
│   ├── components/     # Component UI library
│   │   ├── portfolio/  # Portfolio-specific section components
│   │   └── ui/         # Reusable shadcn / Radix UI primitives
│   ├── data/           # Static data models (projects, blog posts, personal metadata)
│   ├── hooks/          # Custom React hooks
│   ├── lib/            # Utility functions and helper modules
│   ├── routes/         # TanStack file-based routing pages and navigation layouts
│   ├── routeTree.gen.ts # Auto-generated TanStack Router tree definition
│   ├── router.tsx      # TanStack Router configuration
│   ├── server.ts       # TanStack Start server entry point
│   ├── start.ts        # TanStack Start client entry point
│   └── styles.css      # Global CSS directives and Tailwind configuration
├── components.json     # shadcn/ui configuration metadata
├── package.json        # Project dependencies, scripts, and package orchestration
├── tsconfig.json       # TypeScript compiler settings
└── vite.config.ts      # Vite bundler and TanStack plugin setup


📄 License
This repository is open-source and available under the MIT License.
