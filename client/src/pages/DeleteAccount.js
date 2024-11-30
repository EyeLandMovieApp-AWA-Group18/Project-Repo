import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../contexts/useUser';
import axios from 'axios';
import './DeleteAccount.css';

const DeleteAccount = () => {
    const navigate = useNavigate();
    const { user, setUser } = useUser();
    const API_BASE_URL = process.env.REACT_APP_API_URL;
    const handleDelete = async () => {
        try {
            await axios.delete(`${API_BASE_URL}/delete`, { headers: { Authorization: `Bearer ${user.token}` } });
            // Clear the user context and session storage
            setUser(null); // Clear context
            sessionStorage.removeItem('user'); // Clear session storage
            sessionStorage.removeItem('token'); // Remove token if stored separately
            alert('Account deleted successfully.');
            navigate('/');
        } catch (error) {
            console.error('Error deleting account:', error);
            alert('Failed to delete account. Please try again.');
        }
    };

    const handleCancel = () => {
        navigate('/');
    };

    return (
        <div className="delete-account-container">
            <h2>Confirm Account Deletion</h2>
            <p>If you delete your account, all your data (Reviews, Favorites, Sharing favorites) will also be removed. Do you still want to proceed?</p>
            <div className="button-container">
			 <button onClick={handleDelete} className="delete-button">Delete</button>
             <button onClick={handleCancel} className="cancel-button">Cancel</button>
			</div>
        </div>
    );
};

export default DeleteAccount;
