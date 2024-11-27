import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../contexts/useUser'; // Import useUser
import axios from 'axios';
import './CreateGroupPage.css';

const CreateGroupPage = () => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const navigate = useNavigate();
	const { user } = useUser();
	const API_BASE_URL = process.env.REACT_APP_API_URL;

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!user || !user.token) {
            alert('You need to be logged in to create a group.');
            return;
        }

        try {
            // Make POST request to create a group
            const response = await axios.post(
                `${API_BASE_URL}/groups`,
                { name, description },
                {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${user.token}`, // Include token for authentication
                    },
                }
            );

            if (response.status === 201) {
                const createdGroup = response.data;
                navigate(`/groups/${createdGroup.id}`); // Redirect to the newly created group page
            } else {
                console.error('Unexpected response:', response);
            }
        } catch (error) {
            console.error('Failed to create group:', error);
        }
    };

    return (
        <div className="create-group-page">
            <h1>Create a New Group</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Group Name:</label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Description:</label>
                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                </div>
                <button type="submit">Create Group</button>
            </form>
        </div>
    );
};

export default CreateGroupPage;
