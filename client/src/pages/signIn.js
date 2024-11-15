import React, { useState } from 'react';
import '../App.css';

const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignIn = () => {
    // Sign in logic here
  };

  return (
    <div className="pages">
    <h2>Log In</h2>
    <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
    <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
    <button onClick={handleSignIn}>Sign In</button>
    <a href="/forgot-password">Forgot Password?</a>
    </div>
  );
};

export default SignIn;
