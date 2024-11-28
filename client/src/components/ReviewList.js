import React from "react";
import ReviewItem from "./ReviewItem";

const ReviewList = ({ reviews, onDeleteReview }) => {
  return (
    <div className="review-list-container">
      {reviews.length === 0 ? (
        <p style={{ fontStyle: "italic", textAlign: "center" }}>
          You have no reviews yet. Write one!
        </p>
      ) : (
        <ul className="review-list">
          {reviews.map((review) => (
            <ReviewItem
              key={review.id}
              review={review}
              onDeleteReview={onDeleteReview}
            />
          ))}
        </ul>
      )}
    </div>
  );
};

export default ReviewList;
