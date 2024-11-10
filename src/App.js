import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './home'; 
import LoginPage from './component/LoginPage'; 
import HeaderSection from './component/HeaderSection';
import Register from './component/RegisterPage';
import AboutSection from './component/AboutSection';
import Location from './component/location';
import ContactUs from './component/ContactUs';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  return (
    <div>

      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/" element={<Register />} />
        <Route path="/about" element={<AboutSection />} /> 
        <Route path="/location" element={<Location />} />
        <Route path="/contact" element={<ContactUs />} />
        <Route path="/HeaderSection" element={<HeaderSection />} />

      </Routes>
    </div>
  );
};

export default App;
