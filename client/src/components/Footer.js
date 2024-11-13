import React from 'react';
import '../App.css'; 

function Footer() {
  return (
    <footer className="footer">
      <div className="footer_column">
        <img className="footer_logo" src={require('../assets/logo.png')} alt="Logo" />
        <div className="footer_socials">
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
            <img className="footer_social-icon" src={require('../assets/fb.png')} alt="Facebook" />
          </a>
          <a href="https://threads.net" target="_blank" rel="noopener noreferrer">
            <img className="footer_social-icon" src={require('../assets/threads.png')} alt="Threads" />
          </a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
            <img className="footer_social-icon" src={require('../assets/ig.png')} alt="Instagram" />
          </a>
          <a href="https://x.com" target="_blank" rel="noopener noreferrer">
            <img className="footer_social-icon" src={require('../assets/x.png')} alt="X" />
          </a>
        </div>
      </div>

      <div className="footer_column">
        <h3>Quick Links</h3>
        <ul>
          <li><a href="#cinema-info">Cinema Info</a></li>
          <li><a href="#privacy-policy">Privacy & Policy</a></li>
          <li><a href="#terms">Terms and Conditions</a></li>
        </ul>
      </div>

      <div className="footer_column">
        <h3>My EyeLand</h3>
        <ul>
          <li><a href="#profile">Profile</a></li>
          <li><a href="#about-us">About Us</a></li>
          <li><a href="#contact-us">Contact Us</a></li>
        </ul>
      </div>
    </footer>
  );
}

export default Footer;
