import React from "react";

const ReviewItem = ({ review, onDeleteReview }) => {
  return (
    <li className="review-item">
      <p className="review-email">{review.user_email}</p>
      <strong>Rating: {review.rating} ⭐</strong>
      <p>{review.review_text}</p>
      <p>
        <em>Submitted on: {new Date(review.created_at).toLocaleString()}</em>
      </p>
      <button
        onClick={() => onDeleteReview(review.id)}
        className="delete-button"
      >
        Delete
      </button>
    </li>
  );
};

export default ReviewItem;
