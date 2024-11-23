import React , { useState } from 'react';
import { useUser } from '../contexts/useUser.js';
import axios from 'axios';
import './DeleteFavoriteButton.css';

const DeleteFavoriteButton = ({ movieId, onDelete }) => {
  const { user } = useUser();
  const [isHovered, setIsHovered] = useState(false);
  const API_BASE_URL = process.env.REACT_APP_API_URL;
  const handleDelete = async () => {
    try {
      await axios.delete(`${API_BASE_URL}/favourites/${movieId}`, {
        headers: { Authorization: `Bearer ${user.token}` },
      });
      onDelete(movieId); // Trigger a parent state update
    } catch (error) {
      console.error('Error deleting favorite:', error);
    }
  };

  return (
    <button 
      className="delete-button" 
      onClick={handleDelete}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <span className="delete-symbol">🗑️</span>
      {isHovered ? ' Remove from my favorites' : ''}
    </button>
  );
};

export default DeleteFavoriteButton;
