import React, { useState, useEffect } from 'react';
import { getPendingRequests, acceptJoinRequest, rejectJoinRequest } from '../services/groupService';
import './PendingRequestsList.css';

const PendingRequestsList = ({ groupId, onRequestUpdate }) => {
    const [requests, setRequests] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [processingRequests, setProcessingRequests] = useState({});

    useEffect(() => {
        fetchRequests();
    }, [groupId]);

    const fetchRequests = async () => {
        try {
            const data = await getPendingRequests(groupId);
            setRequests(data);
            setError(null);
        } catch (error) {
            setError('Failed to load pending requests');
            console.error('Error fetching requests:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleAccept = async (requestId) => {
        setProcessingRequests(prev => ({ ...prev, [requestId]: true }));
        try {
            await acceptJoinRequest(groupId, requestId);
            setRequests(requests.filter(req => req.id !== requestId));
            if (onRequestUpdate) onRequestUpdate();
        } catch (error) {
            console.error('Error accepting request:', error);
            setError('Failed to accept request');
        } finally {
            setProcessingRequests(prev => ({ ...prev, [requestId]: false }));
        }
    };

    const handleReject = async (requestId) => {
        setProcessingRequests(prev => ({ ...prev, [requestId]: true }));
        try {
            await rejectJoinRequest(groupId, requestId);
            setRequests(requests.filter(req => req.id !== requestId));
            if (onRequestUpdate) onRequestUpdate();
        } catch (error) {
            console.error('Error rejecting request:', error);
            setError('Failed to reject request');
        } finally {
            setProcessingRequests(prev => ({ ...prev, [requestId]: false }));
        }
    };

    if (loading) {
        return <div className="pending-requests-loading">Loading requests...</div>;
    }

    if (error) {
        return <div className="pending-requests-error">{error}</div>;
    }

    if (requests.length === 0) {
        return <div className="pending-requests-empty">No pending requests</div>;
    }

    return (
        <div className="pending-requests-list">
            {requests.map(request => (
                <div key={request.id} className="request-item">
                    <div className="request-info">
                        <span className="username">{request.username}</span>
                        <span className="email">{request.email}</span>
                    </div>
                    <div className="request-actions">
                        <button
                            className="accept-button"
                            onClick={() => handleAccept(request.id)}
                            disabled={processingRequests[request.id]}
                        >
                            {processingRequests[request.id] ? 'Accepting...' : 'Accept'}
                        </button>
                        <button
                            className="reject-button"
                            onClick={() => handleReject(request.id)}
                            disabled={processingRequests[request.id]}
                        >
                            {processingRequests[request.id] ? 'Rejecting...' : 'Reject'}
                        </button>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default PendingRequestsList;
