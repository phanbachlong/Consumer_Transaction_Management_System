import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import LoginPage from './features/auth/LoginPage';
import FogotPassword from './features/auth/FogotPassword';
import Register from './features/register/Register';
import HomePage from './features/home/HomePage';
import ChangePassword from './features/auth/ChangePassword';
import Profile from './features/user/Profile';
import TransferForm from './features/home/Transfer';
import Test from './features/Test';
import EmployeeList from "./features/admin/EmployeeList";
import Header from "./components/Header";
import Footer from "./components/Footer";
import VerifyPage from "./features/auth/VerifyPage";
import UserContent from './features/user/UserContent';
import EmployeeContent from './features/employee/EmployeeContent';
import AdminContent from './features/admin/AdminContent';


function App() {
  const [theme, setTheme] = useState("light");

  const toggleTheme = () => {
    setTheme(prev => (prev === "light" ? "dark" : "light"));
  };

  return (
    <Router>
      <Header toggleTheme={toggleTheme} currentTheme={theme} />
      <div className='mt-20'>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/fogot-password" element={<FogotPassword />} />
          <Route path='/register' element={<Register />} />
          <Route path='/profile' element={<Profile />} />
          <Route path='/homepage' element={<HomePage />} />
          <Route path='/reset-password' element={<ChangePassword />} />
          <Route path='/Transfer' element={<TransferForm />} />
          <Route path='/test' element={<Test />} />
          <Route path='/list-employees' element={<EmployeeList />} />
          <Route path="/verify" element={<VerifyPage />} />
          <Route path="/user" element={<UserContent />} />
          <Route path="/admin" element={<AdminContent />} />
          <Route path="/employees" element={<EmployeeContent />} />
        </Routes>
      </div>

        <Footer toggleTheme={toggleTheme} currentTheme={theme} />
    </Router>

  );
}

export default App;
