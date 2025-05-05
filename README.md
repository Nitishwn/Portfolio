# Personal Portfolio Website (Nitish Wani)

Source code for My personal portfolio, built with React, Vite, TypeScript, Tailwind CSS, and Express.

**Live Demo:** [https://Nitishwn.github.io/Portfolio/](https://Nitishwn.github.io/Portfolio/)

## Features

* Responsive design with Light/Dark modes.
* Sections for Hero, About, Projects, Skills, Resume, Blog, and Contact.
* Interactive UI with animations (GSAP, Framer Motion).
* Configured for GitHub Pages deployment.

## Tech Stack

* **Frontend:** React, Vite, TypeScript, Tailwind CSS, Shadcn UI, GSAP, Framer Motion, React Query
* **Backend (Dev):** Node.js, Express.js, tsx
* **Deployment:** GitHub Pages, `gh-pages` package

## Setup & Run Locally

1.  **Clone:** `git clone https://github.com/Nitishwn/Portfolio.git && cd Portfolio`
2.  **Install:** `npm install`
3.  **Run Dev Server:** `npm run dev`
4.  **Open:** `http://localhost:5000`

## Deployment to GitHub Pages

1.  **Ensure `base` in `vite.config.ts` is `/Portfolio/`.**
2.  **Run:** `npm run deploy`
3.  **Configure GitHub Repo:** Set Pages source to deploy from `gh-pages` branch, `/ (root)` folder.
