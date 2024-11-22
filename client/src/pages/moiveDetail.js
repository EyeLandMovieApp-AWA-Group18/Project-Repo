import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { fetchMovieDetails } from "../services/tmdbService";
import axios from "axios";
import ReviewList from "../components/ReviewList";
import { UserContext } from "../contexts/UserContext";

const MovieDetail = () => {
  const { id } = useParams();
  const { user } = useContext(UserContext);
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [reviews, setReviews] = useState([]);
  const [reviewText, setReviewText] = useState("");
  const [rating, setRating] = useState(1);
  const [showReviews, setShowReviews] = useState(false);
  const [message, setMessage] = useState({ text: "", type: "" }); // 控制提示消息

  useEffect(() => {
    const loadMovieDetails = async () => {
      const details = await fetchMovieDetails(id);
      setMovie(details);
      setLoading(false);
    };

    loadMovieDetails();
  }, [id]);

  useEffect(() => {
    const loadReviews = async () => {
      const response = await axios.get(
        `http://localhost:5000/api/reviews/${id}`
      );
      setReviews(response.data);
    };

    loadReviews();
  }, [id]);

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

      const response = await axios.get(
        `http://localhost:5000/api/reviews/${id}`
      );
      setReviews(response.data);
    } catch (err) {
      setMessage({
        text: "You must be logged in to write a review.",
        type: "error",
      });
      console.error("Error adding review:", err);
    }
  };

  if (loading) {
    return <div>Loading movie details...</div>;
  }

  if (!movie) {
    return <div>Movie details not found.</div>;
  }

  return (
    <div>
      <h1>{movie.title}</h1>
      <img
        src={`https://image.tmdb.org/t/p/w500${movie.backdrop_path}`}
        alt={movie.title}
      />
      <p>
        <strong>Overview:</strong> {movie.overview}
      </p>
      <p>
        <strong>Release Date:</strong> {movie.release_date}
      </p>
      <p>
        <strong>Rating:</strong> ⭐ {movie.vote_average}
      </p>

      <div style={{ marginBottom: "20px" }}>
        <h2>Write a Review</h2>
        {!user && (
          <p style={{ color: "red" }}>
            You must be logged in to write a review.
          </p>
        )}
        {user && (
          <>
            <textarea
              value={reviewText}
              onChange={(e) => setReviewText(e.target.value)}
              placeholder="Write your review here..."
              style={{
                width: "100%",
                height: "100px",
                padding: "10px",
                borderRadius: "5px",
                border: "1px solid #ddd",
                backgroundColor: "#f9f9f9",
                marginBottom: "10px",
              }}
            />
            <div>
              <label>Rating: </label>
              <select
                value={rating}
                onChange={(e) => setRating(Number(e.target.value))}
                style={{
                  padding: "5px",
                  borderRadius: "5px",
                  border: "1px solid #ddd",
                  backgroundColor: "#f9f9f9",
                  marginBottom: "10px",
                }}
              >
                {[1, 2, 3, 4, 5].map((star) => (
                  <option key={star} value={star}>
                    {star} star{star > 1 && "s"}
                  </option>
                ))}
              </select>
            </div>
            <button
              onClick={handleReviewSubmit}
              style={{
                marginTop: "10px",
                padding: "10px 20px",
                backgroundColor: "#4CAF50",
                color: "white",
                border: "none",
                borderRadius: "5px",
              }}
            >
              Submit Review
            </button>
          </>
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

      <div>
        <button
          onClick={() => setShowReviews(!showReviews)}
          style={{
            marginTop: "20px",
            padding: "10px 20px",
            backgroundColor: "#007BFF",
            color: "white",
            border: "none",
            borderRadius: "5px",
          }}
        >
          {showReviews ? "Hide Reviews" : "Show Reviews"}
        </button>

        {showReviews && (
          <div>
            <h2>Reviews</h2>
            <ReviewList reviews={reviews} />
          </div>
        )}
      </div>
    </div>
  );
};

export default MovieDetail;
