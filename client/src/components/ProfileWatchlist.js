import React, { useEffect, useState } from 'react';
import { useUser } from '../contexts/useUser.js';
import axios from 'axios';
import MovieCard from '../components/MovieCard';
import './ProfileWatchlist.css';

const ProfileWatchlist = () => {
  const { user } = useUser();
  const [watchlist, setWatchlist] = useState([]);
  const [movies, setMovies] = useState([]);
  const API_BASE_URL = process.env.REACT_APP_API_URL;
  const TMDB_API_KEY = process.env.REACT_APP_TMDB_API_KEY;
  const TMDB_BASE_URL = 'https://api.themoviedb.org/3/movie';

  // Fetch watchlist from your database
  useEffect(() => {
    const fetchWatchlist = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/watchlist?limit=4`, {
          headers: { Authorization: `Bearer ${user.token}` },
        });
        setWatchlist(response.data);
      } catch (error) {
        console.error('Error fetching watchlist:', error);
      }
    };

    if (user) {
      fetchWatchlist();
    }
  }, [user, API_BASE_URL]);

  // Fetch movie details from TMDB for each watchlist item
  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const movieDetails = await Promise.all(
          watchlist.map(async (item) => {
            const response = await axios.get(`${TMDB_BASE_URL}/${item.movie_id}`, {
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

    if (watchlist.length > 0) {
      fetchMovieDetails();
    }
  }, [watchlist, TMDB_API_KEY]);

  

  return (
    <div className="profile-watchlist-grid">
      {movies.map((movie) => (
		
        <MovieCard key={movie.id} movie={movie} />
		
      ))}
    </div>
  );
};

export default ProfileWatchlist;
