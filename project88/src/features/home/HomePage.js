import React, { useState, useEffect } from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import UserContent from "../user/UserContent";
import EmployeeContent from "../employee/EmployeeContent";
import AdminContent from "../admin/AdminContent";
import { getUserRole } from "../../utils/auth";



export default function HomePage() {
    const [theme, setTheme] = useState("light");
    const role = getUserRole();
    console.log(role);

    useEffect(() => {
        document.body.className = theme === "light" ? "bg-gray-50" : "bg-gray-900 text-white";
    }, [theme]);

    const toggleTheme = () => {
        setTheme((prev) => (prev === "light" ? "dark" : "light"));
    };

    return (
        <div className="flex flex-col h-screen">
            {role === 'ROLE_USER' && (
                <UserContent />)
            }
            {role === 'ROLE_EMPLOYEE' && (
                <EmployeeContent />)
            }
            {role === 'ROLE_ADMIN' && (
                <AdminContent />)
            }
        </div>
    );
}