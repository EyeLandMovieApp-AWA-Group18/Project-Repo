import React, { useState } from 'react';
import '../App.css';

const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState('');

  const [filtersVisible, setFiltersVisible] = useState(false);
  const [filters, setFilters] = useState({ yearFrom: '', yearTo: '', genre: '', rating: '' });

  const genres = [
  { id: 18, name: 'Drama' },
  { id: 28, name: 'Action' },
  { id: 35, name: 'Comedy' },
  { id: 27, name: 'Horror' },
  { id: 12, name: 'Adventure' },
  { id: 16, name: 'Animation' },
  { id: 80, name: 'Crime' },
  { id: 99, name: 'Documentary' },
  { id: 14, name: 'Fantasy' }
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    // Apply constraints for  rating
    if (name === 'rating') {
      const rating = parseFloat(value);
      if (rating < 0 || rating > 10) return; // Prevent rating outside 0-10
    }

    setFilters({ ...filters, [name]: value });
  };

  const toggleFilters = () => setFiltersVisible(!filtersVisible);

  const handleSearch = () => {
    const params = new URLSearchParams({ query });
    if (filters.yearFrom) params.append('yearFrom', filters.yearFrom);
    if (filters.yearTo) params.append('yearTo', filters.yearTo);
    if (filters.genre) params.append('genre', filters.genre);
    if (filters.rating) params.append('rating', filters.rating);

    if (onSearch) {
      onSearch(params.toString()); // Pass constructed query parameters to parent
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className="header_search">
      <div>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={handleKeyDown}  
        placeholder="Search movies..."
        className="search-input"
      />
      <button onClick={handleSearch} className="search-button">Search</button>
      </div>
      <div>
      <button onClick={toggleFilters} className="toggle-filters-button">
        {filtersVisible ? 'Hide Filters' : 'Show Filters'}
      </button>
      {filtersVisible && (
        <div className="filters-section">
          <input
            type="number"
            name="yearFrom"
            value={filters.yearFrom}
            onChange={handleInputChange}
            placeholder="From Year"
            min="1895"
          />
          <input
            type="number"
            name="yearTo"
            value={filters.yearTo}
            onChange={handleInputChange}
            placeholder="To Year"
            min="1895"
          />
          <select name="genre" value={filters.genre} onChange={handleInputChange}>
            <option value="">All Genres</option>
            {genres.map((g) => (
              <option key={g.id} value={g.id}>
                {g.name}
              </option>
            ))}
          </select>
          <input
            type="number"
            step="1"
            name="rating"
            value={filters.rating}
            onChange={handleInputChange}
            placeholder="Min Rating"
            min="0"
            max="10"
          />
        </div>
      )}
      </div>
    </div>
  );
};

export default SearchBar;
