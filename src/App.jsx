import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router";
import HomePage from "./pages/HomePage";
import Navbar from "./components/ui/Navbar";
import ExperiencePage from "./pages/ExperiencePage";
import NotFoundPage from "./pages/NotFoundPage";
import ProjectPage from "./pages/ProjectPage";
import Footer from "./components/ui/footer";

const App = () => {
  useEffect(() => {
    document.title = "Xinzore";
    const isDarkMode = localStorage.getItem("theme") === "dark";
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      localStorage.setItem("theme", "light");
    }
  }, []);

  return (
    <div className="min-h-screen flex flex-col justify-between">
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/experience" element={<ExperiencePage />} />
          <Route path="/project" element={<ProjectPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
};

export default App;
