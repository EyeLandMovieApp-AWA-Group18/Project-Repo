import React from 'react';
import './MovieCard.css';

const MovieCard = ({ movie }) => {
  const { backdrop_path, title, vote_average } = movie;

  // Base URL for the TMDB images
  const imageBaseUrl = 'https://image.tmdb.org/t/p/w500';

  return (
    <div className="movie-card">
      <img
        src={backdrop_path ? `${imageBaseUrl}${backdrop_path}` : 'https://via.placeholder.com/500x280'}
        alt={title}
        className="movie-backdrop"
      />
      <div className="movie-info">
        <h3 className="movie-title">{title}</h3>
        <p className="movie-rating">⭐ {vote_average.toFixed(1)}</p>
      </div>
    </div>
  );
};

export default MovieCard;
