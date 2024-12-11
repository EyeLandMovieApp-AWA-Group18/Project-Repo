import UserModel from "../models/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import pool from "../database/db.js";
import crypto from "crypto";
import sendEmail from "../services/emailservice.js";

const AuthController = {
  async register(req, res) {
    const { username, email, password } = req.body;

    try {
      const existingUser = await UserModel.findUserByEmail(email);
      if (existingUser)
        return res.status(400).json({ message: "User already exists" });

      const user = await UserModel.createUser(username, email, password);
      res.status(201).json({ message: "User registered successfully" });
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  },

  async login(req, res) {
    //console.log("Incoming login request:", req.body);
    const { email, password } = req.body;

    try {
      const user = await UserModel.findUserByEmail(email);
      if (!user)
        return res.status(400).json({ message: "Invalid credentials" });

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch)
        return res.status(400).json({ message: "Invalid credentials" });

      const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET_KEY, {
        expiresIn: "12h",
      });
      res.status(200).json({
        message: "Login successful",
        user: {
          id: user.id,
          username: user.username,
          email: user.email,
        },
        token,
      });
    } catch (error) {
      // console.error('Login error:', error);  // Log the error to the console
      res.status(500).json({ error: "Internal server error" });
    }
  },

  async deleteAccount(req, res) {
    const authHeader = req.headers.authorization;
    const token = authHeader.split(" ")[1];
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
      const userId = decoded.userId;
      // Start a transaction to ensure all deletions are consistent
      await pool.query("BEGIN");

      // Delete related data from reviews, favorites, and shared_favorites
      await pool.query("DELETE FROM reviews WHERE user_id = $1", [userId]);

      await pool.query("DELETE FROM shared_favorites WHERE user_id = $1", [
        userId,
      ]);

      // Delete the user
      const result = await pool.query(
        "DELETE FROM users WHERE id = $1 RETURNING *",
        [userId]
      );
      if (result.rowCount === 0) {
        await pool.query("ROLLBACK");
        return res.status(404).json({ message: "User not found" });
      }

      // Commit the transaction
      await pool.query("COMMIT");

      res.status(200).json({
        message: "Account deleted successfully, including all related data",
      });
    } catch (error) {
      await pool.query("ROLLBACK"); // Rollback the transaction on error
      console.error("Error during account deletion:", error);
      return res.status(403).json({ message: "Invalid or expired token" });
    }
  },

  async logout(req, res) {
    const authHeader = req.headers.authorization;
    const token = authHeader ? authHeader.split(" ")[1] : null;

    if (!token) {
      return res.status(404).json({ message: "No token provided" });
    }

    try {
      jwt.verify(token, process.env.JWT_SECRET_KEY);
      res.status(200).json({ message: "Logout successful" });
    } catch (error) {
      res.status(404).json({ message: "Invalid or expired token" });
    }
  },

  async resetPassword(req, res) {
    try {
        const { oldPassword, newPassword } = req.body;
        const token = req.header("Authorization")?.split(" ")[1]; 

        if (!token) {
            return res.status(401).json({ message: "No token provided, authorization denied" });
        }

        // Verify the JWT token
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY); 
        const userId = decoded.userId; 
        // Fetch user from the database by ID
        const userQuery = await pool.query('SELECT * FROM users WHERE id = $1', [userId]);
        const user = userQuery.rows[0];

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Verify old password
        const isMatch = await bcrypt.compare(oldPassword, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Incorrect old password' });
        }

        // Hash and update the new password
        const hashedPassword = await bcrypt.hash(newPassword, 10);
        await pool.query('UPDATE users SET password = $1 WHERE id = $2', [hashedPassword, userId]);

        res.status(200).json({ message: 'Password updated successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
},


async forgotPassword(req, res) {
    try {
        const { email } = req.body;

        // Fetch user by email
        const userQuery = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
        const user = userQuery.rows[0];

        if (!user) return res.status(404).json({ message: 'User not found' });

        // Generate reset token
        const resetToken = crypto.randomBytes(4).toString('hex');
        const hashedToken = crypto.createHash('sha256').update(resetToken.toString()).digest('hex');
        const expireTime = new Date(Date.now() + 10 * 60 * 1000); // Token valid for 10 minutes

        // Store reset token and expiry in DB
        await pool.query('UPDATE users SET reset_password_token = $1, reset_password_expire = $2 WHERE email = $3', [hashedToken, expireTime, email]);

        // Send token via email
        await sendEmail({
            to: email,
            subject: "Password Reset Request",
            text: `Your password reset token is: ${resetToken}`,
        });

        res.status(200).json({ message: "Reset token sent to email" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
},

async resetPasswordWithToken(req, res) {
  try {
      const { token, newPassword } = req.body;

      // Hash the received token
      const hashedToken = crypto.createHash('sha256').update(token).digest('hex');

      // Fetch user by token
      const userQuery = await pool.query(
          'SELECT * FROM users WHERE reset_password_token = $1 AND reset_password_expire > NOW()',
          [hashedToken]
      );
      const user = userQuery.rows[0];

      if (!user) return res.status(400).json({ message: 'Invalid or expired token' });

      // Hash and update new password
      const hashedPassword = await bcrypt.hash(newPassword, 10);
      await pool.query('UPDATE users SET password = $1, reset_password_token = NULL, reset_password_expire = NULL WHERE id = $2', [hashedPassword, user.id]);

      res.status(200).json({ message: "Password reset successfully" });
  } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
  }
}




};

export default AuthController;
