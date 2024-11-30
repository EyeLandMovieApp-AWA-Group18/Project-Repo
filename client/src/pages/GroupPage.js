import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useUser } from '../contexts/useUser.js';
import axios from 'axios'; 
import GroupMembers from '../components/GroupMembers';
import PendingRequestsList from '../components/PendingRequestsList';
import GroupMovies from '../components/GroupMovies';
import './GroupPage.css';

const API_BASE_URL = process.env.REACT_APP_API_URL;

const GroupPage = () => {
    const { id } = useParams();
    const [group, setGroup] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [activeSection, setActiveSection] = useState('members');
    const [isMember, setIsMember] = useState(false);
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

        const checkMembershipStatus = async () => {
            try {
                const response = await axios.get(`${API_BASE_URL}/groups/${id}/membership`, {
                    headers: { Authorization: `Bearer ${user.token}` },
                });
                setIsMember(response.data.isMember);
            } catch (error) {
                console.error('Error checking membership:', error);
                setIsMember(false);
            }
        };

        if (user?.token) {
            fetchGroup();
            checkMembershipStatus();
        }
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

    const renderActiveSection = () => {
        switch (activeSection) {
            case 'requests':
                return <PendingRequestsList groupId={id} />;
            case 'members':
                return <GroupMembers groupId={id} isOwner={isOwner} />;
            case 'movies':
                return <GroupMovies groupId={id} />;
            default:
                return null;
        }
    };

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

            {/* Section Switcher */}
            <div className="section-switcher">
                <button 
                    className={`switcher-button ${activeSection === 'members' ? 'active' : ''}`}
                    onClick={() => setActiveSection('members')}
                >
                    👥 Members
                </button>
                {isOwner && (
                    <button 
                        className={`switcher-button ${activeSection === 'requests' ? 'active' : ''}`}
                        onClick={() => setActiveSection('requests')}
                    >
                        ✉️ Requests
                    </button>
                )}
                {(isMember || isOwner) && (
                    <button 
                        className={`switcher-button ${activeSection === 'movies' ? 'active' : ''}`}
                        onClick={() => setActiveSection('movies')}
                    >
                        🎬 Movies
                    </button>
                )}
            </div>

            {/* Active Section Content */}
            <div className="section-content">
                {renderActiveSection()}
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
        </div>
    );
};

export default GroupPage;