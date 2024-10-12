// src/pages/HomePage.js
import React from 'react';
import { Link } from 'react-router-dom';
import ProfileList from '../components/ProfileList';

const HomePage = () => {
    return (
        <div>
            <h1>Welcome to the Profile Management App</h1>
            <ProfileList />
            <Link to="/profiles/add-edit">
                <button>Add New Profile</button>
            </Link>
        </div>
    );
};


export default HomePage;
