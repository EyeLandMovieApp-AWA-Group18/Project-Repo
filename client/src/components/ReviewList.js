import React from "react";
import ReviewItem from "./ReviewItem";

const ReviewList = ({ reviews }) => {
  return (
    <div className="review-list-container">
      {reviews.length === 0 ? (
        <p style={{ fontStyle: "italic", textAlign: "center" }}>
          No reviews yet. Be the first to write one!
        </p>
      ) : (
        <ul className="review-list">
          {reviews.map((review) => (
            <ReviewItem key={review.id} review={review} />
          ))}
        </ul>
      )}
    </div>
  );
};

export default ReviewList;
