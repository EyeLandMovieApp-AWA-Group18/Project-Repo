import React, { useState,useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import FavoritesList from '../components/FavoritesList.js'; 
import { useUser } from '../contexts/useUser.js'; 
import ShareFavoritesButton from '../components/ShareFavoritesButton.js';
import { getUserGroups } from '../services/groupService';
import GroupCard from '../components/GroupCard';
import ProfileWatchlist from '../components/ProfileWatchlist';
import { updatePassword } from '../services/authService'; 
import './Profile.css';

const Profile = () => {
  const { user } = useUser();
  const [groups, setGroups] = useState([]);
  const [loading, setLoading] = useState(true);
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [passwordSuccess, setPasswordSuccess] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
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

const handlePasswordChange = async (e) => {
  e.preventDefault();
  if (newPassword !== confirmPassword) {
    setPasswordError("New password and confirmation do not match.");
    return;
  }
  try {
    const token = user?.token;
    await updatePassword(token, oldPassword, newPassword);
    setPasswordSuccess("Password updated successfully!");
    setPasswordError('');
    setOldPassword('');
    setNewPassword('');
    setConfirmPassword('');
    setModalOpen(false); 
  } catch (err) {
    setPasswordError("Failed to update password. Please try again.");
    setPasswordSuccess('');
  }
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


      {/* Reset Password Section */}
      <div className="profile-section">
        <a
          href="#"
          className="reset-password-link"
          onClick={() => setModalOpen(true)}
        >
          Reset Password
        </a>
      </div>

      {/* Password Reset Modal */}
      {modalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>Reset Password</h3>
            {passwordSuccess && <p className="success-message">{passwordSuccess}</p>}
            {passwordError && <p className="error-message">{passwordError}</p>}
            <form onSubmit={handlePasswordChange}>
              <div>
                <label htmlFor="oldPassword">Old Password</label>
                
                <input
                  type="password"
                  id="oldPassword"
                  value={oldPassword}
                  onChange={(e) => setOldPassword(e.target.value)}
                  placeholder='Old Password'
                  required
                />
              </div>
              <div>
                <label htmlFor="newPassword">New Password</label>
                <input
                  type="password"
                  id="newPassword"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="New Password"
                  required
                />
              </div>
              <div>
                <label htmlFor="confirmPassword">Confirm New Password</label>
                <input
                  type="password"
                  id="confirmPassword"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Confirm New Password"
                  required
                />
              </div>
              <button type="submit">Update Password</button>
            </form>
            <button
              className="close-modal-button"
              onClick={() => setModalOpen(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
