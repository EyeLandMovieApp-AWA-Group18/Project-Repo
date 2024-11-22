import express from "express";
import { getReviews, addReview } from "../controllers/reviewController.js";

const router = express.Router();

// Route to get reviews for a movie
router.get("/:film_id", getReviews);

// Route to add a review
router.post("/:film_id", addReview);

export default router;
