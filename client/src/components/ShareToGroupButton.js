import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useUser } from '../contexts/useUser';
import './ShareToGroupButton.css';

const ShareToGroupButton = ({ movieId, movieTitle }) => {
  const { user } = useUser();
  const [userGroups, setUserGroups] = useState([]);
  const [sharedGroups, setSharedGroups] = useState([]);
  const [selectedGroupId, setSelectedGroupId] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const API_BASE_URL = process.env.REACT_APP_API_URL;

  useEffect(() => {
    const fetchData = async () => {
      if (!user?.token) return;

      try {
        // Fetch user's groups
        const groupsResponse = await axios.get(`${API_BASE_URL}/groups/my-groups`, {
          headers: { Authorization: `Bearer ${user.token}` },
        });
        setUserGroups(groupsResponse.data);
        
        // Find first unshared group for default selection
        const sharedResponse = await axios.get(`${API_BASE_URL}/groups/movies/${movieId}/shared`, {
          headers: { Authorization: `Bearer ${user.token}` },
        });
        setSharedGroups(sharedResponse.data);
        
        // Set default selected group to first unshared group
        const unsharedGroups = groupsResponse.data.filter(group => !sharedResponse.data.includes(group.id));
        if (unsharedGroups.length > 0) {
          setSelectedGroupId(unsharedGroups[0].id);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [user, API_BASE_URL, movieId]);

  const handleShare = async () => {
    if (!selectedGroupId || !user?.token) return;

    setIsLoading(true);
    try {
      await axios.post(
        `${API_BASE_URL}/groups/${selectedGroupId}/movies`,
        { movieId, movieTitle },
        {
          headers: { Authorization: `Bearer ${user.token}` },
        }
      );
      // Update shared groups list
      setSharedGroups([...sharedGroups, selectedGroupId]);
      // Update selected group to next available unshared group
      const nextUnsharedGroup = userGroups.find(group => 
        !sharedGroups.includes(group.id) && group.id !== selectedGroupId
      );
      setSelectedGroupId(nextUnsharedGroup?.id || '');
      alert('Movie shared successfully!');
    } catch (error) {
      console.error('Error sharing movie:', error);
      alert('Failed to share movie. Please try again.');
    } finally {
      setIsLoading(false);
      setIsDropdownOpen(false);
    }
  };

  // Don't show the button if user is not logged in or has no groups
  if (!user?.token || userGroups.length === 0) {
    return null;
  }

  // Don't show the button if all groups have the movie shared
  const hasUnsharedGroups = userGroups.some(group => !sharedGroups.includes(group.id));
  if (!hasUnsharedGroups) {
    return (
      <div className="share-to-group">
        <button className="share-button shared-all" disabled>
          ✓ Shared to all groups
        </button>
      </div>
    );
  }

  return (
    <div className="share-to-group">
      <button 
        className="share-button"
        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
        disabled={isLoading}
      >
        🎬 Share to Group
      </button>
      
      {isDropdownOpen && (
        <div className="group-dropdown">
          <select
            value={selectedGroupId}
            onChange={(e) => setSelectedGroupId(e.target.value)}
            disabled={isLoading}
          >
            {userGroups.map((group) => (
              <option 
                key={group.id} 
                value={group.id}
                disabled={sharedGroups.includes(group.id)}
              >
                {group.name} {sharedGroups.includes(group.id) ? '(Already Shared)' : ''}
              </option>
            ))}
          </select>
          <button 
            onClick={handleShare}
            disabled={isLoading || !selectedGroupId}
            className="confirm-share-button"
          >
            {isLoading ? 'Sharing...' : 'Share'}
          </button>
        </div>
      )}
    </div>
  );
};

export default ShareToGroupButton;
