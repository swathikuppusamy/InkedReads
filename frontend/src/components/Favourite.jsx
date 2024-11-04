import React, { useState, useEffect } from 'react';
import Navbar from './Navbar.jsx';

const FavoritesPage = () => {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const storedUserId = localStorage.getItem('userId');
    if (storedUserId) {
      setUserId(storedUserId);
    } else {
      setError('User ID not found in local storage');
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (userId) {
      const fetchFavorites = async () => {
        try {
          setLoading(true);
          const response = await fetch(`http://localhost:5057/favorites/${userId}`);
          if (!response.ok) {
            throw new Error('Failed to fetch favorites');
          }
          const data = await response.json();
          setFavorites(data);
        } catch (err) {
          setError(err.message);
        } finally {
          setLoading(false);
        }
      };

      fetchFavorites();
    }
  }, [userId]);

  const handleDelete = async (favoriteId) => {
    try {
      const response = await fetch(`http://localhost:5057/favorites/${favoriteId}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete favorite');
      }

      // Filter out the deleted favorite from the state
      setFavorites((prevFavorites) => prevFavorites.filter(favorite => favorite._id !== favoriteId));
    } catch (err) {
      setError(err.message);
    }
  };

  if (loading) {
    return <p className="text-center text-lg">Loading favorites...</p>;
  }

  if (error) {
    return <p className="text-center text-lg text-red-500">Error: {error}</p>;
  }

  return (
    <div className="bg-gray-100 min-h-screen ">
      <Navbar />
      <div className="mt-6 max-w-4xl mx-auto p-8 bg-white rounded-lg shadow-md">
        <h2 className="text-3xl font-semibold text-center mb-6">Your Favourite Books</h2>
        {favorites.length === 0 ? (
          <p className="text-center">No favorites found.</p>
        ) : (
          <div className="space-y-6">
            {favorites.map((favorite) => (
              <div key={favorite._id} className="flex bg-white p-4 rounded-lg shadow hover:shadow-md transition-shadow duration-200">
                <img 
                  src={favorite.book.thumbnail} 
                  alt={favorite.book.title} 
                  className="w-24 h-32 rounded-md mr-4"
                />
                <div className="flex-grow">
                  <h3 className="text-lg font-semibold">{favorite.book.title}</h3>
                  <p className="text-gray-700"><strong>Author:</strong> {favorite.book.authors.join(', ')}</p>
                  <p className="text-gray-700"><strong>Published:</strong> {favorite.book.publishedDate}</p>
                  <button 
                    className="mt-2 px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors duration-200" 
                    onClick={() => handleDelete(favorite._id)}
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default FavoritesPage;
