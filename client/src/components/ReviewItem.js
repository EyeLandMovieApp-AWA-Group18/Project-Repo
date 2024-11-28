import React from "react";

const ReviewItem = ({ review, onDeleteReview }) => {
  const stars = Array.from({ length: 5 }, (_, index) => index + 1);

  return (
    <li className="review-item">
      <p className="review-email">{review.user_email}</p>

      <div className=".star-rating">
        {stars.map((star) => (
          <span
            key={star}
            className={`star ${review.rating >= star ? "filled" : ""}`}
          >
            ★
          </span>
        ))}
      </div>
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
