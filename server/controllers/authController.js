import UserModel from '../models/userModel.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const AuthController = {
    async register(req, res) {
        const { username, email, password } = req.body;

        try {
            const existingUser = await UserModel.findUserByEmail(email);
            if (existingUser) return res.status(400).json({ message: 'User already exists' });

            const user = await UserModel.createUser(username, email, password);
            res.status(201).json({ message: 'User registered successfully' });
        } catch (error) {
            res.status(500).json({ error: 'Internal server error' });
        }
    },

    async login(req, res) {
        const { email, password } = req.body;

        try {
            const user = await UserModel.findUserByEmail(email);
            if (!user) return res.status(400).json({ message: 'Invalid credentials' });

            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

            const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
            res.status(200).json({ message: 'Login successful', token });
        } catch (error) {
            res.status(500).json({ error: 'Internal server error' });
        }
    }
};

export default AuthController;
