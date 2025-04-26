export interface Skill {
  name: string;
  level: number;
}

export interface OtherSkill {
  name: string;
  icon: string;
}

export const frontendSkills: Skill[] = [
  { name: "Python", level: 80 },
  { name: "NumPy & Pandas", level: 70 },
  { name: "scikit-learn", level: 85 },
  { name: "TensorFlow / PyTorch", level: 80 },
  { name: "Model Evaluation & Tuning", level: 95 }
];

export const backendSkills: Skill[] = [
  { name: "Matplotlib & Seaborn", level: 85 },
  { name: "SQL & NoSQL", level: 90 },
  { name: "Git & Version Control", level: 80 },
  { name: "Flask/Django", level: 75 },
  { name: "Tableau & Power BI", level: 90 }
];

export const otherSkills: OtherSkill[] = [
  { name: "Git", icon: "fab fa-git-alt" },
  { name: "Docker", icon: "fab fa-docker" },
  { name: "XGBoost", icon: "fab fa-tree" },
  { name: "Figma", icon: "fab fa-figma" },
  { name: "OpenCV", icon: "fas fa-camera" },
  { name: "NLTK", icon: "fas fa-language" },
  { name: "MLflow", icon: "fas fa-chart-line" },
  { name: "MATLAB", icon: "fas fa-square-root-variable" },
  { name: "Hugging Face", icon: "fas fa-robot" },
  { name: "Rasa", icon: "fas fa-microphone" },
  { name: "Vosk", icon: "fas fa-volume-high" },
  { name: "Databricks", icon: "fas fa-server" }
];
