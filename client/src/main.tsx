import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";

document.addEventListener('DOMContentLoaded', () => {
  // Initialize AOS animation library
  (window as any).AOS.init({
    duration: 800,
    easing: 'ease-in-out',
    once: true,
    mirror: false
  });
});

createRoot(document.getElementById("root")!).render(<App />);
