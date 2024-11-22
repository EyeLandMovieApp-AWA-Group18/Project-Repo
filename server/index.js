import express from 'express';
import dotenv from 'dotenv';
import authRoutes from './routes/authRoutes.js';
import searchRoutes from './routes/searchRoutes.js';
import favouritesRoutes from './routes/favouritesRoutes.js';
import pool from './database/db.js';
import cors from 'cors';


dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
app.use(cors());
app.use(express.json());

// Routes
app.use('/api', authRoutes);
app.use('/api/search', searchRoutes);
app.use('/api/favourites', favouritesRoutes);

// Database connection test
pool.connect((err) => {
    if (err) {
        console.error('Database connection failed:', err);
    } else {
        console.log('Connected to the database');
    }
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
