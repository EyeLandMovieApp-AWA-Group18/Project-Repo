import React, { useState } from "react"; // Add this import statement

const ReviewTitleSearchBar = ({ onTitleChange }) => {
  const [title, setTitle] = useState("");

  const handleTitleChange = (event) => {
    const newTitle = event.target.value;
    setTitle(newTitle);
    onTitleChange(newTitle);
  };

  return (
    <div>
      <label>
        Movie Title:
        <input
          type="text"
          value={title}
          onChange={handleTitleChange}
          placeholder="Search by movie title"
        />
      </label>
    </div>
  );
};

export default ReviewTitleSearchBar;
