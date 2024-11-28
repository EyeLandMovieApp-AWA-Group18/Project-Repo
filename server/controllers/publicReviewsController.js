import pool from "../database/db.js";
import axios from "axios";

const TMDB_API_KEY = process.env.TMDB_API_KEY;
const TMDB_API_URL = "https://api.themoviedb.org/3/movie/";

export const getAllPublicReviews = async (req, res) => {
  const { rating, title } = req.query; // Extract rating and title from query params

  try {
    let query = `
      SELECT reviews.film_id, reviews.review_text, reviews.rating, reviews.created_at, 
             reviews.film_id, users.email AS user_email
      FROM reviews
      JOIN users ON reviews.user_id = users.id
    `;
    let queryParams = [];

    // Apply filtering based on title and rating
    if (title) {
      query += ` WHERE LOWER(reviews.film_title) LIKE LOWER($1)`;
      queryParams.push(`%${title}%`);
    }

    if (rating) {
      // If both title and rating are provided, use AND to combine the conditions
      query += title
        ? ` AND reviews.rating = $2`
        : ` WHERE reviews.rating = $1`;
      queryParams.push(rating);
    }

    // Sorting reviews by creation date
    query += ` ORDER BY reviews.created_at DESC`;

    const result = await pool.query(query, queryParams);

    const reviewsWithFilmData = await Promise.all(
      result.rows.map(async (review) => {
        const { film_id, user_email, review_text, rating, created_at } = review;

        try {
          const response = await axios.get(`${TMDB_API_URL}${film_id}`, {
            params: { api_key: TMDB_API_KEY },
          });

          const film = response.data;

          return {
            film_id: review.film_id,
            film_title: film.title || "Unknown Film",
            poster_url: film.poster_path
              ? `https://image.tmdb.org/t/p/w500${film.poster_path}`
              : null,
            rating,
            review_text,
            user_email,
            created_at,
          };
        } catch (error) {
          console.error(
            `Error fetching movie data for film_id ${film_id}:`,
            error
          );
          return {
            film_id: review.film_id,
            film_title: "Unknown Film",
            poster_url: null,
            rating,
            review_text,
            user_email,
            created_at,
          };
        }
      })
    );

    res.json(reviewsWithFilmData);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch public reviews" });
  }
};
