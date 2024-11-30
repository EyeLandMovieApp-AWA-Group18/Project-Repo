import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useUser } from '../contexts/useUser';
import MovieCard from './MovieCard';
import './GroupMovies.css';

const GroupMovies = ({ groupId }) => {
  const { user } = useUser();
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isGroupOwner, setIsGroupOwner] = useState(false);
  const API_BASE_URL = process.env.REACT_APP_API_URL;
  const TMDB_API_KEY = process.env.REACT_APP_TMDB_API_KEY;
  const TMDB_BASE_URL = 'https://api.themoviedb.org/3/movie';

  useEffect(() => {
    const fetchGroupData = async () => {
      try {
        // Fetch group details to check if user is owner
        const groupResponse = await axios.get(
          `${API_BASE_URL}/groups/${groupId}`,
          {
            headers: { Authorization: `Bearer ${user.token}` },
          }
        );
        setIsGroupOwner(groupResponse.data.owner_id === user.id);

        // Fetch movies from your backend
        const response = await axios.get(
          `${API_BASE_URL}/groups/${groupId}/movies`,
          {
            headers: { Authorization: `Bearer ${user.token}` },
          }
        );

        // Fetch detailed movie information from TMDB
        const movieDetails = await Promise.all(
          response.data.map(async (movie) => {
            try {
              const tmdbResponse = await axios.get(
                `${TMDB_BASE_URL}/${movie.movie_id}`,
                {
                  params: { api_key: TMDB_API_KEY },
                }
              );
              return {
                ...tmdbResponse.data,
                shared_by: movie.shared_by,
                shared_at: new Date(movie.shared_at).toLocaleString(),
              };
            } catch (error) {
              console.error(`Error fetching movie ${movie.movie_id} details:`, error);
              // Return basic movie info if TMDB fetch fails
              return {
                id: movie.movie_id,
                title: movie.title || `Movie ${movie.movie_id}`,
                vote_average: 0,
                poster_path: null,
                shared_by: movie.shared_by,
                shared_at: new Date(movie.shared_at).toLocaleString(),
              };
            }
          })
        );

        setMovies(movieDetails);
        setError(null);
      } catch (error) {
        console.error('Error fetching group movies:', error);
        setError('Failed to load group movies');
      } finally {
        setLoading(false);
      }
    };

    if (user?.token && groupId) {
      fetchGroupData();
    }
  }, [groupId, user, API_BASE_URL, TMDB_API_KEY]);

  const handleMovieDeleted = (movieId) => {
    setMovies(movies.filter(movie => movie.id !== movieId));
  };

  if (loading) {
    return <div className="group-movies-loading">Loading movies...</div>;
  }

  if (error) {
    return <div className="group-movies-error">{error}</div>;
  }

  if (movies.length === 0) {
    return (
      <div className="group-movies-empty">
        <p>No movies have been shared in this group yet.</p>
        <p className="suggestion">Share some movies with your group members!</p>
      </div>
    );
  }

  return (
    <div className="group-movies">
      <div className="group-movies-grid">
        {movies.map((movie) => (
          <MovieCard 
            key={movie.id} 
            movie={movie} 
            sharedBy={movie.shared_by}
            sharedAt={movie.shared_at}
            groupId={groupId}
            isGroupOwner={isGroupOwner}
            onMovieDeleted={handleMovieDeleted}
          />
        ))}
      </div>
    </div>
  );
};

export default GroupMovies;
