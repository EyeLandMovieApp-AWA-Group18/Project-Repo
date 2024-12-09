import { useState, useEffect } from "react";
import ReviewTitleSearchBar from "../components/ReviewTitleSearchBar";
import ReviewStarsSearchBar from "../components/ReviewStarsSearchBar";
import PublicReviewsItem from "../components/PublicReviewsItem";
import "./PublicReviews.css";

const PublicReviews = () => {
  const [reviews, setReviews] = useState([]);
  const [filteredReviews, setFilteredReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState(""); // Track search term
  const [selectedRating, setSelectedRating] = useState(null); // Track selected star rating, default to null
  const BASE_URL = `${process.env.REACT_APP_API_URL}/public-reviews`;
  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await fetch(
          BASE_URL
        );
        if (!response.ok) {
          throw new Error("Failed to fetch reviews");
        }
        const data = await response.json();
        setReviews(data);
        setFilteredReviews(data); // Initially set filtered reviews to all
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchReviews();
  }, []);

  const handleSearch = (title = "", rating = null) => {
    // Update search term and rating state
    setSearchTerm(title);
    setSelectedRating(rating);

    // Filter reviews based on both title and rating
    let filtered = reviews;

    if (title) {
      filtered = filtered.filter((review) =>
        review.film_title.toLowerCase().includes(title.toLowerCase())
      );
    }

    if (rating !== null) {
      // Only filter by rating if it's not null
      filtered = filtered.filter(
        (review) => review.rating === parseInt(rating)
      );
    }

    setFilteredReviews(filtered); // Set filtered reviews
  };

  if (loading) return <p>Loading reviews...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="public-reviews">
      <h1 className="public-reviews__title">Reviews</h1>
      <div className="public-reviews__search-bar">
        <ReviewTitleSearchBar
          onTitleChange={(title) => handleSearch(title, selectedRating)}
        />
        <ReviewStarsSearchBar
          onStarChange={(rating) => handleSearch(searchTerm, rating)}
        />
      </div>
      <ul className="public-reviews__list">
        {filteredReviews.map((review) => (
          <li key={review.id} className="public-reviews__list-item">
            <PublicReviewsItem review={review} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PublicReviews;
