import React from 'react';
import logo from '../images/logo1.png';

const LoadingPage = () => {
  return (
    <div className="loading-container">
      <div className="loading-content">
        <img src={logo} alt="Logo" className="loading-logo" />
        <div className="loading-spinner"></div>
        <h2 className="loading-text">جاري تحميل المنصة...</h2>
      </div>
    </div>
  );
};

export default LoadingPage;
