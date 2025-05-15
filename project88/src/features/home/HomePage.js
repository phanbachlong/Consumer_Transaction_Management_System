import React, { useState, useEffect } from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import HomeContent from "./HomeContent";

export default function HomePage() {
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    document.body.className = theme === "light" ? "bg-gray-50" : "bg-gray-900 text-white";
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  return (
    <div className="flex flex-col h-screen">
      <Header toggleTheme={toggleTheme} currentTheme={theme} />
      <HomeContent />
      <Footer />
    </div>
  );
}