import React, { useEffect, useState } from 'react';
import axios from 'axios';

const App = () => {
    const [profiles, setProfiles] = useState([]);
    const [newProfile, setNewProfile] = useState({ name: '', age: '' });
    const [editingProfile, setEditingProfile] = useState(null);

    // Fetch all profiles
    useEffect(() => {
        fetchProfiles();
    }, []);

    const fetchProfiles = async () => {
        const response = await axios.get('http://localhost:5001/api/profiles');
        setProfiles(response.data);
    };

    const handleAddProfile = async () => {
        const response = await axios.post('http://localhost:5001/api/profiles', newProfile);
        setProfiles([...profiles, response.data]);
        setNewProfile({ name: '', age: '' });
    };

    const handleEditProfile = async (id) => {
        const response = await axios.put(`http://localhost:5001/api/profiles/${id}`, editingProfile);
        setProfiles(profiles.map(p => (p.id === id ? response.data : p)));
        setEditingProfile(null);
    };

    const handleDeleteProfile = async (id) => {
        await axios.delete(`http://localhost:5001/api/profiles/${id}`);
        setProfiles(profiles.filter(p => p.id !== id));
    };

    return (
        <div>
            <h1>Profiles</h1>
            <div>
                <h2>Add New Profile</h2>
                <input
                    type="text"
                    placeholder="Name"
                    value={newProfile.name}
                    onChange={(e) => setNewProfile({ ...newProfile, name: e.target.value })}
                />
                <input
                    type="number"
                    placeholder="Age"
                    value={newProfile.age}
                    onChange={(e) => setNewProfile({ ...newProfile, age: e.target.value })}
                />
                <button onClick={handleAddProfile}>Add Profile</button>
            </div>

            <ul>
                {profiles.map(profile => (
                    <li key={profile.id}>
                        <span>{profile.name} (Age: {profile.age})</span>
                        <button onClick={() => setEditingProfile(profile)}>Edit</button>
                        <button onClick={() => handleDeleteProfile(profile.id)}>Delete</button>

                        {editingProfile && editingProfile.id === profile.id && (
                            <div>
                                <input
                                    type="text"
                                    value={editingProfile.name}
                                    onChange={(e) => setEditingProfile({ ...editingProfile, name: e.target.value })}
                                />
                                <input
                                    type="number"
                                    value={editingProfile.age}
                                    onChange={(e) => setEditingProfile({ ...editingProfile, age: e.target.value })}
                                />
                                <button onClick={() => handleEditProfile(profile.id)}>Save</button>
                            </div>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default App;
