import React, { useState } from 'react';
import FavoritesList from '../components/FavoritesList'; // Import FavoritesList
import { useUser } from '../contexts/useUser'; // Import useUser for username
import '../App.css';

const Profile = () => {
  const { user } = useUser();
  const [groups] = useState(['Group 1', 'Group 2']); // Sample groups
  
  const [watchlist] = useState([
    { name: 'Interstellar', posterUrl: 'https://picsum.photos/50/75?random=3' },
    { name: 'Fight Club', posterUrl: 'https://picsum.photos/50/75?random=4' },
  ]); // Sample watchlist with poster images

  return (
    <div className="profile-container">
      <h2>My Profile</h2>
      
      {/* Username Section */}
      <div className="profile-section">
        <h3>Username</h3>
        <div className="separator"></div>
        <p>{user?.username || 'Guest'}</p>
      </div>
      
      
      {/* Favorite Movies Section */}
      <div className="profile-section">
      <h3>My Favorites</h3>
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
