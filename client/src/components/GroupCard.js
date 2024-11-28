import React from 'react';
import { useNavigate } from 'react-router-dom';
import './GroupCard.css';

const GroupCard = ({ group }) => {
    const navigate = useNavigate();

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
				Members {group.memberCount || '10'}</p> {/* Hardcoded member count */}
			<p className="group-info">Created: {new Date(group.created_at).toLocaleDateString()}</p>
		</div>
		<div className="group-card-footer">
			<button className="view-button" onClick={() => navigate(`/groups/${group.id}`)}>View Group Page</button>
		</div>
	</div>
    );
};
export default GroupCard;