import React, { useState, useEffect } from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import UserContent from "../user/UserContent";
import EmployeeContent from "./EmployeeContent";
import AdminContent from "../admin/AdminContent";
import EmployeeList from "../admin/EmployeeList";

export default function HomePage() {
    const [theme, setTheme] = useState("light");
    const role = localStorage.getItem("role");
    useEffect(() => {
        document.body.className = theme === "light" ? "bg-gray-50" : "bg-gray-900 text-white";
    }, [theme]);

    const toggleTheme = () => {
        setTheme((prev) => (prev === "light" ? "dark" : "light"));
    };

    return (
        <div className="flex flex-col h-screen">
            {role === 'User' && (
                <UserContent />)
            }
            {role === 'Employee' && (
                <EmployeeContent />)
            }
            {role === 'Admin' && (
                <AdminContent />)
            }
        </div>
    );
}