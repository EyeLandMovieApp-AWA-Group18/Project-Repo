import React, { useState } from 'react';
import FavoritesList from '../components/FavoritesList.js'; 
import { useUser } from '../contexts/useUser.js'; 
import ShareFavoritesButton from '../components/ShareFavoritesButton.js';
import './Profile.css';

const Profile = () => {
  const { user } = useUser();
  const [groups] = useState(['Group 1', 'Group 2']); // Sample groups
  
  const [watchlist] = useState([
    { name: 'Interstellar', posterUrl: 'https://picsum.photos/50/75?random=3' },
    { name: 'Fight Club', posterUrl: 'https://picsum.photos/50/75?random=4' },
  ]); // Sample watchlist with poster images

  return (
    <div className="profile-container">
      <div className="profile-header">
      
          <a href="/deleteAccount" className="delete-account-link">Want to remove account? Click here</a>
          <h2 className="profile-title">My Profile</h2>
      </div>
      
      {/* Username Section */}
      <div className="profile-section">
        <h3>Username</h3>
        <div className="separator"></div>
        <p>{user?.username || 'Guest'}</p>
      </div>
      
      
      {/* Favorite Movies Section */}
      <div className="profile-section">
      <h3>My Favorites</h3>
      <ShareFavoritesButton />
      <FavoritesList />
      </div>

      {/* Groups Section */}
      <div className="profile-section">
        <h3>Groups</h3>
        <div className="separator"></div>
        <ul>
          {groups.map((group, index) => (
            <li key={index}>{group}</li>
          ))}
        </ul>
      </div>
      
      {/* Watchlist Section */}
      <div className="profile-section">
        <h3>Watchlist</h3>
        <div className="separator"></div>
        <ul>
          {watchlist.map((movie, index) => (
            <li key={index} className="movie-item">
              <img src={movie.posterUrl} alt={`${movie.name} poster`} className="movie-poster" />
              <br/><span>{movie.name}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Profile;
