import React, { useState, useEffect } from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import UserContent from "./UserContent";
import EmployeeContent from "./EmployeeContent";

export default function HomePage() {
  const [theme, setTheme] = useState("light");
  // const role = localStorage.getItem("role");
  const role = "user"; // thay role để có màn hình home khác nhau

  useEffect(() => {
    document.body.className = theme === "light" ? "bg-gray-50" : "bg-gray-900 text-white";
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  return (
    <div className="flex flex-col h-screen">
      <Header toggleTheme={toggleTheme} currentTheme={theme} />
      {role === 'user' && (
        <UserContent />)
      }
      {role === 'employee' && (
        <EmployeeContent />)
      }
      <Footer />
    </div>
  );
}