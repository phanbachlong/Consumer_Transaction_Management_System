import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import LoginPage from './pages/LoginPage';
import FogotPassword from './pages/FogotPassword';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/fogot-password" element={<FogotPassword />} />
      </Routes>
    </Router>
  );
}

export default App;
