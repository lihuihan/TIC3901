// src/components/AddEditProfile.js
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './ProfileForm.css';

const AddEditProfile = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [profile, setProfile] = useState({ name: '', age: '' });

    useEffect(() => {
        if (id) {
            const fetchProfile = async () => {
                const response = await fetch(`http://localhost:5001/api/profiles/${id}`);
                const data = await response.json();
                setProfile(data);
            };
            fetchProfile();
        }
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProfile({ ...profile, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (id) {
            await fetch(`http://localhost:5001/api/profiles/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(profile),
            });
        } else {
            await fetch('http://localhost:5001/api/profiles', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(profile),
            });
        }
        navigate('/profiles'); // Navigate back to ProfileList
    };

    return (
            <div className="form-container">
                <h1 className="form-title">{id ? 'Edit Profile' : 'Add Profile'}</h1>
                <form className="profile-form" onSubmit={handleSubmit}>
                    <input
                        type="text"
                        name="name"
                        placeholder="Name"
                        value={profile.name}
                        onChange={handleChange}
                        required
                        className="form-input"
                    />
                    <input
                        type="number"
                        name="age"
                        placeholder="Age"
                        value={profile.age}
                        onChange={handleChange}
                        required
                        className="form-input"
                    />
                    <button type="submit" className="form-button">{id ? 'Save Changes' : 'Add Profile'}</button>
                </form>
                <button onClick={() => navigate('/profiles')} className="back-button">Back to Profile List</button>
            </div>
        );
};

export default AddEditProfile;
