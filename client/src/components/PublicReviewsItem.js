import { Link } from "react-router-dom";
import "./PublicReviewsItem.css";

const PublicReviewsItem = ({ review }) => {
  return (
    <div className="review-item">
      <div className="review-item__avatar">
        {review.poster_url ? (
          <img
            src={review.poster_url}
            alt={review.film_title}
            className="review-item__image"
          />
        ) : (
          <div className="review-item__no-image">No Image</div>
        )}
      </div>
      <div className="review-item__content">
        <h3 className="review-item__title">{review.film_title}</h3>
        <p className="review-item__email">{review.user_email}</p>
        <div className="review-item__rating">
          {"★".repeat(review.rating)}
          {"☆".repeat(5 - review.rating)}
        </div>
        <p className="review-item__text">{review.review_text}</p>
        <small className="review-item__date">
          Posted on: {new Date(review.created_at).toLocaleString()}
        </small>
        <div className="review-item__button">
          <Link to={`/movie/${review.film_id}`}>
            <button className="review-item__details-button">
              Movie Detail
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PublicReviewsItem;
