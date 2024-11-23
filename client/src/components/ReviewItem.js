import React from "react";

const ReviewItem = ({ review }) => {
  return (
    <li className="review-item">
      <p className="review-email">{review.user_email}</p>
      <strong>Rating: {review.rating} ⭐</strong>
      <p>{review.review_text}</p>
      <p>
        <em>Submitted on: {new Date(review.created_at).toLocaleString()}</em>
      </p>
    </li>
  );
};

export default ReviewItem;
