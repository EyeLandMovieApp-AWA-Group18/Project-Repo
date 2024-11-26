import pool from "../database/db.js";
import axios from "axios";

const TMDB_API_KEY = process.env.TMDB_API_KEY;
const TMDB_API_URL = "https://api.themoviedb.org/3/movie/";

export const getAllPublicReviews = async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT reviews.id, reviews.review_text, reviews.rating, reviews.created_at, 
              reviews.film_id, users.email AS user_email
       FROM reviews
       JOIN users ON reviews.user_id = users.id
       ORDER BY reviews.created_at DESC`
    );

    console.log("Query Result:", result.rows);

    const reviewsWithFilmData = await Promise.all(
      result.rows.map(async (review) => {
        const { film_id, user_email, review_text, rating, created_at } = review;

        console.log(`Fetching data for film_id: ${film_id}`);

        const parsedFilmId = parseInt(film_id);
        if (isNaN(parsedFilmId)) {
          console.error(`Invalid film_id: ${film_id}`);
          return {
            film_title: "Unknown Film",
            rating: rating,
            review_text: review_text,
            user_email: user_email,
            created_at: created_at,
          };
        }

        try {
          const response = await axios.get(`${TMDB_API_URL}${parsedFilmId}`, {
            params: { api_key: TMDB_API_KEY },
          });

          console.log("TMDB API Response:", response.data);

          const film = response.data;

          return {
            film_title: film.title || "Unknown Film",
            rating: rating,
            review_text: review_text,
            user_email: user_email,
            created_at: created_at,
          };
        } catch (error) {
          console.error(
            `Error fetching movie data for film_id ${film_id}:`,
            error
          );
          return {
            film_title: "Unknown Film",
            rating: rating,
            review_text: review_text,
            user_email: user_email,
            created_at: created_at,
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
