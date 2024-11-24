import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import MovieCard from '../components/MovieCard'; // Assuming you have a reusable MovieCard component
import './SharedFavoritesPage.css'; // Optional styling

const SharedFavoritesPage = () => {
  const { id } = useParams(); // Get the shared_id from the URL
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(null);
  const API_BASE_URL = process.env.REACT_APP_API_URL;

  useEffect(() => {
    const fetchSharedFavorites = async () => {
      try {
        // Fetch shared favorites from the backend
        const response = await axios.get(`${API_BASE_URL}/shared-favorites/${id}`);
        setMovies(response.data);
      } catch (error) {
        console.error('Error fetching shared favorites:', error);
        setError('Failed to load shared favorites.');
      }
    };

    fetchSharedFavorites();
  }, [id, API_BASE_URL]);

  if (error) {
    return <div className="error">{error}</div>;
  }

  if (movies.length === 0) {
    return <div className="loading">Loading shared favorites...</div>;
  }

  return (
    <div className="shared-favorites">
      <h2>Shared Favorites</h2>
      <div className="shared-favorites-grid">
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </div>
  );
};

export default SharedFavoritesPage;
