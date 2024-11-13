import React from 'react';
import '../App.css'; 

function Header() {
  return (
    <header className="header">
      <div className="header__logo">
        <img className="logo_img" src={require('../assets/logo.png')} alt="Logo" />
      </div>
      <nav className="header_menu">
        <a href="#home">Home</a>
        <a href="#movies">Movies</a>
        <a href="#coming-soon">Coming Soon</a>
        <a href="#about-us">About Us</a>
      </nav>
      <div className="header_search">
        <input type="text" placeholder="Search movies..." />
      </div>
      <button className="header_login">Log In</button>
    </header>
  );
}

export default Header;
