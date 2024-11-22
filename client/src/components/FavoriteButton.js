import React, { useState, useEffect } from 'react';
import { useUser } from '../contexts/useUser';
import axios from 'axios';
import "./FavoriteButton.css"; // Assuming a CSS file for styling

const FavoriteButton = ({ movieId }) => {
  const { user } = useUser();
  const [isFavorite, setIsFavorite] = useState(false);
  const API_BASE_URL = process.env.REACT_APP_API_URL;

  // Fetch the current favorite status when the component mounts
  useEffect(() => {
    const fetchFavoriteStatus = async () => {
      if (user && user.token) {
        try {
          const response = await axios.get(`${API_BASE_URL}/favourites`, {
            headers: { Authorization: `Bearer ${user.token}` },
          });
          const isFavorited = response.data.some((movie) => movie.movie_id === movieId);
          setIsFavorite(isFavorited);
        } catch (error) {
          console.error('Error checking favorite status:', error);
        }
      }else {
        setIsFavorite(false); // Reset to false if the user is not logged in
      }
    };

    fetchFavoriteStatus();
  }, [user, movieId,API_BASE_URL]);

  const handleFavoriteToggle = async () => {
    if (!user || !user.token) {
      alert('You need to be logged in to mark a movie as favorite.');
      return;
    }

    try {
      if (isFavorite) {
        // Remove from favorites
        await axios.delete(`${API_BASE_URL}/favourites/${movieId}`, {
          headers: { Authorization: `Bearer ${user.token}` },
        });
      } else {
        // Add to favorites
        await axios.post(
          `${API_BASE_URL}/favourites`,
          { movieId },
          { headers: { Authorization: `Bearer ${user.token}` } }
        );
      }
      setIsFavorite(!isFavorite);
    } catch (error) {
      console.error('Error toggling favorite:', error);
    }
  };

  return (
    <button 
      className={`favorite-button ${isFavorite ? 'favorited' : ''}`} 
      style={{ fontWeight: 'bold', color: 'black' }}
      onClick={handleFavoriteToggle}
    >
      <span 
        className="heart-symbol" 
        style={{ color: isFavorite ? 'red' : 'grey'}}
      >❤</span>
      {isFavorite ? 'Remove from Favorites' : ' Mark as Favorite'}
    </button>
  );
};

export default FavoriteButton;
