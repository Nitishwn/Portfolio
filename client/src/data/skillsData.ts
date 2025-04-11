export interface Skill {
  name: string;
  level: number;
}

export interface OtherSkill {
  name: string;
  icon: string;
}

export const frontendSkills: Skill[] = [
  { name: "HTML/CSS", level: 95 },
  { name: "JavaScript", level: 90 },
  { name: "React", level: 85 },
  { name: "Vue.js", level: 80 },
  { name: "Responsive Design", level: 95 }
];

export const backendSkills: Skill[] = [
  { name: "Node.js", level: 85 },
  { name: "Express", level: 90 },
  { name: "MongoDB", level: 80 },
  { name: "PostgreSQL", level: 75 },
  { name: "API Development", level: 90 }
];

export const otherSkills: OtherSkill[] = [
  { name: "Git", icon: "fab fa-git-alt" },
  { name: "Docker", icon: "fab fa-docker" },
  { name: "AWS", icon: "fab fa-aws" },
  { name: "Figma", icon: "fab fa-figma" },
  { name: "Mobile Dev", icon: "fas fa-mobile-alt" },
  { name: "Database", icon: "fas fa-database" },
  { name: "DevOps", icon: "fas fa-server" },
  { name: "CI/CD", icon: "fas fa-code-branch" },
  { name: "UI/UX", icon: "fas fa-paint-brush" },
  { name: "Security", icon: "fas fa-lock" },
  { name: "Performance", icon: "fas fa-tachometer-alt" },
  { name: "Accessibility", icon: "fas fa-universal-access" }
];
