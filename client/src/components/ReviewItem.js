import React from "react";

const ReviewItem = ({ review }) => {
  // 计算点亮的星星数量
  const rating = review.rating;
  const totalStars = 5;

  // 创建一个包含5个星星的数组，根据评分决定哪些星星应该被点亮
  const stars = Array.from(
    { length: totalStars },
    (_, index) => index < rating
  );

  return (
    <li className="review-item">
      <p className="review-email">{review.user_email}</p>
      <div className="star-rating">
        {stars.map((isFilled, index) => (
          <span
            key={index}
            className={`star ${isFilled ? "filled" : ""}`}
            aria-label={`star ${index + 1}`}
          >
            ★
          </span>
        ))}
      </div>
      <p>{review.review_text}</p>
      <p>
        <em>Submitted on: {new Date(review.created_at).toLocaleString()}</em>
      </p>
    </li>
  );
};

export default ReviewItem;
