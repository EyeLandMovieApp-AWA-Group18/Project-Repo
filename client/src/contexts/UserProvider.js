import { useState,useEffect } from "react";
import { UserContext } from "./UserContext";
import axios from "axios";

const url = process.env.REACT_APP_API_URL;

export default function UserProvider({ children }) {
    const userFromSessionStorage = sessionStorage.getItem("user");
    const [user, setUser] = useState(userFromSessionStorage ? JSON.parse(userFromSessionStorage) : { email: "", password: "" });
    useEffect(() => {
        console.log("User context updated:", user); // Debug user state
    }, [user]);
    const signUp = async (payload) => {
        console.log("SignUp payload:", payload); // Debugging
        //const json = JSON.stringify(user);
        const headers = { headers: { "Content-Type": "application/json" } };
        try {
            await axios.post(url + "/register", JSON.stringify(payload), headers);
            setUser({ email: "", password: "" });
            window.alert("Sign-up successful! Please sign in.");
        } catch (error) {
            throw error;
        }
    };

    const signIn = async (payload) => {
        //const json = JSON.stringify(user);
        console.log("User context before login payload:", user);
        /*const payload = {
            email: user.email, // Extract only email
            password: user.password, // Extract only password
        };*/
        const headers = { headers: { "Content-Type": "application/json" } };
        try {
            const response = await axios.post(url + "/login", JSON.stringify(payload), headers);
            const { token, user: userData } = response.data; // Extract user data and token
            //setUser(userData);
            setUser({ ...userData, token });
            //const token = response.data.token;
            //setUser(response.data);
            sessionStorage.setItem("user", JSON.stringify({ ...userData, token }));
            console.log("User saved to sessionStorage:", sessionStorage.getItem("user"));
            sessionStorage.setItem('token', token);
            window.alert("Sign-in successful! Welcome back.");
        } catch (error) {
            // Improved error handling to check if the backend response contains a message
            if (error.response && error.response.data && error.response.data.message) {
              // If there's a message from the backend, throw that message
              throw new Error(error.response.data.message); // This will be caught in the frontend
            } else {
              // Generic error handling
              throw new Error("An unexpected error occurred. Please try again.");
            }
        }
    };
    const signOut = () => {
        setUser({ email: '', password: '' }) // Clear
        sessionStorage.removeItem('user')
        // sessionStorage.removeItem('token') // 
      }

      const forgotPassword = async (email) => {
        const headers = { headers: { "Content-Type": "application/json" } };
        try {
            await axios.post(url + "/forgotpassword", JSON.stringify({ email }), headers);
            console.log("Forgot password email sent successfully.");
        } catch (error) {
            console.error("Error in forgot password:", error);
            throw error;
        }
    };
    const resetPassword = async (token, newPassword) => {
        const headers = { headers: { "Content-Type": "application/json" } };
        try {
            await axios.post(
                url + "/resetpasswordtoken",
                JSON.stringify({ token, newPassword }),
                headers
            );
            console.log("Password reset successfully.");
        } catch (error) {
            console.error("Error in resetting password:", error);
            throw error;
        }
    };
    return (
        <UserContext.Provider value={{ user, setUser, signUp, signIn,signOut,forgotPassword,resetPassword }}>
            {children}
        </UserContext.Provider>
    );
}
