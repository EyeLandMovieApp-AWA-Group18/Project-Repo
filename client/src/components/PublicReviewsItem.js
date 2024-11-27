import { Link } from "react-router-dom";

const PublicReviewsItem = ({ review }) => {
  return (
    <div
      style={{ display: "flex", alignItems: "center", marginBottom: "20px" }}
    >
      {review.poster_url ? (
        <img
          src={review.poster_url}
          alt={review.film_title}
          style={{
            width: "100px",
            height: "150px",
            marginRight: "15px",
            objectFit: "cover",
          }}
        />
      ) : (
        <div
          style={{
            width: "100px",
            height: "150px",
            backgroundColor: "#ddd",
            marginRight: "15px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <span>No Image</span>
        </div>
      )}
      <div>
        <h3>{review.film_title}</h3>
        <p>
          <strong>User:</strong> {review.user_email}
        </p>
        <p>
          <strong>Rating:</strong> {review.rating}/5
        </p>
        <p>{review.review_text}</p>
        <small>Posted on: {new Date(review.created_at).toLocaleString()}</small>
        <div>
          <Link to={`/movie/${review.film_id}`}>
            <button>Movie Detail</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PublicReviewsItem;
