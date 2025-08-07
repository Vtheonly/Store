// src/components/Footer/Footer.jsx

import React from "react";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <p>© {new Date().getFullYear()} StyleShop. Made with ❤️ for fashion lovers.</p>
      </div>
    </footer>
  );
};

export default Footer;
