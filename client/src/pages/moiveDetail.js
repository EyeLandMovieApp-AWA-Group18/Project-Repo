import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { fetchMovieDetails } from "../services/tmdbService";
import axios from "axios";
import ReviewList from "../components/ReviewList";
import { UserContext } from "../contexts/UserContext";
import FavoriteButton from "../components/FavoriteButton";
import RatingSelector from "../components/RatingSelector";
import "./movieDetail.css";

const MovieDetail = () => {
  const { id } = useParams();
  const { user } = useContext(UserContext);
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [reviews, setReviews] = useState([]);
  const [reviewText, setReviewText] = useState("");
  const [rating, setRating] = useState(1);
  const [message, setMessage] = useState({ text: "", type: "" });
  const [showReviews, setShowReviews] = useState(false);

  useEffect(() => {
    const loadMovieDetails = async () => {
      const details = await fetchMovieDetails(id);
      setMovie(details);
      setLoading(false);
    };

    loadMovieDetails();
  }, [id]);

  const loadUserReviews = async () => {
    try {
      if (user) {
        const response = await axios.get(
          `http://localhost:5000/api/reviews/${id}?user_id=${user.id}`
        );
        const sortedReviews = response.data.sort(
          (a, b) => new Date(b.created_at) - new Date(a.created_at)
        );
        setReviews(sortedReviews);
      } else {
        setReviews([]);
      }
    } catch (error) {
      console.error("Failed to load reviews:", error);
    }
  };

  const handleReviewSubmit = async () => {
    if (!user) {
      setMessage({
        text: "You must be logged in to write a review.",
        type: "error",
      });
      setTimeout(() => setMessage({ text: "", type: "" }), 3000);
      return;
    }

    const newReview = {
      user_id: user.id,
      rating,
      review_text: reviewText,
    };

    try {
      await axios.post(`http://localhost:5000/api/reviews/${id}`, newReview);
      setReviewText("");
      setRating(1);
      setMessage({ text: "Comment submitted successfully.", type: "success" });
      setTimeout(() => setMessage({ text: "", type: "" }), 3000);
      await loadUserReviews(); // Refresh reviews
    } catch (err) {
      setMessage({
        text: "You must be logged in to write a review.",
        type: "error",
      });
      console.error("You must be logged in to write a review:", err);
    }
  };

  const handleDeleteReview = async (reviewId) => {
    try {
      await axios.delete(
        `http://localhost:5000/api/reviews/${reviewId}?user_id=${user.id}`
      );
      setReviews(reviews.filter((review) => review.id !== reviewId));
    } catch (err) {
      console.error("Error deleting review:", err);
    }
  };

  const toggleShowReviews = () => {
    if (showReviews) {
      setShowReviews(false);
    } else {
      loadUserReviews();
      setShowReviews(true);
    }
  };

  if (loading) return <div>Loading movie details...</div>;

  if (!movie) return <div>Movie details not found.</div>;

  return (
    <div className="movie-detail">
      <div className="container">
        <h1>{movie.title}</h1>
        <img
          src={`https://image.tmdb.org/t/p/w500${movie.backdrop_path}`}
          alt={movie.title}
          className="movie-image"
        />
        <FavoriteButton movieId={movie.id} />
        <p>
          <strong>Overview:</strong> {movie.overview}
        </p>
        <p>
          <strong>Release Date:</strong> {movie.release_date}
        </p>
        <p>
          <strong>Rating:</strong> ⭐ {movie.vote_average}
        </p>

        <div className="review-section">
          <div className="review-header">
            <h2>Write a Review</h2>
          </div>
          {!user ? (
            <p style={{ color: "red" }}>
              You must be logged in to write a review.
            </p>
          ) : (
            <div className="review-form">
              <textarea
                value={reviewText}
                onChange={(e) => setReviewText(e.target.value)}
                placeholder="Write your review here..."
                className="review-textarea"
              />
              <RatingSelector rating={rating} setRating={setRating} />
              <button onClick={handleReviewSubmit} className="submit-button">
                Submit Review
              </button>
            </div>
          )}
          {message.text && (
            <p
              style={{
                color: message.type === "error" ? "red" : "green",
                marginTop: "10px",
                fontWeight: "bold",
              }}
            >
              {message.text}
            </p>
          )}
        </div>
        <div className="spacer"></div>
        <button onClick={toggleShowReviews} className="show-reviews-button">
          {showReviews ? "Hide Reviews" : "Show Reviews"}
        </button>
        {showReviews && (
          <ReviewList reviews={reviews} onDeleteReview={handleDeleteReview} />
        )}
      </div>
    </div>
  );
};

export default MovieDetail;
