import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom'; // استيراد BrowserRouter
import App from './App'; // استيراد المكون الرئيسي

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter> {/* وضع BrowserRouter هنا فقط */}
      <App />
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);
