import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import ShareToGroupButton from './ShareToGroupButton';
import { useUser } from '../contexts/useUser';
import './MovieCard.css';

const MovieCard = ({ movie, sharedBy, sharedAt, groupId, isGroupOwner, onMovieDeleted }) => {
  const { user } = useUser();
  const { id, poster_path, title, vote_average } = movie;
  const [isDeleting, setIsDeleting] = useState(false);

  // Base URL for the TMDB images
  const imageBaseUrl = 'https://image.tmdb.org/t/p/w500';
  const API_BASE_URL = process.env.REACT_APP_API_URL;

  const handleDelete = async () => {
    if (!window.confirm('Are you sure you want to remove this movie from the group?')) {
      return;
    }

    setIsDeleting(true);
    try {
      await axios.delete(
        `${API_BASE_URL}/groups/${groupId}/movies/${id}`,
        {
          headers: { Authorization: `Bearer ${user.token}` },
        }
      );
      onMovieDeleted(id);
    } catch (error) {
      console.error('Error deleting movie:', error);
      alert('Failed to delete movie. Please try again.');
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="movie-card">
      <img
        src={poster_path? `${imageBaseUrl}${poster_path}` : 'https://via.placeholder.com/500x280'}
        alt={title}
        className="movie-backdrop"
      />
      <div className="movie-info">
        <h3 className="movie-title">{title}</h3>
        <p className="movie-rating">⭐ {vote_average.toFixed(1)}</p>
        {sharedBy && sharedAt && (
          <div className="movie-share-info">
            <p className="shared-by">Shared by: {sharedBy}</p>
            <p className="shared-at">Shared: {sharedAt}</p>
          </div>
        )}
        <div className="movie-actions">
          <Link to={`/movie/${id}`}>
            <button>More Info</button>
          </Link>
          {!groupId && <ShareToGroupButton movieId={id} movieTitle={title} />}
          {groupId && isGroupOwner && (
            <button 
              onClick={handleDelete}
              disabled={isDeleting}
              className="delete-movie-button"
            >
              {isDeleting ? 'Removing...' : '🗑️ Remove'}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default MovieCard;
