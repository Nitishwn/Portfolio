import type { Express, Request, Response } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { 
  insertMessageSchema, 
  insertProjectSchema, 
  insertSkillSchema, 
  insertResumeSchema 
} from "../shared/schema";
import { generateWelcomeMessage, analyzeContactMessage } from "./openai";

export async function registerRoutes(app: Express): Promise<Server> {
  // API routes for portfolio data
  const apiRouter = app.route('/api');

  // Projects routes
  app.get('/api/projects', async (req: Request, res: Response) => {
    try {
      const projects = await storage.getProjects();
      res.status(200).json(projects);
    } catch (error) {
      console.error('Error fetching projects:', error);
      res.status(500).json({ error: 'Failed to fetch projects' });
    }
  });

  app.get('/api/projects/:id', async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ error: 'Invalid project ID' });
      }
      
      const project = await storage.getProject(id);
      if (!project) {
        return res.status(404).json({ error: 'Project not found' });
      }
      
      res.status(200).json(project);
    } catch (error) {
      console.error('Error fetching project:', error);
      res.status(500).json({ error: 'Failed to fetch project' });
    }
  });

  app.post('/api/projects', async (req: Request, res: Response) => {
    try {
      const validatedData = insertProjectSchema.safeParse(req.body);
      if (!validatedData.success) {
        return res.status(400).json({ error: validatedData.error });
      }
      
      const newProject = await storage.createProject(validatedData.data);
      res.status(201).json(newProject);
    } catch (error) {
      console.error('Error creating project:', error);
      res.status(500).json({ error: 'Failed to create project' });
    }
  });

  app.put('/api/projects/:id', async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ error: 'Invalid project ID' });
      }
      
      const validatedData = insertProjectSchema.partial().safeParse(req.body);
      if (!validatedData.success) {
        return res.status(400).json({ error: validatedData.error });
      }
      
      const updatedProject = await storage.updateProject(id, validatedData.data);
      if (!updatedProject) {
        return res.status(404).json({ error: 'Project not found' });
      }
      
      res.status(200).json(updatedProject);
    } catch (error) {
      console.error('Error updating project:', error);
      res.status(500).json({ error: 'Failed to update project' });
    }
  });

  app.delete('/api/projects/:id', async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ error: 'Invalid project ID' });
      }
      
      const success = await storage.deleteProject(id);
      if (!success) {
        return res.status(404).json({ error: 'Project not found' });
      }
      
      res.status(204).end();
    } catch (error) {
      console.error('Error deleting project:', error);
      res.status(500).json({ error: 'Failed to delete project' });
    }
  });

  // Skills routes
  app.get('/api/skills', async (req: Request, res: Response) => {
    try {
      const category = req.query.category as string | undefined;
      let skills;
      
      if (category) {
        skills = await storage.getSkillsByCategory(category);
      } else {
        skills = await storage.getSkills();
      }
      
      res.status(200).json(skills);
    } catch (error) {
      console.error('Error fetching skills:', error);
      res.status(500).json({ error: 'Failed to fetch skills' });
    }
  });

  app.post('/api/skills', async (req: Request, res: Response) => {
    try {
      const validatedData = insertSkillSchema.safeParse(req.body);
      if (!validatedData.success) {
        return res.status(400).json({ error: validatedData.error });
      }
      
      const newSkill = await storage.createSkill(validatedData.data);
      res.status(201).json(newSkill);
    } catch (error) {
      console.error('Error creating skill:', error);
      res.status(500).json({ error: 'Failed to create skill' });
    }
  });

  app.put('/api/skills/:id', async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ error: 'Invalid skill ID' });
      }
      
      const validatedData = insertSkillSchema.partial().safeParse(req.body);
      if (!validatedData.success) {
        return res.status(400).json({ error: validatedData.error });
      }
      
      const updatedSkill = await storage.updateSkill(id, validatedData.data);
      if (!updatedSkill) {
        return res.status(404).json({ error: 'Skill not found' });
      }
      
      res.status(200).json(updatedSkill);
    } catch (error) {
      console.error('Error updating skill:', error);
      res.status(500).json({ error: 'Failed to update skill' });
    }
  });

  app.delete('/api/skills/:id', async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ error: 'Invalid skill ID' });
      }
      
      const success = await storage.deleteSkill(id);
      if (!success) {
        return res.status(404).json({ error: 'Skill not found' });
      }
      
      res.status(204).end();
    } catch (error) {
      console.error('Error deleting skill:', error);
      res.status(500).json({ error: 'Failed to delete skill' });
    }
  });

  // Resume entries routes
  app.get('/api/resume', async (req: Request, res: Response) => {
    try {
      const type = req.query.type as string | undefined;
      let resumeEntries;
      
      if (type) {
        resumeEntries = await storage.getResumeEntriesByType(type);
      } else {
        resumeEntries = await storage.getResumeEntries();
      }
      
      res.status(200).json(resumeEntries);
    } catch (error) {
      console.error('Error fetching resume entries:', error);
      res.status(500).json({ error: 'Failed to fetch resume entries' });
    }
  });

  app.post('/api/resume', async (req: Request, res: Response) => {
    try {
      const validatedData = insertResumeSchema.safeParse(req.body);
      if (!validatedData.success) {
        return res.status(400).json({ error: validatedData.error });
      }
      
      const newEntry = await storage.createResumeEntry(validatedData.data);
      res.status(201).json(newEntry);
    } catch (error) {
      console.error('Error creating resume entry:', error);
      res.status(500).json({ error: 'Failed to create resume entry' });
    }
  });

  app.put('/api/resume/:id', async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ error: 'Invalid resume entry ID' });
      }
      
      const validatedData = insertResumeSchema.partial().safeParse(req.body);
      if (!validatedData.success) {
        return res.status(400).json({ error: validatedData.error });
      }
      
      const updatedEntry = await storage.updateResumeEntry(id, validatedData.data);
      if (!updatedEntry) {
        return res.status(404).json({ error: 'Resume entry not found' });
      }
      
      res.status(200).json(updatedEntry);
    } catch (error) {
      console.error('Error updating resume entry:', error);
      res.status(500).json({ error: 'Failed to update resume entry' });
    }
  });

  app.delete('/api/resume/:id', async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ error: 'Invalid resume entry ID' });
      }
      
      const success = await storage.deleteResumeEntry(id);
      if (!success) {
        return res.status(404).json({ error: 'Resume entry not found' });
      }
      
      res.status(204).end();
    } catch (error) {
      console.error('Error deleting resume entry:', error);
      res.status(500).json({ error: 'Failed to delete resume entry' });
    }
  });

  // Contact form messages routes
  app.post('/api/messages', async (req: Request, res: Response) => {
    try {
      const validatedData = insertMessageSchema.safeParse(req.body);
      if (!validatedData.success) {
        return res.status(400).json({ error: validatedData.error });
      }
      
      const newMessage = await storage.createMessage(validatedData.data);
      
      // Analyze message content with OpenAI if message exists
      if (validatedData.data.message) {
        try {
          const analysis = await analyzeContactMessage(validatedData.data.message);
          console.log('Message analysis:', JSON.stringify(analysis));
          
          // You could store this analysis or use it to prioritize messages
          // For example, urgent messages could be flagged or sent as notifications
        } catch (analysisError) {
          console.error('Error analyzing message content:', analysisError);
          // Non-critical error, continue execution
        }
      }
      
      res.status(201).json({ 
        success: true, 
        message: 'Your message has been sent successfully!' 
      });
    } catch (error) {
      console.error('Error creating message:', error);
      res.status(500).json({ error: 'Failed to send message' });
    }
  });

  app.get('/api/messages', async (req: Request, res: Response) => {
    try {
      const messages = await storage.getMessages();
      res.status(200).json(messages);
    } catch (error) {
      console.error('Error fetching messages:', error);
      res.status(500).json({ error: 'Failed to fetch messages' });
    }
  });

  app.put('/api/messages/:id/read', async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ error: 'Invalid message ID' });
      }
      
      const success = await storage.markMessageAsRead(id);
      if (!success) {
        return res.status(404).json({ error: 'Message not found' });
      }
      
      res.status(200).json({ success: true });
    } catch (error) {
      console.error('Error marking message as read:', error);
      res.status(500).json({ error: 'Failed to mark message as read' });
    }
  });

  app.delete('/api/messages/:id', async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ error: 'Invalid message ID' });
      }
      
      const success = await storage.deleteMessage(id);
      if (!success) {
        return res.status(404).json({ error: 'Message not found' });
      }
      
      res.status(204).end();
    } catch (error) {
      console.error('Error deleting message:', error);
      res.status(500).json({ error: 'Failed to delete message' });
    }
  });

  // OpenAI Integration endpoints
  app.get('/api/welcome', async (req: Request, res: Response) => {
    try {
      // Get visitor information from query parameters or headers
      const { returning } = req.query;
      const referrer = req.get('Referrer') || 'direct';
      const userAgent = req.get('User-Agent') || '';
      
      // Determine time of day based on server time
      const hour = new Date().getHours();
      let timeOfDay = 'day';
      if (hour < 12) timeOfDay = 'morning';
      else if (hour < 18) timeOfDay = 'afternoon';
      else timeOfDay = 'evening';
      
      // Generate personalized welcome message
      const welcomeMessage = await generateWelcomeMessage({
        timeOfDay,
        returningVisitor: returning === 'true',
        referrer,
        browserInfo: userAgent
      });
      
      res.status(200).json({ message: welcomeMessage });
    } catch (error) {
      console.error('Error generating welcome message:', error);
      res.status(500).json({ 
        error: 'Failed to generate welcome message',
        message: 'Welcome to my portfolio website!' // Fallback message
      });
    }
  });

  // Enhanced message handling with OpenAI sentiment analysis
  app.post('/api/messages/analyze', async (req: Request, res: Response) => {
    try {
      const { message } = req.body;
      
      if (!message || typeof message !== 'string') {
        return res.status(400).json({ error: 'Valid message text is required' });
      }
      
      const analysis = await analyzeContactMessage(message);
      res.status(200).json(analysis);
    } catch (error) {
      console.error('Error analyzing message:', error);
      res.status(500).json({ error: 'Failed to analyze message' });
    }
  });

  // Create server
  const httpServer = createServer(app);
  return httpServer;
}
