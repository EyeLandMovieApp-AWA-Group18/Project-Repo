import axios from 'axios';

const BASE_URL = 'http://localhost:5000/api/groups';

// Get token from sessionStorage
const getToken = () => {
    const user = JSON.parse(sessionStorage.getItem('user'));
    return user?.token ? `Bearer ${user.token}` : null;
};

// Create headers with authorization
const getHeaders = () => ({
    headers: { 
        'Authorization': getToken(),
        'Content-Type': 'application/json'
    }
});

// Get all groups
export const getAllGroups = async () => {
    const response = await axios.get(BASE_URL, getHeaders());
    return response.data;
};

// Create a new group
export const createGroup = async (groupData) => {
    const response = await axios.post(BASE_URL, groupData, getHeaders());
    return response.data;
};

// Get group details
export const getGroupDetails = async (groupId) => {
    const response = await axios.get(`${BASE_URL}/${groupId}`, getHeaders());
    return response.data;
};

// Get group members
export const getGroupMembers = async (groupId) => {
    const response = await axios.get(`${BASE_URL}/${groupId}/members`, getHeaders());
    return response.data;
};

// Send join request
export const sendJoinRequest = async (groupId) => {
    const response = await axios.post(`${BASE_URL}/${groupId}/requests`, {}, getHeaders());
    return response.data;
};

// Get pending join requests (for group owner)
export const getPendingRequests = async (groupId) => {
    const response = await axios.get(`${BASE_URL}/${groupId}/requests`, getHeaders());
    return response.data;
};

// Accept join request
export const acceptJoinRequest = async (groupId, requestId) => {
    const response = await axios.post(
        `${BASE_URL}/${groupId}/requests/${requestId}/accept`,
        {},
        getHeaders()
    );
    return response.data;
};

// Reject/delete join request
export const rejectJoinRequest = async (groupId, requestId) => {
    const response = await axios.delete(
        `${BASE_URL}/${groupId}/requests/${requestId}`,
        getHeaders()
    );
    return response.data;
};

// Cancel join request (as user)
export const cancelJoinRequest = async (groupId) => {
    const response = await axios.delete(`${BASE_URL}/${groupId}/requests`, getHeaders());
    return response.data;
};

// Check membership status
export const checkMembership = async (groupId) => {
    const response = await axios.get(`${BASE_URL}/${groupId}/membership`, getHeaders());
    return response.data;
};

// Check if user has pending request
export const checkPendingRequest = async (groupId) => {
    try {
        const response = await axios.get(`${BASE_URL}/${groupId}/requests/status`, getHeaders());
        return response.data;
    } catch (error) {
        if (error.response?.status === 404) {
            return { hasPendingRequest: false };
        }
        throw error;
    }
};
