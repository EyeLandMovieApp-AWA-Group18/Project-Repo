import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const TMDB_BASE_URL = 'https://api.themoviedb.org/3';
const API_KEY = process.env.TMDB_API_KEY;

// Create an instance of Axios with the base URL and API key
const tmdbClient = axios.create({
  baseURL: TMDB_BASE_URL,
  params: {
    api_key: API_KEY,
  },
});

/**
 * Function to search for movies using TMDB API
 * @param {string} query - The search query
 * @param {number} page - The page number for pagination
 * @returns {Promise} - Returns a promise with the search results
 */
async function searchMovies(query, page = 1, filters = {}) {
  try {
    let allResults = [];
    let currentPage = 1;
    let totalPages = 1;
    const maxPages = 5; 
    do {
      const response = await tmdbClient.get('/search/movie', {
        params: { query, page: currentPage },
      });

      allResults = allResults.concat(response.data.results);
      totalPages = response.data.total_pages; // Update total pages from API
      currentPage++;
    } while (currentPage <= totalPages && currentPage <= maxPages);

    // Apply filters locally
    const filteredResults = allResults.filter((movie) => {
      const releaseYear = parseInt(movie.release_date?.split('-')[0] || '');
      return (
        (!filters.yearFrom || releaseYear >= filters.yearFrom) &&
        (!filters.yearTo || releaseYear <= filters.yearTo) &&
        (!filters.genre || movie.genre_ids.includes(parseInt(filters.genre))) &&
        (!filters.rating || movie.vote_average >= parseFloat(filters.rating))
      );
    });

     // Calculate total pages for filtered results
    const filteredTotalPages = Math.max(1, Math.ceil(filteredResults.length / 20));

    // Paginate filtered results for the requested page
    const paginatedResults = filteredResults.slice((page - 1) * 20, page * 20);
     return { results: paginatedResults, total_pages: filteredTotalPages };
  } catch (error) {
    console.error("Error fetching data from TMDB:", error.message);
    throw error;
  }
}

export {searchMovies};