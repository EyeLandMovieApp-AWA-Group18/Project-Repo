import React, { useState } from "react";
import "./ReviewStarsSearchBar.css";

const ReviewStarsSearchBar = ({ onStarChange }) => {
  const [selectedStar, setSelectedStar] = useState(5);

  const handleStarChange = (event) => {
    const newStar = Number(event.target.value);
    setSelectedStar(newStar);
    onStarChange(newStar);
  };

  return (
    <div className="review-stars-search-bar">
      <select
        value={selectedStar}
        onChange={handleStarChange}
        className="review-stars-search-bar__dropdown"
      >
        {[5, 4, 3, 2, 1].map((star) => (
          <option key={star} value={star}>
            {star} Star{star > 1 && "s"}
          </option>
        ))}
      </select>
    </div>
  );
};

export default ReviewStarsSearchBar;
