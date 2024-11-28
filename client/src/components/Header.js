import React, { useContext,useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../contexts/UserContext.js";
import { Link } from "react-router-dom";
import SearchBar from "./SearchBar.js";
import "../App.css";

function Header() {
  const [isMoviesMenuOpen, setMoviesMenuOpen] = useState(false);
  const { user, signOut } = useContext(UserContext); // Access user and signOut
  const navigate = useNavigate();

  const handleSearch = (query) => {
    // Redirect to search page with query as a parameter
    window.location.href = `/search?query=${encodeURIComponent(query)}`;
  };

  const toggleMoviesMenu = () => {
    setMoviesMenuOpen(!isMoviesMenuOpen);
  };

  const handleLoginClick = () => {
    navigate("/signin");
  };

  const handleSignOut = () => {
    signOut(); // Clear user context and session storage
    console.log("Session storage after logout:", sessionStorage.getItem("user")); 
    navigate("/signin"); // Redirect to login page
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
            {user && user.email && <Link to="/profile">Profile</Link>}
            {user && user.email && <Link to="/groups">Groups</Link>}
            <a href="#about-us">About Us</a>
          </nav>
          <div >
            {user && user.email ? (
              <>
                <button className="header_login" onClick={handleSignOut}>Log Out</button>
              </>
            ) : (
              <>
                <button className="header_login" onClick={handleLoginClick}>Log In</button>
                
              </>
            )}
          </div>
          
        </div>
        <div className="header__bottom-row">
          <SearchBar className="header_search" onSearch={handleSearch} />
        </div>
      </div>
    </header>
  );
}

export default Header;
/*<button className="header_login" onClick={handleLoginClick}>
Log In
</button>*/