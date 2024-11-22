import React from "react";

const ReviewCard = ({ review }) => {
  const { user_id, rating, review_text, created_at } = review;

  return (
    <div className="review-card">
      <h4>User {user_id}</h4>
      <p>
        <strong>Rating:</strong> ⭐ {rating}
      </p>
      <p>{review_text}</p>
      <small>
        <strong>Posted on:</strong> {new Date(created_at).toLocaleString()}
      </small>
    </div>
  );
};

export default ReviewCard;
