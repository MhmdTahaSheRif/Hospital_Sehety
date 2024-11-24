import React, { useState }  from 'react';
import '../css/settings.css'
import HeaderSection from './HeaderSection';

const SettingsPage = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(true);

  return (
    <div>
               <HeaderSection isLoggedIn={isLoggedIn} />

    <div className="settings-container">
<h1> </h1>
      <section className="settings-section">
        <h2>Profile Settings</h2>
        <div className="setting-item">
          <label>Username</label>
          <input type="text" placeholder="Enter your username" />
        </div>
        <div className="setting-item">
          <label>Email</label>
          <input type="email" placeholder="Enter your email" />
        </div>
        <div className="setting-item">
          <label>Change Password</label>
          <input type="password" placeholder="Enter new password" />
        </div>
      </section>

      <section className="settings-section">
        <h2>Notifications</h2>
        <div className="setting-item">
          <label>Email Notifications</label>
          <input type="checkbox" />
        </div>
        <div className="setting-item">
          <label>SMS Notifications</label>
          <input type="checkbox" />
        </div>
      </section>

      <section className="settings-section">
        <h2>Theme Settings</h2>
        <div className="setting-item">
          <label>Dark Mode</label>
          <input type="checkbox" />
        </div>
        <div className="setting-item">
          <label>Font Size</label>
          <input type="range" min="12" max="24" />
        </div>
      </section>

      <section className="settings-section">
        <h2>Privacy Settings</h2>
        <div className="setting-item">
          <label>Allow tracking</label>
          <input type="checkbox" />
        </div>
        <div className="setting-item">
          <label>Location Access</label>
          <input type="checkbox" />
        </div>
      </section>

      <button className="save-button">Save Settings</button>
    </div></div>
  );
};

export default SettingsPage;
