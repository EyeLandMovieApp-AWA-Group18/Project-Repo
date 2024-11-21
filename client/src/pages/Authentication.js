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
    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("Form inputs before submission:", formInputs);
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
            <div>
              <Link to={authenticationMode === AuthenticationMode.Login ? '/signup':'/signin'} >
                {authenticationMode === AuthenticationMode.Login ? 'No account? Sign up' : 'Already signed up? Sign in'}
              </Link>
            </div>
          </form>
        </div>
      )
}
/*const Authentication = () => {
    const [isLogin, setIsLogin] = useState(true);
    const [formData, setFormData] = useState({ username: '', email: '', password: '' });
    const navigate = useNavigate(); 

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const url = isLogin ? 'http://localhost:5000/api/login' : 'http://localhost:5000/api/register';
        try {
            const response = await axios.post(url, formData);
            alert(response.data.message);
            if (isLogin) {
                localStorage.setItem('token', response.data.token);
                 navigate('/');
            } else {
                 navigate('/auth');}
        } catch (error) {
            alert(error.response?.data?.message || 'Authentication failed');
        }
    };

    const toggleMode = () => {
        setIsLogin(!isLogin);
        setFormData({ username: '', email: '', password: '' }); // Clear form data when toggling
    };

    return (
        <div>
            <h2>{isLogin ? 'Login' : 'Sign Up'}</h2>
            <form onSubmit={handleSubmit}>
                {!isLogin && (
                    <input
                        type="text"
                        name="username"
                        placeholder="Username"
                        value={formData.username}
                        onChange={handleChange}
                        required
                    />
                )}
                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                />
                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                />
                <button type="submit">{isLogin ? 'Login' : 'Sign Up'}</button>
            </form>
            <button onClick={toggleMode}>
                {isLogin ? 'Need an account? Sign Up' : 'Already have an account? Login'}
            </button>
        </div>
    );
};

export default Authentication;*/
