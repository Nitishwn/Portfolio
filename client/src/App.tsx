import { useEffect, useState } from "react";
import Header from "./components/Header";
import HeroSection from "./components/HeroSection";
import AboutSection from "./components/AboutSection";
import ProjectsSection from "./components/ProjectsSection";
import SkillsSection from "./components/SkillsSection";
import ResumeSection from "./components/ResumeSection";
import ContactSection from "./components/ContactSection";
import Footer from "./components/Footer";
import BackToTop from "./components/BackToTop";
import WelcomeMessage from "./components/WelcomeMessage";
import { Toaster } from "@/components/ui/toaster";
import useThemeToggle from "./hooks/useThemeToggle";

function App() {
  const { theme } = useThemeToggle();
  const [isReturningVisitor, setIsReturningVisitor] = useState(false);
  
  useEffect(() => {
    // Apply theme class to html element
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    
    // Check if user is a returning visitor using localStorage
    const hasVisitedBefore = localStorage.getItem('hasVisited');
    if (hasVisitedBefore) {
      setIsReturningVisitor(true);
    } else {
      // Set flag for future visits
      localStorage.setItem('hasVisited', 'true');
    }
  }, [theme]);

  return (
    <div className="font-inter bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-100 transition-colors duration-300">
      <Header />
      <WelcomeMessage isReturningVisitor={isReturningVisitor} />
      <main>
        <HeroSection />
        <AboutSection />
        <ProjectsSection />
        <SkillsSection />
        <ResumeSection />
        <ContactSection />
      </main>
      <Footer />
      <BackToTop />
      <Toaster />
    </div>
  );
}

export default App;
