import React, { useState,useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import FavoritesList from '../components/FavoritesList.js'; 
import { useUser } from '../contexts/useUser.js'; 
import ShareFavoritesButton from '../components/ShareFavoritesButton.js';
import { getUserGroups } from '../services/groupService';
import GroupCard from '../components/GroupCard';
import ProfileWatchlist from '../components/ProfileWatchlist';
import './Profile.css';

const Profile = () => {
  const { user } = useUser();
  const [groups, setGroups] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchGroups = async () => {
        if (user?.token) {
            try {
                const userGroups = await getUserGroups();
                setGroups(userGroups);
            } catch (error) {
                console.error('Error fetching user groups:', error);
            } finally {
                setLoading(false);
            }
        }
    };

    fetchGroups();
}, [user]);

const handleViewAllClick = () => {
  navigate('/watchlist'); // Redirects to the watchlist page
};

  return (
    <div className="profile-container">
      <div className="profile-header">
      
          <a href="/deleteAccount" className="delete-account-link">Want to remove account? Click here</a>
          <h2 className="profile-title">My Profile</h2>
      </div>
      
      {/* Username Section */}
      <div className="profile-section">
        <h3>Username</h3>
        <div className="separator"></div>
        <p>{user?.username || 'Guest'}</p>
      </div>
      
  

      {/* Favorite Movies Section */}
      <div className="profile-section">
      <h3>My Favorites</h3>
      <div className="separator"></div>
      <ShareFavoritesButton />
      <FavoritesList />
      </div>

      {/* Watchlist Section */}
      <div className="profile-section">
        <h3>My Watchlist</h3>
        <div className="separator"></div>
        <div className="view-all">
        <button  onClick={handleViewAllClick} className="view-all-button">View All Watchlist</button>
        </div>
        <ProfileWatchlist />
      </div>

      {/* Groups Section */}
      <div className="profile-section">
        <h3>My Groups</h3>
        <div className="separator"></div>
        {loading ? (
                    <p>Loading...</p>
                ) : (
                    <div className="group-list">
                        {groups.length > 0 ? (
                            groups.map((group) => (
                                <GroupCard key={group.id} group={group} />
                            ))
                        ) : (
                            <p>You are not a member of any groups.</p>
                        )}
                    </div>
                )}
      </div>
      
     
    </div>
  );
};

export default Profile;
