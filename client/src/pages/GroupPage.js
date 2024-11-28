import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useUser } from '../contexts/useUser.js';
import axios from 'axios'; 
import GroupMembers from '../components/GroupMembers';
import './GroupPage.css';

const API_BASE_URL = process.env.REACT_APP_API_URL;

const GroupPage = () => {
    const { id } = useParams();
    const [group, setGroup] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const navigate = useNavigate();
    const { user } = useUser();

    useEffect(() => {
        const fetchGroup = async () => {
            try {
                const response = await axios.get(`${API_BASE_URL}/groups/${id}`, {
                    headers: { Authorization: `Bearer ${user.token}` },
                });
                setGroup(response.data);
            } catch (error) {
                console.error('Error fetching group:', error);
            }
        };

        fetchGroup();
    }, [id, user]);

    const handleDelete = async () => {
        if (!user || !user.token) {
            alert('You need to be logged in to delete a group.');
            return;
        }

        try {
            const response = await axios.delete(`${API_BASE_URL}/groups/${id}`, {
                headers: { Authorization: `Bearer ${user.token}` },
            });

            if (response.status === 200) {
                navigate('/groups');
            } else {
                console.error('Failed to delete group');
            }
        } catch (error) {
            console.error('Error deleting group:', error);
        }
    };

    const confirmDelete = () => {
        setShowModal(false);
        handleDelete();
    };

    if (!group) return <p>Loading...</p>;

    const isOwner = group.owner_id === user?.id;

    return (
        <div className="group-page">
            <div className="group-page-header">
                <div className="header-content">
                    <h1>{group.name}</h1>
                    <p className="group-description">{group.description}</p>
                </div>
                {isOwner && (
                    <button 
                        className="delete-group-button" 
                        onClick={() => setShowModal(true)}
                    >
                        🗑️ Delete Group
                    </button>
                )}
            </div>

            {/* Confirmation Modal */}
            {showModal && (
                <div className="modal">
                    <div className="modal-content">
                        <h3>Are you sure you want to delete this group?</h3>
                        <p>This action cannot be undone.</p>
                        <div className="modal-actions">
                            <button onClick={confirmDelete} className="confirm-btn">
                                Yes, Delete
                            </button>
                            <button onClick={() => setShowModal(false)} className="cancel-btn">
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Group Members Section */}
            <GroupMembers groupId={id} isOwner={isOwner} />

            {/* Group Movies Section */}
            <section className="group-movies">
                <h2>🎬 Group Movies</h2>
                <p>No movies added yet.</p>
            </section>
        </div>
    );
};

export default GroupPage;