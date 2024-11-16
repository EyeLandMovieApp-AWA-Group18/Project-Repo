import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
//import SearchBar from '../components/SearchBar.js';
import { fetchMovies } from '../services/searchService.js';
import MovieCard from '../components/MovieCard.js';
import ReactPaginate from 'react-paginate';
import '../App.css';

const SearchPage = () => {
  const [searchParams] = useSearchParams();
  const [movies, setMovies] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const query = searchParams.get('query') || '';

  const handleSearch = async (searchQuery, page = 1) => {
    const data = await fetchMovies(searchQuery, page);
    setMovies(data.results || []);
    setTotalPages(data.total_pages || 0);
  };

  useEffect(() => {
    if (query) {
      handleSearch(query, currentPage);
    }
  }, [query, currentPage]);

  const handlePageClick = (event) => {
    const selectedPage = event.selected + 1; // `react-paginate` is zero-indexed
    setCurrentPage(selectedPage);
  };

  return (
    <div className="search-page">
      {/*<SearchBar onSearch={(q) => handleSearch(q)} />*/}
      {query && (
        <h2 className="search-results-text">Search results for: "{query}"</h2>
      )}
      {movies.length === 0 && query && (
        <p className="no-results-message">No movies found for "{query}". Please try a different keyword.</p>
      )}
      <div className="movie-grid">
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
      {/* Pagination component */}
      {totalPages > 1 && (
        <ReactPaginate
          previousLabel={'← Previous'}
          nextLabel={'Next →'}
          breakLabel={'...'}
          pageCount={totalPages}
          marginPagesDisplayed={2}
          pageRangeDisplayed={3}
          onPageChange={handlePageClick}
          containerClassName={'pagination'}
          pageClassName={'page-item'}
          pageLinkClassName={'page-link'}
          previousClassName={'page-item'}
          previousLinkClassName={'page-link'}
          nextClassName={'page-item'}
          nextLinkClassName={'page-link'}
          breakClassName={'page-item'}
          breakLinkClassName={'page-link'}
          activeClassName={'active'}
        />
      )}
    </div>
  );
};

export default SearchPage;
