export interface Project {
  title: string;
  description: string;
  image: string;
  technologies: string[];
}

export const projectsData: Project[] = [
  {
    title: "E-commerce Recommendation System",
    description: "Developed a recommendation engine using collaborative filtering and content-based techniques to personalize product suggestions for users. Implemented using Scikit-learn and Pandas with a focus on scalability and performance evaluation via metrics like precision and recall.",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80",
    technologies: ["(Market-basket analysis", "Node.js", "Cosine Similarity", "TF-IDF"]
  },
  {
    title: "Fractal Analysis of Geospatial Raster Data",
    description: "This project analyzes geospatial raster images using the box-counting method to compute their fractal dimensions, revealing the complexity and pattern variations across different images or time.",
    image: "https://images.unsplash.com/photo-1499951360447-b19be8fe80f5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80",
    technologies: ["Resterio", "Pandas", "Seaborn"]
  },
  {
    title: "Fake Product Review Detection",
    description: "A machine learning project that analyzes customer reviews using natural language processing to identify and classify potentially fake or biased reviews. Achieved over 85 classification accuracy using TF-IDF, sentiment scores, and logistic regression on labeled Amazon product review data.",
    image: "https://images.unsplash.com/photo-1624953587687-daf255b6b80a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80",
    technologies: ["TF-IDF", "Scikit learn", "NLTK"]
  },
  {
    title: "Smart Hydroponics Monitoring System",
    description: "assBuilt a smart hydroponics system using ESP32 with real-time pH, TDS, temperature, and humidity sensors, hosted a responsive web dashboard over Wi-Fi Access Point, and integrated Gemini LLM for AI-driven water quality recommendations with ThingSpeak cloud logging.",
    image: "\hydprns.png",
    technologies: ["Flask", "Rest API", "NodeMCU"]
  },
  {
    title: "Weather Dashboard",
    description: "Developed a weather prediction dashboard using fuzzy logic to classify weather conditions (Sunny, Rainy, Cloudy) based on environmental inputs like temperature, humidity, and moisture.",
    image: "https://images.unsplash.com/photo-1588681664899-f142ff2dc9b1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80",
    technologies: ["Fuzzy logic", "Pandas", "Weather API"]
  },
  {
    title: "Multi-Vendor e-commerce website for local cloth vendors",
    description: "Created and deployed an e-commerce website using MERN stack for full stack development project, using authentication, cloudinary and render.",
    image: "\ecom.png",
    technologies: ["Next.js", "Vite", "React.js"]
  },
  {
    title: "Remote and RFID enabled Door Lock Access Control System",
    description: "This RFID access control system uses a NodeMCU ESP8266 and RC522 reader to authenticate users via RFID tags. Upon authorization confirmed through the Blynk IoT cloud service, the system controls a solenoid lock via a relay module, enabling secure and remotely monitored access.",
    image: "\image.png",
    technologies: ["BLYNK IOT", "Sensor Tech"]
  }
];
