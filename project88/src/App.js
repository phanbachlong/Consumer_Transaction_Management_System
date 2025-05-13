import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import LoginPage from './features/auth/LoginPage';
import FogotPassword from './features/auth/FogotPassword';
import Register from './features/register/Register';
import HomePage from './features/home/HomePage';






function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/fogot-password" element={<FogotPassword />} />
        <Route path='/register' element={<Register />} />
        <Route path='/homepage' element={<HomePage/>} />
      </Routes>
    </Router>
  );
}

export default App;
