import React, { useState } from "react";
import "./ReviewTitleSearchBar.css";

const ReviewTitleSearchBar = ({ onTitleChange }) => {
  const [title, setTitle] = useState("");

  const handleTitleChange = (event) => {
    const newTitle = event.target.value;
    setTitle(newTitle);
    onTitleChange(newTitle);
  };

  return (
    <div className="review-title-search-bar">
      <input
        type="text"
        value={title}
        onChange={handleTitleChange}
        placeholder="Search movie"
        className="review-title-search-bar__input"
      />
    </div>
  );
};

export default ReviewTitleSearchBar;
