import React from "react";

const RatingSelector = ({ rating, setRating }) => {
  const handleStarClick = (starRating) => {
    setRating(starRating);
  };

  return (
    <div className="rating-selector">
      <label htmlFor="rating" className="rating-label">
        Rating:{" "}
      </label>
      <div className="star-rating">
        {[1, 2, 3, 4, 5].map((star) => (
          <span
            key={star}
            className={`star ${rating >= star ? "selected" : ""}`}
            onClick={() => handleStarClick(star)}
          >
            ★
          </span>
        ))}
      </div>
    </div>
  );
};

export default RatingSelector;
