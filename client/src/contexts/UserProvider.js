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
        } catch (error) {
            //setUser({ email: "", password: "" });
            setUser(null);
            throw error;
        }
    };
    const signOut = () => {
        setUser({ email: '', password: '' }) // Clear
        sessionStorage.removeItem('user')
        // sessionStorage.removeItem('token') // 
      }
    return (
        <UserContext.Provider value={{ user, setUser, signUp, signIn,signOut }}>
            {children}
        </UserContext.Provider>
    );
}
