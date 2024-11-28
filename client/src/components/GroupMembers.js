import React, { useState, useEffect } from 'react';
import { useUser } from '../contexts/useUser';
import axios from 'axios';
import './GroupMembers.css';

const API_BASE_URL = process.env.REACT_APP_API_URL;

const GroupMembers = ({ groupId, isOwner }) => {
    const [members, setMembers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { user } = useUser();

    useEffect(() => {
        fetchMembers();
    }, [groupId]);

    const fetchMembers = async () => {
        try {
            const response = await axios.get(
                `${API_BASE_URL}/groups/${groupId}/members`,
                {
                    headers: { Authorization: `Bearer ${user.token}` },
                }
            );
            setMembers(response.data);
            setLoading(false);
            setError(null); // Clear any previous errors
        } catch (error) {
            console.error('Error fetching members:', error);
            setError('Failed to load group members');
            setLoading(false);
        }
    };

    const handleJoinGroup = async () => {
        try {
            setError(null); // Clear any previous errors
            const response = await axios.post(
                `${API_BASE_URL}/groups/${groupId}/members`,
                {},
                {
                    headers: { 
                        Authorization: `Bearer ${user.token}`,
                        'Content-Type': 'application/json'
                    }
                }
            );
            if (response.status === 201) {
                await fetchMembers(); // Refresh member list
            }
        } catch (error) {
            console.error('Error joining group:', error);
            if (error.response?.data?.message) {
                setError(error.response.data.message);
            } else if (error.response?.status === 400) {
                setError('Invalid request. Please try again.');
            } else if (error.response?.status === 401) {
                setError('You are not authorized to join this group.');
            } else if (error.response?.status === 403) {
                setError('You are not allowed to join this group.');
            } else if (error.response?.status === 500) {
                setError('Internal server error. Please try again later.');
            } else {
                setError('Failed to join group');
            }
        }
    };

    const handleLeaveGroup = async () => {
        try {
            setError(null); // Clear any previous errors
            await axios.delete(
                `${API_BASE_URL}/groups/${groupId}/members`,
                {
                    headers: { 
                        Authorization: `Bearer ${user.token}`,
                        'Content-Type': 'application/json'
                    },
                    data: { userId: user.id }
                }
            );
            await fetchMembers(); // Refresh member list
        } catch (error) {
            console.error('Error leaving group:', error);
            setError(error.response?.data?.message || 'Failed to leave group');
        }
    };

    const handleRemoveMember = async (memberId) => {
        if (!isOwner) return;
        
        try {
            setError(null); // Clear any previous errors
            await axios.delete(
                `${API_BASE_URL}/groups/${groupId}/members`,
                {
                    headers: { 
                        Authorization: `Bearer ${user.token}`,
                        'Content-Type': 'application/json'
                    },
                    data: { userId: memberId }
                }
            );
            await fetchMembers(); // Refresh member list
        } catch (error) {
            console.error('Error removing member:', error);
            setError(error.response?.data?.message || 'Failed to remove member');
        }
    };

    if (loading) return <div>Loading members...</div>;

    const isMember = members.some(member => member.id === user.id);

    return (
        <div className="group-members">
            <div className="members-header">
                <h2>Group Members ({members.length})</h2>
                {!isMember && !isOwner && (
                    <button className="join-button" onClick={handleJoinGroup}>
                        Join Group
                    </button>
                )}
                {isMember && !isOwner && (
                    <button className="leave-button" onClick={handleLeaveGroup}>
                        Leave Group
                    </button>
                )}
            </div>
            {error && <div className="error-message">{error}</div>}
            <div className="members-list">
                {members.map((member) => (
                    <div key={member.id} className="member-item">
                        <div className="member-info">
                            <span className="member-name">{member.username}</span>
                            <span className="member-joined">
                                Joined {new Date(member.joined_at).toLocaleDateString()}
                            </span>
                        </div>
                        {isOwner && member.id !== user.id && (
                            <button
                                className="remove-button"
                                onClick={() => handleRemoveMember(member.id)}
                            >
                                Remove
                            </button>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default GroupMembers;
