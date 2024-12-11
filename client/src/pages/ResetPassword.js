import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom"; 
import { UserContext } from "../contexts/UserContext.js";
import './ResetPassword.css'; 

export default function ResetPassword() {
    const { resetPassword } = useContext(UserContext);
    const [token, setToken] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [message, setMessage] = useState("");
    const navigate = useNavigate(); 

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Call the resetPassword function from context
            await resetPassword(token, newPassword);
            setMessage("Password reset successful. You can now log in.");

            // Redirect user to the login page after successful reset
            setTimeout(() => {
                navigate("/signin");
            }, 2000);
        } catch (error) {
            setMessage("Failed to reset password. Try again.");
        }
    };

    return (
        <div className="reset-password-container">
            <form className="reset-password-form" onSubmit={handleSubmit}>
                <h3>Reset Password</h3>
                <div className="input-container">
                    <label>Token:</label>
                    <input
                        type="text"
                        value={token}
                        onChange={(e) => setToken(e.target.value)}
                        required
                        placeholder="Enter your reset token"
                    />
                </div>
                <div className="input-container">
                    <label>New Password:</label>
                    <input
                        type="password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        required
                        placeholder="Enter your new password"
                    />
                </div>
                <button type="submit">Reset Password</button>
                {message && <p className="message">{message}</p>}
            </form>
        </div>
    );
}
