import React from 'react';
import AllGroupsList from '../components/AllGroupsList';
import CreateGroupButton from '../components/CreateGroupButton';
import './GroupListPage.css';

const GroupListPage = () => {
    return (
        <div className="group-list-page">
            <div className="header">
                <h1>All Groups</h1>
                <CreateGroupButton />
            </div>
            <AllGroupsList />
        </div>
    );
};

export default GroupListPage;