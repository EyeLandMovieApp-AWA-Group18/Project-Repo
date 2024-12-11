import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../contexts/UserContext"; 
import '../pages/ForgotPassword.css'; 

export default function ForgotPassword() {
  const { forgotPassword } = useContext(UserContext);
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate(); 

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await forgotPassword(email); 
      setMessage("Password reset link sent to your email. Check email.");

      
      setTimeout(() => {
        navigate("/resetpassword");
      }, 2000);
    } catch (error) {
      setMessage("Failed to send reset link. Try again or check the email.");
    }
  };

  return (
    <div className="forgot-password-container">
      <form className="forgot-password-form" onSubmit={handleSubmit}>
        <h3>Forgot Password</h3>
        <div className="input-container">
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder="Enter your email"
          />
        </div>
        <button type="submit">Send Reset Link</button>
        {message && <p className="message">{message}</p>}
      </form>
    </div>
  );
}

