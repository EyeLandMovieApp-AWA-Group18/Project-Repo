import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api';

export const fetchMovies = async (query, page = 1, filters = {}) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/search`, {
      params: { query, page, ...filters },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching movies:", error);
    return { results: [], total_pages: 0 };
  }
};
