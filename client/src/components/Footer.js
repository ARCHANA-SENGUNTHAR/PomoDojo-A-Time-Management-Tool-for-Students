import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <p>© {new Date().getFullYear()} 🍅 PomoDojo | Built with ❤️ for productivity</p>
    </footer>
  );
};

export default Footer;
