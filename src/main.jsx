// src/main.jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from "react-router-dom";
import App from './App';
import "bootstrap/dist/css/bootstrap.min.css"; //css du bootst
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { HelmetProvider } from "react-helmet-async";

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
    <HelmetProvider>
      <App />
    </HelmetProvider>
    </BrowserRouter>
  </React.StrictMode>
);

 