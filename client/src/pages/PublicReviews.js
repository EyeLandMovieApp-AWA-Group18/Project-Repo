import { useState, useEffect } from "react";
import ReviewTitleSearchBar from "../components/ReviewTitleSearchBar";
import ReviewStarsSearchBar from "../components/ReviewStarsSearchBar";
import PublicReviewsItem from "../components/PublicReviewsItem";

const PublicReviews = () => {
  const [reviews, setReviews] = useState([]);
  const [filteredReviews, setFilteredReviews] = useState([]);
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
        setFilteredReviews(data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchReviews();
  }, []);

  const handleSearch = (title = "", rating = null) => {
    let filtered = reviews;
    if (title) {
      filtered = filtered.filter((review) =>
        review.film_title.toLowerCase().includes(title.toLowerCase())
      );
    }
    if (rating !== null) {
      filtered = filtered.filter(
        (review) => review.rating === parseInt(rating)
      );
    }
    setFilteredReviews(filtered);
  };

  if (loading) return <p>Loading reviews...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <h1>All Reviews</h1>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: "20px",
        }}
      >
        <ReviewTitleSearchBar onTitleChange={(title) => handleSearch(title)} />
        <ReviewStarsSearchBar
          onStarChange={(rating) => handleSearch("", rating)}
        />
      </div>
      <ul style={{ listStyle: "none", padding: 0 }}>
        {filteredReviews.map((review) => (
          <li key={review.id} style={{ marginBottom: "20px" }}>
            <PublicReviewsItem review={review} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PublicReviews;
