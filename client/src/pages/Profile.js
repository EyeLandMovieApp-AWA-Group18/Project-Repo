import React, { useState } from 'react';

const Profile = () => {
  const [username, setUsername] = useState('User123');
  const [email, setEmail] = useState('user@example.com');
  const [favoriteMovies, setFavoriteMovies] = useState(['Inception', 'The Matrix', 'Interstellar']);

  const handleSaveChanges = () => {
    // Save profile changes logic here
  };

  return (
    <div>
      <h2>Profile</h2>
      <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
      <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
      <h3>Favorite Movies</h3>
      <ul>
        {favoriteMovies.map((movie, index) => (
          <li key={index}>{movie}</li>
        ))}
      </ul>
      <button onClick={handleSaveChanges}>Save Changes</button>
    </div>
  );
};

export default Profile;
