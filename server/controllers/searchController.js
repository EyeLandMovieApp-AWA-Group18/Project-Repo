import { searchMovies } from '../services/tmdbService.js';

/**
 * Controller to handle searching movies
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
async function searchController(req, res) {
  const { query, page , yearFrom, yearTo, genre, rating} = req.query;

  if (!query) {
    return res.status(400).json({ error: 'Search query is required' });
  }

  try {
    const results = await searchMovies(query, page,{ yearFrom, yearTo, genre, rating });
    res.status(200).json(results);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch movies from TMDB' });
  }
}

export default searchController;
