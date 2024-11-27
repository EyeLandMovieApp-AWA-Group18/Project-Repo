import React, { useState } from "react";
import "./ReviewStarsSearchBar.css";

const ReviewStarsSearchBar = ({ onStarChange }) => {
  const [selectedStar, setSelectedStar] = useState(null);

  const handleStarChange = (event) => {
    const newStar =
      event.target.value === "all" ? null : Number(event.target.value);
    setSelectedStar(newStar);
    onStarChange(newStar);
  };

  return (
    <div className="review-stars-search-bar">
      <select
        value={selectedStar ?? "all"}
        onChange={handleStarChange}
        className="review-stars-search-bar__dropdown"
      >
        <option value="all">All Stars</option>
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
