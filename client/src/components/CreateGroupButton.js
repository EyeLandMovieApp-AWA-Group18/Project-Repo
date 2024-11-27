import React from 'react';
import { useNavigate } from 'react-router-dom';

const CreateGroupButton = () => {
    const navigate = useNavigate();

    return (
        <button onClick={() => navigate('/groups/new')}>Create New Group</button>
    );
};

export default CreateGroupButton;