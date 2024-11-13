import express from 'express';
import dotenv from 'dotenv';
import authRoutes from './routes/authRoutes.js';
import pool from './database/db.js';
import cors from 'cors';


dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
app.use(cors());
app.use(express.json());

// Routes
app.use('/api', authRoutes);

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
