import { z } from "zod";

// Type definitions
export type User = {
  id: number;
  username: string;
  password: string;
  createdAt: Date;
};

export type Project = {
  id: number;
  title: string;
  description: string;
  image: string;
  technologies: string[];
  demoLink: string;
  codeLink: string;
  createdAt: Date;
  updatedAt: Date;
};

export type Skill = {
  id: number;
  name: string;
  category: string;
  level: number;
  icon?: string;
  createdAt: Date;
  updatedAt: Date;
};

export type Message = {
  id: number;
  name: string;
  email: string;
  message: string;
  read: number;
  createdAt: Date;
};

export type Resume = {
  id: number;
  title: string;
  organization: string;
  period: string;
  description: string;
  type: string;
  order: number;
  createdAt: Date;
  updatedAt: Date;
};

// Zod schemas for validation
export const insertUserSchema = z.object({
  username: z.string(),
  password: z.string()
});

export const insertProjectSchema = z.object({
  title: z.string(),
  description: z.string(),
  image: z.string(),
  technologies: z.array(z.string()),
  demoLink: z.string(),
  codeLink: z.string()
});

export const insertSkillSchema = z.object({
  name: z.string(),
  category: z.string(),
  level: z.number(),
  icon: z.string().optional()
});

export const insertMessageSchema = z.object({
  name: z.string(),
  email: z.string(),
  message: z.string()
});

export const insertResumeSchema = z.object({
  title: z.string(),
  organization: z.string(),
  period: z.string(),
  description: z.string(),
  type: z.string(),
  order: z.number()
});

// Types for insert operations
export type InsertUser = z.infer<typeof insertUserSchema>;
export type InsertProject = z.infer<typeof insertProjectSchema>;
export type InsertSkill = z.infer<typeof insertSkillSchema>;
export type InsertMessage = z.infer<typeof insertMessageSchema>;
export type InsertResume = z.infer<typeof insertResumeSchema>;