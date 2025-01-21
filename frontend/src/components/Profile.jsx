import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from './Navbar.jsx';
import axios from '../utils/axiosConfig.js';
import deimg from '../assets/acountimg.png'

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
            axios.get(`/profile/${userId}`)
                .then((response) => {
                    const data = response.data;
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
                .catch((error) => {
                    console.error('Error fetching profile:', error);
                });
        }
    }, [userId]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProfile((prevProfile) => ({
            ...prevProfile,
            [name]:
                name === 'favoriteBooks' || name === 'favoriteGenres' || name === 'favoriteAuthors' || name === 'themes'
                    ? value.split(',').map((item) => item.trim())
                    : value,
        }));
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setProfile((prevProfile) => ({
                    ...prevProfile,
                    photo: reader.result,
                }));
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('/profile', { userId, ...profile })
            .then((response) => {
                alert('Profile updated!');
                setProfile(response.data);
            })
            .catch((error) => {
                console.error('Error updating profile:', error);
                alert(`Failed to update profile: ${error.message}`);
            });
    };

    return (
        <>
            <Navbar />
            <div className="flex flex-col md:flex-row max-w-7xl mx-auto p-6">
                {/* Left Profile Section */}
                <div className="md:w-1/3 bg-white shadow-md rounded-lg p-4 mr-4">
                    <div className="flex flex-col items-center mb-4">
                        {profile.photo ? (
                            <img src={profile.photo} alt="Profile" className="rounded-full w-32 h-32 object-cover mb-2" />
                        ) : (
                            <img src={deimg} alt="Default" className="rounded-full w-32 h-32 object-cover mb-2" />
                        )}
                        <h2 className="text-xl font-semibold">{profile.name}</h2>
                        <p className="text-gray-600 text-center">{profile.email}</p>
                        <p className="text-gray-700 text-center mb-4">{profile.bio}</p>
                    </div>
                    <div className="flex justify-between mb-4">
                        <p><strong>Followers:</strong> {profile.followers}</p>
                        <p><strong>Following:</strong> {profile.following}</p>
                    </div>
                    <Link to="/recommendations">
                        <button className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600">
                            View Recommendations
                        </button>
                    </Link>
                </div>

                {/* Right Profile Edit Section */}
                <div className="md:w-2/3 bg-white shadow-md rounded-lg p-4">
                    <form onSubmit={handleSubmit}>
                        <h1 className="text-2xl font-bold mb-4">Profile Details</h1>
                        <input
                            type="text"
                            name="name"
                            placeholder="Name"
                            value={profile.name}
                            onChange={handleChange}
                            className="border border-gray-300 rounded p-2 mb-4 w-full"
                        />
                        <input
                            type="email"
                            name="email"
                            placeholder="Email"
                            value={profile.email}
                            onChange={handleChange}
                            className="border border-gray-300 rounded p-2 mb-4 w-full"
                        />
                        <textarea
                            name="bio"
                            placeholder="Bio"
                            value={profile.bio}
                            onChange={handleChange}
                            className="border border-gray-300 rounded p-2 mb-4 w-full"
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
                            className="border border-gray-300 rounded p-2 mb-4 w-full"
                        />
                        <input
                            type="text"
                            name="favoriteGenres"
                            placeholder="Favorite Genres (comma separated)"
                            value={profile.favoriteGenres.join(', ')}
                            onChange={handleChange}
                            className="border border-gray-300 rounded p-2 mb-4 w-full"
                        />
                        <input
                            type="text"
                            name="favoriteAuthors"
                            placeholder="Favorite Authors (comma separated)"
                            value={profile.favoriteAuthors.join(', ')}
                            onChange={handleChange}
                            className="border border-gray-300 rounded p-2 mb-4 w-full"
                        />
                        <input
                            type="text"
                            name="themes"
                            placeholder="Themes (comma separated)"
                            value={profile.themes.join(', ')}
                            onChange={handleChange}
                            className="border border-gray-300 rounded p-2 mb-4 w-full"
                        />
                        <button type="submit" className="w-full bg-green-500 text-white py-2 rounded hover:bg-green-600">
                            Update Profile
                        </button>
                    </form>
                </div>
            </div>
        </>
    );
};

export default Profile;
