import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './home';
import LoginPage from './component/LoginPage';
import HeaderSection from './component/HeaderSection';
import Register from './component/RegisterPage';
import AboutSection from './component/AboutSection';
import Location from './component/location';
import ContactUs from './component/ContactUs';
import Booking from './booking';
import TicketsPage from './component/Booking/TicketsPage';
import LogoutPage from './component/LogoutPage';
import ProfilePage from './component/ProfilePage';
import HospitalSelector from './component/hospital';
import { UserProvider } from './component/UserContext';
const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  return (
    <UserProvider>
      <div>

        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/" element={<LoginPage />} />
          <Route path="/register" element={<Register />} />
          <Route path="/hospital" element={<HospitalSelector />} />
          <Route path="/about" element={<AboutSection />} />
          <Route path="/location" element={<Location />} />
          <Route path="/contact" element={<ContactUs />} />
          <Route path="/booking" element={<Booking />} />
          <Route path="/tickets" element={<TicketsPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/logout" element={<LogoutPage />} />
          <Route path="/HeaderSection" element={<HeaderSection />} />

        </Routes>
      </div>
    </UserProvider>
  );
};

export default App;
