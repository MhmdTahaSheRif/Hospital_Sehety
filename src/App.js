import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './home';
import LoginPage from './component/LoginPage';
import HeaderSection from './component/HeaderSection';
import Register from './component/RegisterPage';
import Community from './component/Community';
import Location from './component/location';
import Booking from './booking';
import TicketsPage from './component/Booking/TicketsPage';
import LogoutPage from './component/LogoutPage';
import ProfilePage from './component/ProfilePage';
import HospitalSelector from './component/hospital';
import Settings from './component/settings';
import Video from './component/video';
import { UserProvider } from './component/UserContext';
import MedicineSearch from './component/MedicineSearch';
import PostsPage from './component/PostsPage';
import SickHistory from './component/sickhistory';
const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  return (
    <UserProvider>
      <div>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/settings" element={< Settings />} />
          <Route path="/register" element={<Register />} />
          <Route path="/hospital" element={<HospitalSelector />} />
          <Route path="/community" element={<Community />} />
          <Route path="/location" element={<Location />} />
          <Route path="/posts" element={<PostsPage />} />
          <Route path="/sickhistory" element={<SickHistory />} />
          <Route path="/booking" element={<Booking />} />
          <Route path="/tickets" element={<TicketsPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/logout" element={<LogoutPage />} />
          <Route path="/HeaderSection" element={<HeaderSection />} />
          <Route path="/MedicineSearch" element={<MedicineSearch />} />

        </Routes>
      </div>
    </UserProvider>
  );
};

export default App;
