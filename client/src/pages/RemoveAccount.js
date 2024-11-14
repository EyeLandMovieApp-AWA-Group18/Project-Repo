import React, { useState } from 'react';
import '../App.css';

const RemoveAccount = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleRemoveAccount = () => {
    // Account deletion logic here
  };

  return (
    <div className="pages">
      <h2>Remove Account</h2>
      <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
      <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
      <button onClick={handleRemoveAccount}>Confirm Deletion</button>
      <p>Warning: This action is irreversible!</p>
    </div>
  );
};

export default RemoveAccount;
