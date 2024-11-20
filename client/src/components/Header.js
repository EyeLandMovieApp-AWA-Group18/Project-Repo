import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import SearchBar from "./SearchBar.js";
import "../App.css";

function Header() {
  const [isMoviesMenuOpen, setMoviesMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleSearch = (query) => {
    // Redirect to search page with query as a parameter
    window.location.href = `/search?query=${encodeURIComponent(query)}`;
  };

  const toggleMoviesMenu = () => {
    setMoviesMenuOpen(!isMoviesMenuOpen);
  };

  const handleLoginClick = () => {
    navigate("/auth");
  };

  return (
    <header className="header">
      <div className="header__content">
        <div className="header__top-row">
          <img
            className="logo_img"
            src={require("../assets/logo.png")}
            alt="Logo"
          />
          <nav className="header_menu">
            <a href="/">Home</a>
            <div
              className="header_menu-item"
              onMouseEnter={toggleMoviesMenu}
              onMouseLeave={toggleMoviesMenu}
            >
              <a href="#movies">Movies</a>
              {isMoviesMenuOpen && (
                <div className="dropdown-menu">
                  <a href="#popular">Popular</a>
                  <a href="#top-rated">Top Rated</a>
                  <a href="#upcoming">Upcoming</a>
                  <a href="#now-playing">Now Playing</a>
                </div>
              )}
            </div>
            <Link to="/showtimes">Show Times</Link>
            <a href="#about-us">About Us</a>
          </nav>
          <button className="header_login" onClick={handleLoginClick}>
            Log In
          </button>
        </div>
        <div className="header__bottom-row">
          <SearchBar className="header_search" onSearch={handleSearch} />
        </div>
      </div>
    </header>
  );
}

export default Header;
