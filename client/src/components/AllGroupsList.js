import React, { useEffect, useState } from 'react';
import GroupCard from './GroupCard.js';
import axios from 'axios';
import { useUser } from '../contexts/useUser'; 
import './AllGroupsList.css';

const API_BASE_URL = process.env.REACT_APP_API_URL;

const AllGroupsList = () => {
    const [groups, setGroups] = useState([]);
    const { user } = useUser();

    useEffect(() => {
        const fetchGroups = async () => {
            try {
                const response = await axios.get(`${API_BASE_URL}/groups`, {
                    headers: { Authorization: `Bearer ${user.token}` }, 
                });
                setGroups(response.data);
            } catch (error) {
                console.error('Error fetching groups:', error);
            }
        };

        fetchGroups();
    }, [user]);

    return (
        <div className="all-groups-list grid-layout">
            {groups.map((group) => (
                <GroupCard key={group.id} group={group} />
            ))}
        </div>
    );
};

export default AllGroupsList;
