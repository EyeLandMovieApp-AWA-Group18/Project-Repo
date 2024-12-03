import React, { useState } from 'react';
import '../App.css';

const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState('');

  const [filtersVisible, setFiltersVisible] = useState(false);
  const [filters, setFilters] = useState({
    year: '',
    language: '',
    region: '',
  });

  const languages = [
    { code: 'en', name: 'English' },
    { code: 'es', name: 'Spanish' },
    { code: 'fr', name: 'French' },
    { code: 'de', name: 'German' },
    { code: 'it', name: 'Italian' },
    { code: 'zh', name: 'Chinese' },
    { code: 'ja', name: 'Japanese' },
    { code: 'ko', name: 'Korean' },
    { code: 'hi', name: 'Hindi' },
    { code: 'ar', name: 'Arabic' },
  ];

  const regions = [
    { code: 'US', name: 'United States' },
    { code: 'IN', name: 'India' },
    { code: 'GB', name: 'United Kingdom' },
    { code: 'FR', name: 'France' },
    { code: 'DE', name: 'Germany' },
    { code: 'JP', name: 'Japan' },
    { code: 'KR', name: 'South Korea' },
    { code: 'CN', name: 'China' },
    { code: 'IT', name: 'Italy' },
    { code: 'ES', name: 'Spain' },
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFilters({ ...filters, [name]: value });
  };

  const toggleFilters = () => setFiltersVisible(!filtersVisible);

  const handleSearch = () => {
    const params = new URLSearchParams({ query });
    if (filters.year) params.append('primary_release_year', filters.year);
    if (filters.language) params.append('language', filters.language);
    if (filters.region) params.append('region', filters.region);

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
            name="year"
            value={filters.year}
            onChange={handleInputChange}
            placeholder="Release Year"
            min="1895"
          />
            <select
              name="language"
              value={filters.language}
              onChange={handleInputChange}
            >
              <option value="">All Languages</option>
              {languages.map((lang) => (
                <option key={lang.code} value={lang.code}>
                  {lang.name}
                </option>
              ))}
            </select>
            <select
              name="region"
              value={filters.region}
              onChange={handleInputChange}
            >
              <option value="">All Regions</option>
              {regions.map((reg) => (
                <option key={reg.code} value={reg.code}>
                  {reg.name}
                </option>
              ))}
            </select>
        </div>
      )}
      </div>
    </div>
  );
};

export default SearchBar;
