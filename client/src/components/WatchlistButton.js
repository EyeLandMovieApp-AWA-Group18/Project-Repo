import React, { useState, useEffect } from 'react';
import { useUser } from '../contexts/useUser';
import axios from 'axios';
import './WatchlistButton.css';

const WatchlistButton = ({ movieId }) => {
  const { user } = useUser();
  const [isInWatchlist, setIsInWatchlist] = useState(false);
  const API_BASE_URL = process.env.REACT_APP_API_URL;

  useEffect(() => {
    const fetchWatchlistStatus = async () => {
      if (user && user.token) {
        try {
          const response = await axios.get(`${API_BASE_URL}/watchlist`, {
            headers: { Authorization: `Bearer ${user.token}` },
          });
          const isWatchlisted = response.data.some((movie) => movie.movie_id === movieId);
          setIsInWatchlist(isWatchlisted);
        } catch (error) {
          console.error('Error checking watchlist status:', error);
        }
      } else {
        setIsInWatchlist(false);
      }
    };

    fetchWatchlistStatus();
  }, [user, movieId, API_BASE_URL]);

  const handleWatchlistToggle = async () => {
    if (!user || !user.token) {
      alert('You need to be logged in to manage your watchlist.');
      return;
    }

    try {
      if (isInWatchlist) {
        await axios.delete(`${API_BASE_URL}/watchlist/${movieId}`, {
          headers: { Authorization: `Bearer ${user.token}` },
        });
      } else {
        await axios.post(
          `${API_BASE_URL}/watchlist`,
          { movieId },
          { headers: { Authorization: `Bearer ${user.token}` } }
        );
      }
      setIsInWatchlist(!isInWatchlist);
    } catch (error) {
      console.error('Error toggling watchlist:', error);
    }
  };

  return (
    <button
      className="watchlist-button"
      
      onClick={handleWatchlistToggle}
    >
      {isInWatchlist ? 'In Your Watchlist' : 'Add to Watchlist'}
    </button>
  );
};

export default WatchlistButton;
