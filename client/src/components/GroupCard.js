import React ,{useEffect, useState}from 'react';
import { useNavigate } from 'react-router-dom';
import JoinRequestButton from './JoinRequestButton';
import './GroupCard.css';
import { checkMembership } from '../services/groupService';
import { useUser } from '../contexts/useUser';

const GroupCard = ({ group, onRequestUpdate }) => {
    const navigate = useNavigate();
    const { user } = useUser();
    const [isMember, setIsMember] = useState(false);

    useEffect(() => {
        const fetchMembershipStatus = async () => {
            try {
                const response = await checkMembership(group.id);
                setIsMember(response.isMember);
            } catch (error) {
                console.error('Error checking membership:', error);
            }
        };

        if (user?.token) {
            fetchMembershipStatus();
        }
    }, [group.id, user]);
    // Truncate the description
    const truncatedDescription =
        group.description.length > 100
            ? `${group.description.substring(0, 100)}...`
            : group.description;

    return (
        <div className="group-card elegant">
            <div className="group-card-header">
                <h3>
                    <span className="symbol title-symbol">🎬</span> 
                    {group.name}
                </h3>
            </div>
            <div className="group-card-body">
                <p className="group-description">
                    <span className="symbol description-symbol">📝</span>
                    {truncatedDescription}
                </p>
                <p className="group-info">
                    <span className="symbol member-symbol">🧑‍🤝‍🧑</span>
                    Members: {group.member_count || 0}
                </p>
                <p className="group-info">Created: {new Date(group.created_at).toLocaleDateString()}</p>
            </div>
            <div className="group-card-footer">
               {isMember && (
                <button className="view-button" onClick={() => navigate(`/groups/${group.id}`)}>View Group Page</button>
              )}
                <JoinRequestButton groupId={group.id} onRequestSent={onRequestUpdate} />
           </div>
        </div>
    );
};
export default GroupCard;