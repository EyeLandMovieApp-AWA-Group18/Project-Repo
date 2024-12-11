import React ,{useState}from 'react';
//import { useNavigate } from 'react-router-dom';
//import axios from 'axios';
import { Link, useNavigate } from "react-router-dom";
import './Authentication.css'
import {useUser} from "../contexts/useUser.js";

export const AuthenticationMode = Object.freeze({
  Login: 'Login',
  Register: 'Register'
})

export default function Authentication({authenticationMode}) {
	const {signUp, signIn } = useUser();
    const navigate = useNavigate();
    //const [username, setUsername] = useState(""); 
    const [formInputs, setFormInputs] = useState({
        email: '',
        password: '',
        username: '',
      });
      const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormInputs({ ...formInputs, [name]: value });
      };

    // Add this function to validate the password
    const validatePassword = (password) => {
    const capitalLetterRegex = /[A-Z]/;
    const numberRegex = /\d/;
  return capitalLetterRegex.test(password) && numberRegex.test(password);
};

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("Form inputs before submission:", formInputs);
        // Validate password for registration
        if (authenticationMode === AuthenticationMode.Register && !validatePassword(formInputs.password)) {
        alert("Password must contain at least one capital letter and one number.");
        return;
        }
        
        try {
            if (authenticationMode === AuthenticationMode.Register) {
                //setUser({ email: formInputs.email, username: formInputs.username, password: formInputs.password });
                await signUp(formInputs);
                navigate('/signin');
            } else {
                //setUser({ email: formInputs.email, password: formInputs.password });
                await signIn(formInputs);
                console.log("Session storage after login:", sessionStorage.getItem("user")); 
                navigate('/');
            }
        } catch (error) {
            const message = error.response && error.response.data ? error.response.data.error : error;
            alert(message);
        }
    };

    return (
        <div className="authentication-container">
          <h3>{authenticationMode === AuthenticationMode.Login ? 'Sign in' : 'Sign up'}</h3>
          <form onSubmit={handleSubmit}>
           {authenticationMode === AuthenticationMode.Register && (
              <div>
                <label>Username</label>
                <input 
                type="text" 
                name="username"
                value={formInputs.username}
                onChange={handleInputChange}
                placeholder="Enter your username"
                required
            />
              </div>
            )} 
            <div>
              <label>Email</label>
              <input  type="email"
            name="email"
            value={formInputs.email}
            onChange={handleInputChange}
            placeholder="Enter your email"
            required/>
            </div>
            <div>
              <label>Password</label>
              <input type="password"
              name="password"
              value={formInputs.password}
              onChange={handleInputChange}
              placeholder="Enter your password"
              required />
            </div>
            <div>
              <button>{authenticationMode === AuthenticationMode.Login ? 'Login' : 'Submit'}</button>
            </div>

             {/* Forgot password link */}
        {authenticationMode === AuthenticationMode.Login && (
          <div>
            <Link to="/forgotpassword">Forgot password?</Link>
          </div>
        )}
            <div>
              <Link to={authenticationMode === AuthenticationMode.Login ? '/signup':'/signin'} >
                {authenticationMode === AuthenticationMode.Login ? 'No account? Sign up' : 'Already signed up? Sign in'}
              </Link>
            </div>
          </form>
        </div>
      )
}
