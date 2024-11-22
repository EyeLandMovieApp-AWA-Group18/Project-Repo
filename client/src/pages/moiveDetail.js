import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchMovieDetails } from '../services/tmdbService.js';
import FavoriteButton from '../components/FavoriteButton.js';
import './movieDetail.css';

const MovieDetail = () => {
  const { id } = useParams(); 
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadMovieDetails = async () => {
      const details = await fetchMovieDetails(id);
      setMovie(details);
      setLoading(false);
    };

    loadMovieDetails();
  }, [id]);

  if (loading) {
    return <div>Loading movie details...</div>;
  }

  if (!movie) {
    return <div>Movie details not found.</div>;
  }

  return (
    <div className="movie-detail">
    <div className="container">
      <h1>{movie.title}</h1>
      <img
        src={`https://image.tmdb.org/t/p/w500${movie.backdrop_path}`}
        alt={movie.title}
      />
      {/* Add the FavoriteButton here */}
      <FavoriteButton movieId={movie.id} />
      <p><strong>Overview:</strong> {movie.overview}</p>
      <p><strong>Release Date:</strong> {movie.release_date}</p>
      <p><strong>Rating:</strong> ⭐ {movie.vote_average}</p>
       
    </div>
    </div>
  );
};

export default MovieDetail;
