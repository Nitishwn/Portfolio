import { 
  users, type User, type InsertUser,
  projects, type Project, type InsertProject,
  skills, type Skill, type InsertSkill,
  messages, type Message, type InsertMessage,
  resume, type Resume, type InsertResume
} from "@shared/schema";
import { db } from "./db";
import { eq } from "drizzle-orm";

// Database interface with CRUD operations
export interface IStorage {
  // User operations
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Project operations
  getProjects(): Promise<Project[]>;
  getProject(id: number): Promise<Project | undefined>;
  createProject(project: InsertProject): Promise<Project>;
  updateProject(id: number, project: Partial<InsertProject>): Promise<Project | undefined>;
  deleteProject(id: number): Promise<boolean>;
  
  // Skill operations
  getSkills(): Promise<Skill[]>;
  getSkillsByCategory(category: string): Promise<Skill[]>;
  createSkill(skill: InsertSkill): Promise<Skill>;
  updateSkill(id: number, skill: Partial<InsertSkill>): Promise<Skill | undefined>;
  deleteSkill(id: number): Promise<boolean>;
  
  // Message operations
  getMessages(): Promise<Message[]>;
  getMessage(id: number): Promise<Message | undefined>;
  createMessage(message: InsertMessage): Promise<Message>;
  markMessageAsRead(id: number): Promise<boolean>;
  deleteMessage(id: number): Promise<boolean>;
  
  // Resume operations
  getResumeEntries(): Promise<Resume[]>;
  getResumeEntriesByType(type: string): Promise<Resume[]>;
  createResumeEntry(resumeEntry: InsertResume): Promise<Resume>;
  updateResumeEntry(id: number, resumeEntry: Partial<InsertResume>): Promise<Resume | undefined>;
  deleteResumeEntry(id: number): Promise<boolean>;
}

// PostgreSQL database storage implementation
export class PgStorage implements IStorage {
  // User operations
  async getUser(id: number): Promise<User | undefined> {
    const result = await db.select().from(users).where(eq(users.id, id));
    return result[0];
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const result = await db.select().from(users).where(eq(users.username, username));
    return result[0];
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const result = await db.insert(users).values(insertUser).returning();
    return result[0];
  }

  // Project operations
  async getProjects(): Promise<Project[]> {
    return await db.select().from(projects);
  }

  async getProject(id: number): Promise<Project | undefined> {
    const result = await db.select().from(projects).where(eq(projects.id, id));
    return result[0];
  }

  async createProject(project: InsertProject): Promise<Project> {
    // Make sure technologies is an array for PostgreSQL
    const projectData = {
      ...project,
      technologies: Array.isArray(project.technologies) ? project.technologies : []
    };
    const result = await db.insert(projects).values(projectData).returning();
    return result[0];
  }

  async updateProject(id: number, project: Partial<InsertProject>): Promise<Project | undefined> {
    // Prepare update data
    const updateData: Record<string, any> = {
      ...project,
      updatedAt: new Date()
    };
    
    // Make sure technologies is an array if it exists
    if (updateData.technologies) {
      updateData.technologies = Array.isArray(updateData.technologies) 
        ? updateData.technologies 
        : [];
    }
    
    const result = await db.update(projects)
      .set(updateData)
      .where(eq(projects.id, id))
      .returning();
    return result[0];
  }

  async deleteProject(id: number): Promise<boolean> {
    const result = await db.delete(projects).where(eq(projects.id, id)).returning();
    return result.length > 0;
  }

  // Skill operations
  async getSkills(): Promise<Skill[]> {
    return await db.select().from(skills);
  }

  async getSkillsByCategory(category: string): Promise<Skill[]> {
    return await db.select().from(skills).where(eq(skills.category, category));
  }

  async createSkill(skill: InsertSkill): Promise<Skill> {
    const result = await db.insert(skills).values(skill).returning();
    return result[0];
  }

  async updateSkill(id: number, skill: Partial<InsertSkill>): Promise<Skill | undefined> {
    const result = await db.update(skills)
      .set({
        ...skill,
        updatedAt: new Date()
      })
      .where(eq(skills.id, id))
      .returning();
    return result[0];
  }

  async deleteSkill(id: number): Promise<boolean> {
    const result = await db.delete(skills).where(eq(skills.id, id)).returning();
    return result.length > 0;
  }

  // Message operations
  async getMessages(): Promise<Message[]> {
    return await db.select().from(messages);
  }

  async getMessage(id: number): Promise<Message | undefined> {
    const result = await db.select().from(messages).where(eq(messages.id, id));
    return result[0];
  }

  async createMessage(message: InsertMessage): Promise<Message> {
    const result = await db.insert(messages).values(message).returning();
    return result[0];
  }

  async markMessageAsRead(id: number): Promise<boolean> {
    const result = await db.update(messages)
      .set({ read: 1 })
      .where(eq(messages.id, id))
      .returning();
    return result.length > 0;
  }

  async deleteMessage(id: number): Promise<boolean> {
    const result = await db.delete(messages).where(eq(messages.id, id)).returning();
    return result.length > 0;
  }

  // Resume operations
  async getResumeEntries(): Promise<Resume[]> {
    return await db.select().from(resume).orderBy(resume.order);
  }

  async getResumeEntriesByType(type: string): Promise<Resume[]> {
    return await db.select().from(resume).where(eq(resume.type, type)).orderBy(resume.order);
  }

  async createResumeEntry(resumeEntry: InsertResume): Promise<Resume> {
    const result = await db.insert(resume).values(resumeEntry).returning();
    return result[0];
  }

  async updateResumeEntry(id: number, resumeEntry: Partial<InsertResume>): Promise<Resume | undefined> {
    const result = await db.update(resume)
      .set({
        ...resumeEntry,
        updatedAt: new Date()
      })
      .where(eq(resume.id, id))
      .returning();
    return result[0];
  }

  async deleteResumeEntry(id: number): Promise<boolean> {
    const result = await db.delete(resume).where(eq(resume.id, id)).returning();
    return result.length > 0;
  }
}

// For backward compatibility, we'll also keep the in-memory storage implementation
export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private projects: Map<number, Project>;
  private skillsData: Map<number, Skill>;
  private messagesData: Map<number, Message>;
  private resumeData: Map<number, Resume>;
  
  private userId = 1;
  private projectId = 1;
  private skillId = 1;
  private messageId = 1;
  private resumeId = 1;

  constructor() {
    this.users = new Map();
    this.projects = new Map();
    this.skillsData = new Map();
    this.messagesData = new Map();
    this.resumeData = new Map();
  }

  // User operations
  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.userId++;
    const now = new Date();
    const user: User = { ...insertUser, id, createdAt: now };
    this.users.set(id, user);
    return user;
  }

  // Project operations
  async getProjects(): Promise<Project[]> {
    return Array.from(this.projects.values());
  }

  async getProject(id: number): Promise<Project | undefined> {
    return this.projects.get(id);
  }

  async createProject(project: InsertProject): Promise<Project> {
    const id = this.projectId++;
    const now = new Date();
    // Ensure technologies is an array
    const technologies = Array.isArray(project.technologies) ? [...project.technologies] : [];
    const newProject: Project = { 
      ...project, 
      technologies,
      id, 
      createdAt: now, 
      updatedAt: now 
    };
    this.projects.set(id, newProject);
    return newProject;
  }

  async updateProject(id: number, project: Partial<InsertProject>): Promise<Project | undefined> {
    const existing = this.projects.get(id);
    if (!existing) return undefined;
    
    const updated: Project = { 
      ...existing, 
      ...project, 
      updatedAt: new Date() 
    };
    this.projects.set(id, updated);
    return updated;
  }

  async deleteProject(id: number): Promise<boolean> {
    return this.projects.delete(id);
  }

  // Skill operations
  async getSkills(): Promise<Skill[]> {
    return Array.from(this.skillsData.values());
  }

  async getSkillsByCategory(category: string): Promise<Skill[]> {
    return Array.from(this.skillsData.values()).filter(
      skill => skill.category === category
    );
  }

  async createSkill(skill: InsertSkill): Promise<Skill> {
    const id = this.skillId++;
    const now = new Date();
    const newSkill: Skill = { ...skill, id, createdAt: now, updatedAt: now };
    this.skillsData.set(id, newSkill);
    return newSkill;
  }

  async updateSkill(id: number, skill: Partial<InsertSkill>): Promise<Skill | undefined> {
    const existing = this.skillsData.get(id);
    if (!existing) return undefined;
    
    const updated: Skill = { 
      ...existing, 
      ...skill, 
      updatedAt: new Date() 
    };
    this.skillsData.set(id, updated);
    return updated;
  }

  async deleteSkill(id: number): Promise<boolean> {
    return this.skillsData.delete(id);
  }

  // Message operations
  async getMessages(): Promise<Message[]> {
    return Array.from(this.messagesData.values());
  }

  async getMessage(id: number): Promise<Message | undefined> {
    return this.messagesData.get(id);
  }

  async createMessage(message: InsertMessage): Promise<Message> {
    const id = this.messageId++;
    const now = new Date();
    const newMessage: Message = { ...message, id, read: 0, createdAt: now };
    this.messagesData.set(id, newMessage);
    return newMessage;
  }

  async markMessageAsRead(id: number): Promise<boolean> {
    const message = this.messagesData.get(id);
    if (!message) return false;
    
    message.read = 1;
    this.messagesData.set(id, message);
    return true;
  }

  async deleteMessage(id: number): Promise<boolean> {
    return this.messagesData.delete(id);
  }

  // Resume operations
  async getResumeEntries(): Promise<Resume[]> {
    return Array.from(this.resumeData.values())
      .sort((a, b) => a.order - b.order);
  }

  async getResumeEntriesByType(type: string): Promise<Resume[]> {
    return Array.from(this.resumeData.values())
      .filter(entry => entry.type === type)
      .sort((a, b) => a.order - b.order);
  }

  async createResumeEntry(resumeEntry: InsertResume): Promise<Resume> {
    const id = this.resumeId++;
    const now = new Date();
    const newEntry: Resume = { ...resumeEntry, id, createdAt: now, updatedAt: now };
    this.resumeData.set(id, newEntry);
    return newEntry;
  }

  async updateResumeEntry(id: number, resumeEntry: Partial<InsertResume>): Promise<Resume | undefined> {
    const existing = this.resumeData.get(id);
    if (!existing) return undefined;
    
    const updated: Resume = { 
      ...existing, 
      ...resumeEntry, 
      updatedAt: new Date() 
    };
    this.resumeData.set(id, updated);
    return updated;
  }

  async deleteResumeEntry(id: number): Promise<boolean> {
    return this.resumeData.delete(id);
  }
}

// Export PostgreSQL storage as the main storage
export const storage = new PgStorage();
