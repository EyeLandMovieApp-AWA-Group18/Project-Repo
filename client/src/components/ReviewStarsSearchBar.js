import React, { useState } from "react"; // Add this import statement

const ReviewStarsSearchBar = ({ onStarChange }) => {
  const [selectedStar, setSelectedStar] = useState(5); // Default to 5 stars

  const handleStarChange = (event) => {
    const newStar = Number(event.target.value);
    setSelectedStar(newStar);
    onStarChange(newStar);
  };

  return (
    <div>
      <label>
        Rating:
        <select value={selectedStar} onChange={handleStarChange}>
          {[5, 4, 3, 2, 1].map((star) => (
            <option key={star} value={star}>
              {star} Star{star > 1 && "s"}
            </option>
          ))}
        </select>
      </label>
    </div>
  );
};

export default ReviewStarsSearchBar;
