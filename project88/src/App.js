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
import CreateEmployee from "./features/employee/CreateEmployee";
import EmployeeList from "./features/admin/EmployeeList";
import EditEmployee from "./features/employee/EditEmployee";
import Header from "./components/Header";
import Footer from "./components/Footer";
import DeletedEmployees from "./features/employee/DeletedEmployees";
import VerifyPage from "./features/auth/VerifyPage";


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
          <Route path="/fogotPassword" element={<FogotPassword />} />
          <Route path='/register' element={<Register />} />
          <Route path='/profile' element={<Profile />} />
          <Route path='/homepage' element={<HomePage />} />
          <Route path='/changePassword' element={<ChangePassword />} />
          <Route path='/Transfer' element={<TransferForm />} />
          <Route path='/test' element={<Test />} />
          <Route path='/create-employee' element={<CreateEmployee />} />
          <Route path='/list-employees' element={<EmployeeList />} />
          <Route path="/edit-employee/:userId" element={<EditEmployee />} />
          <Route path="/delete-employees" element={<DeletedEmployees />} />
          <Route path="/verify" element={<VerifyPage />} />
        </Routes>
      </div>

      <div className='mt-8'>
        <Footer toggleTheme={toggleTheme} currentTheme={theme} />
      </div>
    </Router>
  );
}

export default App;
