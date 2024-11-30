import React, { useEffect, useState } from 'react';
import { useUser } from '../contexts/useUser.js';
import axios from 'axios';
import MovieCard from '../components/MovieCard';
import DeleteFavoriteButton from '../components/DeleteFavoriteButton';
import './FavoritesList.css';

const FavoritesList = () => {
  const { user } = useUser();
  const [favorites, setFavorites] = useState([]);
  const [movies, setMovies] = useState([]); 
  const API_BASE_URL = process.env.REACT_APP_API_URL;
  const TMDB_API_KEY = process.env.REACT_APP_TMDB_API_KEY;
  const TMDB_BASE_URL = 'https://api.themoviedb.org/3/movie';

  // Fetch favorites from your database
  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/favourites`, {
          headers: { Authorization: `Bearer ${user.token}` },
        });
        setFavorites(response.data);
      } catch (error) {
        console.error('Error fetching favorites:', error);
      }
    };

    if (user) {
      fetchFavorites();
    }
  }, [user, API_BASE_URL]);

  // Fetch movie details from TMDB for each favorite
  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const movieDetails = await Promise.all(
          favorites.map(async (favorite) => {
            const response = await axios.get(`${TMDB_BASE_URL}/${favorite.movie_id}`, {
              params: { api_key: TMDB_API_KEY },
            });
            return response.data;
          })
        );
        setMovies(movieDetails);
      } catch (error) {
        console.error('Error fetching movie details:', error);
      }
    };

    if (favorites.length > 0) {
      fetchMovieDetails();
    }
  }, [favorites, TMDB_API_KEY]);

  const handleDelete = (movieId) => {
    setFavorites(favorites.filter((movie) => movie.movie_id !== movieId));
    setMovies(movies.filter((movie) => movie.id !== movieId)); // Update detailed movies
  };

  return (
    <div className="favorites-grid">
     
      {movies.map((movie) => (
        <div key={movie.id} className="favorite-item">
          <MovieCard movie={movie} />
          <DeleteFavoriteButton movieId={movie.id} onDelete={handleDelete} />
        </div>
      ))}
    </div>
  );
};

export default FavoritesList;
