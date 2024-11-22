CREATE TABLE reviews (
    id SERIAL PRIMARY KEY,
    film_id VARCHAR(255) NOT NULL,
    user_id INTEGER NOT NULL,
    rating INTEGER CHECK (rating BETWEEN 1 AND 5),
    review_text TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id)
);