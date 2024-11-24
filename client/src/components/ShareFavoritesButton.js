import React, { useState } from 'react';
import axios from 'axios';
import { useUser } from '../contexts/useUser.js';
import './ShareFavoritesButton.css'; 

const ShareFavoritesButton = () => {
  const { user } = useUser();
  const [sharedUrl, setSharedUrl] = useState(null);
  const API_BASE_URL = process.env.REACT_APP_API_URL;

  const handleShareFavorites = async () => {
    try {
      // Request the backend to generate or retrieve a shared ID
      const response = await axios.post(`${API_BASE_URL}/shared-favorites`, {}, {
        headers: {
			Authorization: `Bearer ${user?.token}`,
        },
      });

      // Construct the shared URL using the shared ID from the backend
      const sharedId = response.data.sharedId;
      const url = `${window.location.origin}/shared/${sharedId}`;
      setSharedUrl(url);
    } catch (error) {
      console.error('Error sharing favorites:', error);
      alert('Failed to generate a shareable link. Please try again later.');
    }
  };

  return (
    <div className="share-favorites">
      <button onClick={handleShareFavorites} className="share-button">
        Share My Favorites
      </button>
      {sharedUrl && (
        <div className="shared-url">
          <p>Share this link:</p>
          <input type="text" value={sharedUrl} readOnly />
          <button onClick={() => navigator.clipboard.writeText(sharedUrl)}>
            Copy
          </button>
        </div>
      )}
    </div>
  );
};

export default ShareFavoritesButton;
