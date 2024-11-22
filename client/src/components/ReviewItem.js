import React from "react";

const ReviewItem = ({ review }) => {
  return (
    <li
      style={{
        marginBottom: "20px",
        padding: "10px",
        border: "1px solid #ddd",
        borderRadius: "5px",
        backgroundColor: "#f9f9f9",
      }}
    >
      <p style={{ color: "blue", fontSize: "14px", fontStyle: "italic" }}>
        {review.user_email} {/* 显示评论者的邮箱 */}
      </p>
      <strong>Rating: {review.rating} ⭐</strong>
      <p>{review.review_text}</p>
      <p>
        <em>Submitted on: {new Date(review.created_at).toLocaleString()}</em>
      </p>
    </li>
  );
};

export default ReviewItem;
