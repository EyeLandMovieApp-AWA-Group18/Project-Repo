import axios from 'axios';

// Create an Axios instance with default configuration
const apiClient = axios.create({
  baseURL: 'https://api.themoviedb.org/3',
  headers: {
    accept: 'application/json',
    },
});

// Function to search movies by query
export const searchMovies = async (query) => {
  try {
    const response = await apiClient.get(`/search/movie`, {
      params: {
        query: query,
        language: 'en-US',
        page: 1,
      },
    });
    return response.data.results; // Return the list of movies
  } catch (error) {
    console.error('Error searching movies:', error);
    throw error;
  }
};

// Function to fetch movie details by ID
export const fetchMovieDetails = async (movieId) => {
  try {
    const response = await apiClient.get(`/movie/${movieId}`, {
      params: {
        language: 'en-US',
      },
    });
    return response.data; // Return movie details
  } catch (error) {
    console.error('Error fetching movie details:', error);
    throw error;
  }
};
