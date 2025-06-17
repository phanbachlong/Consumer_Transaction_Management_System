import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthAPI from "../api/AuthAPI";

const Header = ({ toggleTheme, currentTheme }) => {
    const navigate = useNavigate();
    const [menuOpen, setMenuOpen] = useState(false);

    // Hàm xử lý logout
    const handleLogout = async () => {
        try {
            await AuthAPI.logout();
        } catch (error) {
            // Có thể log lỗi nếu cần
        }
        localStorage.removeItem('token');
        localStorage.removeItem('userId');
        localStorage.removeItem('role');
        setMenuOpen(false);
        navigate('/login');
    };

    const handleNavigate = (path) => {
        navigate(path);
        setMenuOpen(false); // đóng sidebar sau khi chọn
    };

    return (
        <>
            {/* Header chính */}
            <header className="flex justify-between items-center p-4 bg-white shadow fixed top-0 left-0 right-0 z-40">
                <div
                    className="text-2xl font-bold text-red-600 cursor-pointer"
                    onClick={() => navigate("/")}
                >
                    LOGO
                </div>
                <div className="flex items-center space-x-4">
                    <button
                        onClick={toggleTheme}
                        className="px-4 py-2 bg-gray-100 text-gray-700 rounded hover:bg-gray-200"
                    >
                        {currentTheme === "light" ? "Light/Dark" : "Dark/Light"}
                    </button>
                    <button
                        onClick={() => setMenuOpen(true)}
                        className="px-4 py-2 bg-gray-100 text-gray-700 rounded hover:bg-gray-200"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth="1.5"
                            stroke="currentColor"
                            className="w-6 h-6"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                            />
                        </svg>
                    </button>
                </div>
            </header>

            {/* Overlay mờ nền */}
            {menuOpen && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-50 z-30"
                    onClick={() => setMenuOpen(false)}
                ></div>
            )}

            {/* Sidebar trượt ngang */}
            <div
                className={`fixed top-0 right-0 h-full w-64 bg-white shadow-lg transform transition-transform duration-300 z-50 ${
                    menuOpen ? "translate-x-0" : "translate-x-full"
                }`}
            >
                <div className="p-4 border-b flex justify-between items-center">
                    <h2 className="text-lg font-semibold">Menu</h2>
                    <button onClick={() => setMenuOpen(false)} className="text-gray-600 hover:text-black">
                        ✕
                    </button>
                </div>
                <nav className="flex flex-col p-4 space-y-2">
                    <button
                        className="text-left px-4 py-2 hover:bg-gray-100 rounded"
                        onClick={() => handleNavigate("/admin")}
                    >
                        Admin
                    </button>
                    <button
                        className="text-left px-4 py-2 hover:bg-gray-100 rounded"
                        onClick={() => handleNavigate("/employees")}
                    >
                        Employee
                    </button>
                    <button
                        className="text-left px-4 py-2 hover:bg-gray-100 rounded"
                        onClick={() => handleNavigate("/user")}
                    >
                        User
                    </button>
                    <button
                        className="text-left px-4 py-2 hover:bg-gray-100 rounded"
                        onClick={handleLogout}
                    >
                        Logout
                    </button>
                </nav>
            </div>
        </>
    );
};

export default Header;
