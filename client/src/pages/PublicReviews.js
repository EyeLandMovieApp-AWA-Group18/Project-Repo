import { useEffect, useState } from "react";

const PublicReviews = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await fetch(
          "http://localhost:5000/api/public-reviews"
        );
        if (!response.ok) {
          throw new Error("Failed to fetch reviews");
        }
        const data = await response.json();
        setReviews(data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchReviews();
  }, []);

  if (loading) return <p>Loading reviews...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <h1>All Reviews</h1>
      <ul>
        {reviews.map((review) => (
          <li key={review.id}>
            <h3>{review.film_title}</h3>
            <p>
              <strong>User:</strong> {review.user_email}
            </p>
            <strong>Rating:</strong> {review.rating}/5
            <p>{review.review_text}</p>
            <small>
              Posted on: {new Date(review.created_at).toLocaleString()}
            </small>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PublicReviews;
