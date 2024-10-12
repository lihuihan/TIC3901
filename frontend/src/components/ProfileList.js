import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './ProfileList.css'; // Import the CSS file if needed

const ProfileList = () => {
    const [profiles, setProfiles] = useState([]);

    useEffect(() => {
        const fetchProfiles = async () => {
            const response = await fetch('http://localhost:5001/api/profiles');
            const data = await response.json();
            setProfiles(data);
        };
        fetchProfiles();
    }, []);

    const handleDeleteProfile = async (id) => {
        await fetch(`http://localhost:5001/api/profiles/${id}`, {
            method: 'DELETE',
        });
        setProfiles(profiles.filter(profile => profile.id !== id));
    };

    return (
        <div className="profile-list">
            <h2>Profile List</h2>
            <Link to="/profiles/add-edit" className="add-profile-button">Add New Profile</Link>
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Age</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {profiles.length > 0 ? (
                        profiles.map(profile => (
                            <tr key={profile.id}>
                                <td>{profile.name}</td>
                                <td>{profile.age}</td>
                                <td>
                                    <Link to={`/profiles/add-edit/${profile.id}`} className="edit-profile-button">Edit</Link>
                                    <button onClick={() => handleDeleteProfile(profile.id)} className="delete-button">Delete</button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="3">No profiles available.</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default ProfileList;
