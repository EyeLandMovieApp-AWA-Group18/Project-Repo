import React, { useState } from "react";
import "./ReviewTitleSearchBar.css";

const ReviewTitleSearchBar = ({ onTitleChange }) => {
  const [title, setTitle] = useState("");

  const handleInputChange = (event) => {
    setTitle(event.target.value);
  };

  const handleSearchClick = () => {
    onTitleChange(title); // 只有点击按钮时才触发搜索
  };

  return (
    <div className="review-title-search-bar">
      <input
        type="text"
        value={title}
        onChange={handleInputChange}
        placeholder="Search by movie title"
        className="review-title-search-bar__input"
      />
      <button
        onClick={handleSearchClick}
        className="review-title-search-bar__button"
        aria-label="Search"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
        >
          <path d="M10 2a8 8 0 015.75 13.38l4.69 4.69a1 1 0 01-1.42 1.42l-4.69-4.69A8 8 0 1110 2zm0 2a6 6 0 100 12 6 6 0 000-12z" />
        </svg>
      </button>
    </div>
  );
};

export default ReviewTitleSearchBar;
