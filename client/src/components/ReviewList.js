// ReviewList.js
import React from "react";
import ReviewItem from "./ReviewItem"; // 引入 ReviewItem 组件

const ReviewList = ({ reviews }) => {
  return (
    <div>
      <h3>Reviews</h3>
      {reviews.length === 0 ? (
        <p>No reviews yet. Be the first to write one!</p>
      ) : (
        <ul style={{ padding: "0" }}>
          {reviews.map((review) => (
            <ReviewItem key={review.id} review={review} />
          ))}
        </ul>
      )}
    </div>
  );
};

export default ReviewList;
