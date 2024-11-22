import axios from "axios";

const API_BASE_URL =
  process.env.REACT_APP_API_URL || "http://localhost:5000/api/reviews";

export const fetchReviews = async (filmId) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/${filmId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching reviews:", error);
    return [];
  }
};

export const submitReview = async (filmId, userId, rating, reviewText) => {
  try {
    const response = await axios.post(API_BASE_URL, {
      filmId,
      userId,
      rating,
      reviewText,
    });
    return response.data;
  } catch (error) {
    console.error("Error submitting review:", error);
    return null;
  }
};
