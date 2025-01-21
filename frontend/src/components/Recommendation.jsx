import React, { useEffect, useState } from 'react';
import fetchRecommendedBooks from './recommendations.js';
import Navbar from './Navbar.jsx';
import axios from '../utils/axiosConfig.js';

const Recommendations = ({ userId }) => {
    const [recommendedBooks, setRecommendedBooks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchRecommendations = async () => {
            try {
                const profileRes = await axios.get(`api/profile/${userId}`);
                const profileData = profileRes.data;
                const books = await fetchRecommendedBooks(profileData);
                setRecommendedBooks(books);
            } catch (error) {
                console.error('Error fetching recommendations:', error);
                setError('Failed to fetch recommendations. Please try again later.');
            } finally {
                setLoading(false);
            }
        };

        fetchRecommendations();
    }, [userId]);

    const handleAddToFavorites = async (book) => {
        const bookData = {
            id: book.id,
            title: book.volumeInfo.title,
            authors: book.volumeInfo.authors || [],
            publisher: book.volumeInfo.publisher || 'Unknown',
            publishedDate: book.volumeInfo.publishedDate || 'Unknown',
            thumbnail: book.volumeInfo.imageLinks ? book.volumeInfo.imageLinks.thumbnail : '',
            webReaderLink: book.volumeInfo.webReaderLink || ''
        };

        try {
            const response = await axios.post('favorites', {
                userId,
                book: bookData
            });
            alert('Book added to favorites');
        } catch (error) {
            console.error('Error adding book to favorites:', error);
            alert('Failed to add book to favorites. Please try again later.');
        }
    };

    return (
        <div className="min-h-screen bg-gray-100">
            <Navbar />
            <div className="container mx-auto p-6">
                <h1 className="text-3xl font-bold mb-4">Personalized Recommendations</h1>
                {loading ? (
                    <p className="text-lg">Loading recommendations...</p>
                ) : error ? (
                    <p className="text-red-500">{error}</p>
                ) : recommendedBooks.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {recommendedBooks.map((book, index) => (
                            <div
                                key={index}
                                className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col justify-between h-full"
                            >
                                <a
                                    href={book.volumeInfo.infoLink}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex-grow"
                                >
                                    <img
                                        src={book.volumeInfo.imageLinks?.thumbnail || 'https://via.placeholder.com/128x192?text=No+Cover'}
                                        alt={book.volumeInfo.title}
                                        className="w-full h-48 object-cover"
                                    />
                                    <div className="p-4">
                                        <h2 className="text-lg font-semibold">{book.volumeInfo.title}</h2>
                                        <p className="text-sm text-gray-600">
                                            by {book.volumeInfo.authors?.join(', ') || 'Unknown Author'}
                                        </p>
                                        <p className="text-xs text-gray-500">
                                            {book.volumeInfo.categories?.join(', ') || 'No categories available'}
                                        </p>
                                    </div>
                                </a>
                                <button
                                    className="mt-4 px-4 py-3 bg-red-500 text-white rounded-lg hover:bg-red-600"
                                    onClick={() => handleAddToFavorites(book)}
                                >
                                    ❤️ Add to Favorites
                                </button>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p className="text-lg">No recommendations available based on your preferences.</p>
                )}
            </div>
        </div>
    );
};

export default Recommendations;
