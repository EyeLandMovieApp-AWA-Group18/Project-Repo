import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
//import SearchBar from '../components/SearchBar.js';
import { fetchMovies } from '../services/searchService.js';
import MovieCard from '../components/MovieCard.js';
import ReactPaginate from 'react-paginate';
import './searchPage.css';

const SearchPage = () => {
  const [searchParams] = useSearchParams();
  const [movies, setMovies] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const query = searchParams.get('query') || '';
  const primaryReleaseYear = searchParams.get('primary_release_year') || null;
  const language = searchParams.get('language') || '';
  const region = searchParams.get('region') || '';

  const handleSearch = async () => {
    setIsLoading(true); // Start loading
    const filters = { primary_release_year: primaryReleaseYear, language, region }; 
    try {
    const data = await fetchMovies(query, currentPage, filters); 
    setMovies(data.results);
    console.log("Total Pages from Backend:", data.total_pages);
    setTotalPages(data.total_pages > 0 ? data.total_pages : 1);
  }  catch (error) {
    console.error("Error fetching movies:", error);
  } finally {
    setIsLoading(false); // End loading
    }};

  useEffect(() => {
    if (query) {
      handleSearch();
    }
  }, [query, primaryReleaseYear, language, region, currentPage]);

  const handlePageClick = (event) => {
    const selectedPage = event.selected + 1; // `react-paginate` is zero-indexed
    setCurrentPage(selectedPage);
  };

  return (
    <div className="search-page">
      {/*<SearchBar onSearch={(q) => handleSearch(q)} />*/}
      {isLoading ? (
      <p className="loading-message">It's loading now, please wait...</p>
    ) : (
    <>
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
      {totalPages > 0 && (
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
          forcePage={currentPage - 1}
        />
      )}
    </>
    )}
    </div>
  );
};

export default SearchPage;
