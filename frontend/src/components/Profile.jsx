import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Profile = () => {
    const [profile, setProfile] = useState({
        name: '',
        email: '',
        photo: '',
        bio: '',
        favoriteBooks: [],
        favoriteGenres: [],
        favoriteAuthors: [],
        themes: [],
        followers: 0,
        following: 0,
    });

    const [userId, setUserId] = useState(localStorage.getItem('userId') || '');

    useEffect(() => {
        if (userId) {
            fetch(`http://localhost:3000/api/profile-settings/${userId}`)
                .then(res => res.json())
                .then(data => {
                    setProfile({
                        name: data.name || '',
                        email: data.email || '',
                        photo: data.photo || '',
                        bio: data.bio || '',
                        favoriteBooks: data.favoriteBooks || [],
                        favoriteGenres: data.favoriteGenres || [],
                        favoriteAuthors: data.favoriteAuthors || [],
                        themes: data.themes || [],
                        followers: data.followers || 0,
                        following: data.following || 0,
                    });
                })
                .catch(error => {
                    console.error('Error fetching profile:', error);
                });
        }
    }, [userId]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProfile(prevProfile => ({
            ...prevProfile,
            [name]: name === 'favoriteBooks' || name === 'favoriteGenres' || name === 'favoriteAuthors' || name === 'themes'
                ? value.split(',').map(item => item.trim())
                : value,
        }));
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setProfile(prevProfile => ({
                    ...prevProfile,
                    photo: reader.result,
                }));
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        fetch('http://localhost:3000/api/profile-settings', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ userId, ...profile }),
        })
        .then(res => {
            if (!res.ok) {
                throw new Error(`HTTP error! status: ${res.status}`);
            }
            return res.json();
        })
        .then(data => {
            alert('Profile updated!');
            setProfile(data);
        })
        .catch(error => {
            console.error('Error:', error);
            alert(`Failed to update profile: ${error.message}`);
        });
    };

    return (
        <div className="flex flex-col md:flex-row md:space-x-8 p-4 bg-gray-100">
            {/* Left Section */}
            <div className="flex flex-col items-center bg-white rounded-lg shadow-lg p-6 mb-6 md:w-1/3">
                <div className="w-32 h-32 rounded-full overflow-hidden">
                    {profile.photo ? (
                        <img src={profile.photo} alt="Profile" className="w-full h-full object-cover" />
                    ) : (
                        <img src="https://via.placeholder.com/150" alt="Default" className="w-full h-full object-cover" />
                    )}
                </div>
                <h2 className="text-xl font-semibold mt-4">{profile.name}</h2>
                <p className="text-gray-600">{profile.email}</p>
                <p className="text-gray-700 text-center mt-2">{profile.bio}</p>
                <div className="flex justify-between mt-4 w-full">
                    <p><strong>Followers:</strong> {profile.followers}</p>
                    <p><strong>Following:</strong> {profile.following}</p>
                </div>
                <Link to="/recommendations">
                    <button className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">View Recommendations</button>
                </Link>
            </div>

            {/* Right Section */}
            <div className="bg-white rounded-lg shadow-lg p-6 md:w-2/3">
                <h1 className="text-2xl font-bold mb-4">Profile Details</h1>
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        name="name"
                        placeholder="Name"
                        value={profile.name}
                        onChange={handleChange}
                        className="w-full mb-4 p-2 border border-gray-300 rounded"
                    />
                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={profile.email}
                        onChange={handleChange}
                        className="w-full mb-4 p-2 border border-gray-300 rounded"
                    />
                    <input
                        type="text"
                        name="bio"
                        placeholder="Bio"
                        value={profile.bio}
                        onChange={handleChange}
                        className="w-full mb-4 p-2 border border-gray-300 rounded"
                    />
                    <input
                        type="file"
                        name="photo"
                        accept="image/*"
                        onChange={handleFileChange}
                        className="mb-4"
                    />
                    <h2 className="text-lg font-semibold mb-2">Favorite Details</h2>
                    <input
                        type="text"
                        name="favoriteBooks"
                        placeholder="Favorite Books (comma separated)"
                        value={profile.favoriteBooks.join(', ')}
                        onChange={handleChange}
                        className="w-full mb-4 p-2 border border-gray-300 rounded"
                    />
                    <input
                        type="text"
                        name="favoriteGenres"
                        placeholder="Favorite Genres (comma separated)"
                        value={profile.favoriteGenres.join(', ')}
                        onChange={handleChange}
                        className="w-full mb-4 p-2 border border-gray-300 rounded"
                    />
                    <input
                        type="text"
                        name="favoriteAuthors"
                        placeholder="Favorite Authors (comma separated)"
                        value={profile.favoriteAuthors.join(', ')}
                        onChange={handleChange}
                        className="w-full mb-4 p-2 border border-gray-300 rounded"
                    />
                    <input
                        type="text"
                        name="themes"
                        placeholder="Themes (comma separated)"
                        value={profile.themes.join(', ')}
                        onChange={handleChange}
                        className="w-full mb-4 p-2 border border-gray-300 rounded"
                    />
                    <button type="submit" className="w-full mt-4 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700">Update Profile</button>
                </form>
            </div>
        </div>
    );
};

export default Profile;
