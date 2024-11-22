import pool from "../database/db.js";

// Controller to get reviews for a specific movie
export const getReviews = async (req, res) => {
  const { film_id } = req.params;

  try {
    // 修改查询，增加了 `user_email`
    const result = await pool.query(
      `SELECT reviews.id, reviews.review_text, reviews.rating, reviews.created_at, users.email AS user_email
       FROM reviews
       JOIN users ON reviews.user_id = users.id
       WHERE reviews.film_id = $1
       ORDER BY reviews.created_at DESC`,
      [film_id]
    );
    res.json(result.rows); // 返回评论列表，包括用户邮箱
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch reviews" });
  }
};

// Controller to add a review for a movie
export const addReview = async (req, res) => {
  const { film_id } = req.params;
  const { user_id, rating, review_text } = req.body;

  try {
    const result = await pool.query(
      "INSERT INTO reviews (film_id, user_id, rating, review_text) VALUES ($1, $2, $3, $4) RETURNING *",
      [film_id, user_id, rating, review_text]
    );
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to add review" });
  }
};
