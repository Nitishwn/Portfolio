import OpenAI from "openai";

// Initialize the OpenAI client with the API key
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

/**
 * Generates a personalized welcome message using OpenAI
 * @param visitorInfo Information about the visitor to personalize the message
 * @returns A personalized welcome message
 */
export async function generateWelcomeMessage(visitorInfo: {
  timeOfDay?: string;
  returningVisitor?: boolean;
  referrer?: string;
  browserInfo?: string;
}): Promise<string> {
  try {
    const { timeOfDay = "day", returningVisitor = false, referrer = "direct", browserInfo = "" } = visitorInfo;
    
    // Handle OpenAI API key not set or invalid
    if (!process.env.OPENAI_API_KEY || process.env.OPENAI_API_KEY === 'sk-') {
      console.log('No valid OpenAI API key found, using fallback welcome messages');
      return getFallbackWelcomeMessage(timeOfDay, returningVisitor);
    }
    
    const prompt = `
      Generate a short, friendly welcome message for a visitor to my personal portfolio website.
      
      Additional context:
      - Time of day: ${timeOfDay} (morning/afternoon/evening)
      - ${returningVisitor ? 'This is a returning visitor' : 'This is a first-time visitor'}
      - They came from: ${referrer}
      - Browser info: ${browserInfo}
      
      The message should be personal, warm, and professional. Keep it under 150 characters.
      Do not include quotation marks in the response.
    `;

    // Use the newest OpenAI model - gpt-4o which was released May 13, 2024. do not change this unless explicitly requested by the user
    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [{ role: "user", content: prompt }],
      max_tokens: 120,
      temperature: 0.7,
    });

    const welcomeMessage = response.choices[0].message.content?.trim() || 
      getFallbackWelcomeMessage(timeOfDay, returningVisitor);
    
    return welcomeMessage;
  } catch (error) {
    console.error('Error generating welcome message:', error);
    const { timeOfDay = "day", returningVisitor = false } = visitorInfo;
    return getFallbackWelcomeMessage(timeOfDay, returningVisitor);
  }
}

/**
 * Returns a fallback welcome message based on time of day and visitor status
 */
function getFallbackWelcomeMessage(timeOfDay: string, isReturningVisitor: boolean): string {
  // Time-based messages
  const timeBasedMessages = {
    morning: [
      "Good morning! Welcome to my portfolio showcase.",
      "Rise and shine! Excited to share my work with you this morning.",
      "Morning visitor! Thanks for starting your day with my portfolio."
    ],
    afternoon: [
      "Good afternoon! Thanks for visiting my portfolio today.",
      "Afternoon explorer! Discover my latest projects and skills.",
      "Welcome! Hope you're having a productive afternoon."
    ],
    evening: [
      "Good evening! Thanks for stopping by my portfolio.",
      "Evening visitor! Explore my projects at your leisure.",
      "Welcome! Wind down your day browsing through my work."
    ],
    day: [
      "Welcome to my portfolio! I'm excited to share my work with you.",
      "Hello there! Explore my projects and get in touch.",
      "Thanks for visiting! I hope you enjoy browsing my work."
    ]
  };
  
  // Returning visitor messages
  const returningMessages = [
    "Welcome back! Great to see you again.",
    "Thanks for returning! There's always something new to discover.",
    "Glad you're back! Feel free to explore my latest updates."
  ];
  
  // Select appropriate message pool
  const messagePool = isReturningVisitor ? 
    returningMessages : 
    timeBasedMessages[timeOfDay as keyof typeof timeBasedMessages] || timeBasedMessages.day;
  
  // Return random message from the pool
  return messagePool[Math.floor(Math.random() * messagePool.length)];
}

/**
 * Analyzes a message from the contact form and provides sentiment analysis
 * @param message The message to analyze
 * @returns Sentiment analysis results
 */
export async function analyzeContactMessage(message: string): Promise<{
  sentiment: 'positive' | 'neutral' | 'negative';
  urgency: 'high' | 'medium' | 'low';
  topics: string[];
}> {
  try {
    const prompt = `
      Analyze the following message from a contact form on my portfolio website:
      
      "${message}"
      
      Provide analysis in JSON format with these fields:
      - sentiment: either "positive", "neutral", or "negative"
      - urgency: either "high", "medium", or "low" 
      - topics: an array of up to 3 key topics mentioned in the message
    `;

    // the newest OpenAI model is "gpt-4o" which was released May 13, 2024. do not change this unless explicitly requested by the user
    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [{ role: "user", content: prompt }],
      response_format: { type: "json_object" },
      temperature: 0.3,
    });

    const analysis = JSON.parse(response.choices[0].message.content || '{}');
    return {
      sentiment: analysis.sentiment || 'neutral',
      urgency: analysis.urgency || 'medium',
      topics: analysis.topics || ['general inquiry'],
    };
  } catch (error) {
    console.error('Error analyzing contact message:', error);
    return {
      sentiment: 'neutral',
      urgency: 'medium',
      topics: ['general inquiry'],
    };
  }
}