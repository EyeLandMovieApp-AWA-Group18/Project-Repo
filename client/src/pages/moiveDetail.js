import React, { useState } from 'react';

const MovieDetail = () => {
  const [search, setSearch] = useState('');
  const [movies, setMovies] = useState([
    { title: 'Inception', rating: '8.8' },
    { title: 'The Matrix', rating: '8.7' },
    { title: 'Interstellar', rating: '8.6' },
  ]);

  const handleSearch = () => {
    // Search logic here
  };

  return (
    <div>
      <h2>Movies Information</h2>
      <input type="text" placeholder="Search movies..." value={search} onChange={(e) => setSearch(e.target.value)} />
      <button onClick={handleSearch}>Search</button>
      <div className="movie-grid">
        {movies.map((movie, index) => (
          <div key={index} className="movie-item">
            <h3>{movie.title}</h3>
            <p>Rating: {movie.rating}</p>
            <button>More Info</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MovieDetail;
