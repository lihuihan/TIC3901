// src/pages/ProfilePage.js
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import ProfileList from '../components/ProfileList';
import ProfileForm from '../components/ProfileForm';

const ProfilePage = () => {
    return (
        <Routes>
            <Route path="/" element={<ProfileList />} />
            <Route path="/add-edit" element={<ProfileForm />} />
            <Route path="/add-edit/:id" element={<ProfileForm />} />
        </Routes>
    );
};

export default ProfilePage;
