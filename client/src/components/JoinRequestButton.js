import React, { useState, useEffect, useContext } from 'react';
import { UserContext } from '../contexts/UserContext';
import { useNavigate } from 'react-router-dom';
import { 
    sendJoinRequest, 
    cancelJoinRequest, 
    checkMembership,
    checkPendingRequest 
} from '../services/groupService';
import './JoinRequestButton.css';

const JoinRequestButton = ({ groupId, onRequestSent }) => {
    const navigate = useNavigate();
    const { user } = useContext(UserContext);
    const [isLoading, setIsLoading] = useState(false);
    const [hasPendingRequest, setHasPendingRequest] = useState(false);
    const [isMember, setIsMember] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (user?.token) {
            checkInitialStatus();
        }
    }, [groupId, user]);

    const checkInitialStatus = async () => {
        try {
            const [membershipStatus, requestStatus] = await Promise.all([
                checkMembership(groupId),
                checkPendingRequest(groupId)
            ]);
            
            setIsMember(membershipStatus.isMember);
            setHasPendingRequest(requestStatus.hasPendingRequest);
        } catch (error) {
            console.error('Error checking status:', error);
        }
    };

    const handleJoinRequest = async () => {
        if (!user?.token) {
            navigate('/login');
            return;
        }

        setIsLoading(true);
        setError(null);
        try {
            await sendJoinRequest(groupId);
            setHasPendingRequest(true);
            if (onRequestSent) onRequestSent();
        } catch (error) {
            // Even if we get a 409 (request exists), we should update the UI
            // to show the pending state since that's the actual state
            if (error.response?.status === 409) {
                setHasPendingRequest(true);
            } else {
                setError(error.response?.data?.message || 'Failed to send join request');
            }
        } finally {
            setIsLoading(false);
        }
    };

    const handleCancelRequest = async () => {
        if (!user?.token) {
            navigate('/login');
            return;
        }

        setIsLoading(true);
        setError(null);
        try {
            await cancelJoinRequest(groupId);
            setHasPendingRequest(false);
            if (onRequestSent) onRequestSent();
        } catch (error) {
            // If we get a 404 (request not found), update the UI state
            if (error.response?.status === 404) {
                setHasPendingRequest(false);
            } else {
                setError(error.response?.data?.message || 'Failed to cancel request');
            }
        } finally {
            setIsLoading(false);
        }
    };

    if (!user?.token) {
        return (
            <button 
                className="join-button login-required"
                onClick={() => navigate('/login')}
            >
                Login to Join
            </button>
        );
    }

    if (isMember) {
        return <button className="join-button member" disabled>Already a Member</button>;
    }

    if (hasPendingRequest) {
        return (
            <button 
                className="join-button pending"
                onClick={handleCancelRequest}
                disabled={isLoading}
            >
                {isLoading ? 'Canceling...' : 'Cancel Request'}
            </button>
        );
    }

    return (
        <div className="join-request-container">
            <button 
                className="join-button"
                onClick={handleJoinRequest}
                disabled={isLoading}
            >
                {isLoading ? 'Sending...' : 'Join Group'}
            </button>
            {error && <div className="error-message">{error}</div>}
        </div>
    );
};

export default JoinRequestButton;
