import React, { useState } from 'react';
import '../App.css';

const MovieDetail = () => {
  const [movies] = useState([
    {
      title: 'Inception',
      rating: '8.8',
      posterUrl: 'https://picsum.photos/100/150?random=1',
      showtime: 'No information available',
    },
    {
      title: 'The Matrix',
      rating: '8.7',
      posterUrl: 'https://picsum.photos/100/150?random=2',
      showtime: 'No information available',
    },
    {
      title: 'Interstellar',
      rating: '8.6',
      posterUrl: 'https://picsum.photos/100/150?random=3',
      showtime: 'No information available',
    },
  ]);

  return (
    <div className="movie">
      <h2>Movies Information</h2>
      <div className="movie-grid">
        {movies.map((movie, index) => (
          <div key={index} className="movie-item">
            <img src={movie.posterUrl} alt={`${movie.title} poster`} className="movie-poster" />
            <h3>{movie.title}</h3>
            <p>Rating: {movie.rating}</p>
            <p>Showtime: {movie.showtime}</p>
            <button onClick={() => alert(`More info about ${movie.title}`)}>More Info</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MovieDetail;
