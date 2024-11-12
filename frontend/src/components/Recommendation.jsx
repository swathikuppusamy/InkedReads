import React, { useEffect, useState } from 'react';
import fetchRecommendedBooks from './recommendations.js'; 
import Navbar from './Navbar.jsx';

const Recommendations = ({ userId }) => {
    const [recommendedBooks, setRecommendedBooks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchRecommendations = async () => {
            try {
                const res = await fetch(`http://localhost:5057/api/profile/${userId}`);
                if (!res.ok) {
                    throw new Error(`HTTP error! status: ${res.status}`);
                }
                const profileData = await res.json();
                const books = await fetchRecommendedBooks(profileData);
                setRecommendedBooks(books);
            } catch (error) {
                setError('Failed to fetch recommendations. Please try again later.');
            } finally {
                setLoading(false);
            }
        };

        fetchRecommendations();
    }, [userId]);

    const handleAddToFavorites = (book) => {
        const bookData = {
          id: book.id,
          title: book.volumeInfo.title,
          authors: book.volumeInfo.authors || [],
          publisher: book.volumeInfo.publisher || 'Unknown',
          publishedDate: book.volumeInfo.publishedDate || 'Unknown',
          thumbnail: book.volumeInfo.imageLinks ? book.volumeInfo.imageLinks.thumbnail : '',
          webReaderLink: book.volumeInfo.webReaderLink || ''
        };
    
        fetch('http://localhost:5057/favorites', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            userId,
            book: bookData
          })
        })
        .then(response => response.json())
        .then(data => {
          alert('Book added to favorites');
        })
        .catch(error => {
          console.error('Error adding book to favorites:', error);
        });
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
