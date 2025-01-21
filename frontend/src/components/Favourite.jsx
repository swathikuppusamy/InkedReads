import React, { useState, useEffect } from 'react';
import axios from '../utils/axiosConfig.js';
import Navbar from './Navbar.jsx';

const FavoritesPage = () => {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [userId, setUserId] = useState(null);
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [sortOrder, setSortOrder] = useState('Title');
  const categories = ['All', 'Currently Reading', 'Want to Read', 'Finished'];

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
          const response = await axios.get(`favorites/${userId}`);
          const data = response.data;

          // Load saved notes and categories from localStorage
          const savedData = JSON.parse(localStorage.getItem(`favoritesData_${userId}`)) || {};
          const enrichedData = data.map(favorite => ({
            ...favorite,
            category: savedData[favorite._id]?.category || 'Want to Read',
            note: savedData[favorite._id]?.note || ''
          }));

          setFavorites(enrichedData);
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
      await axios.delete(`http://localhost:5057/favorites/${favoriteId}`);

      // Remove from favorites and localStorage
      setFavorites((prevFavorites) => prevFavorites.filter(favorite => favorite._id !== favoriteId));
      const savedData = JSON.parse(localStorage.getItem(`favoritesData_${userId}`)) || {};
      delete savedData[favoriteId];
      localStorage.setItem(`favoritesData_${userId}`, JSON.stringify(savedData));
    } catch (err) {
      setError(err.message);
    }
  };

  const handleCategoryChange = (favoriteId, newCategory) => {
    setFavorites((prevFavorites) =>
      prevFavorites.map(fav =>
        fav._id === favoriteId ? { ...fav, category: newCategory } : fav
      )
    );

    // Update localStorage
    const savedData = JSON.parse(localStorage.getItem(`favoritesData_${userId}`)) || {};
    savedData[favoriteId] = { ...savedData[favoriteId], category: newCategory };
    localStorage.setItem(`favoritesData_${userId}`, JSON.stringify(savedData));
  };

  const handleNoteChange = (favoriteId, note) => {
    setFavorites((prevFavorites) =>
      prevFavorites.map(fav =>
        fav._id === favoriteId ? { ...fav, note } : fav
      )
    );

    // Update localStorage
    const savedData = JSON.parse(localStorage.getItem(`favoritesData_${userId}`)) || {};
    savedData[favoriteId] = { ...savedData[favoriteId], note };
    localStorage.setItem(`favoritesData_${userId}`, JSON.stringify(savedData));
  };

  const sortedFavorites = [...favorites].sort((a, b) => {
    if (sortOrder === 'Title') return a.book.title.localeCompare(b.book.title);
    if (sortOrder === 'Author') return a.book.authors[0].localeCompare(b.book.authors[0]);
    return 0;
  });

  const filteredFavorites = sortedFavorites.filter(fav => categoryFilter === 'All' || fav.category === categoryFilter);

  if (loading) {
    return (
      <div>
        <Navbar />
        <p className="text-center text-lg">Loading favorites...</p>
      </div>
    );
  }

  return (
    <div>
      <Navbar />
      <div className="bg-gray-100 min-h-screen">
        <div className="mt-6 max-w-4xl mx-auto p-8 bg-white rounded-lg shadow-md">
          <h2 className="text-3xl font-semibold text-center mb-6">Your Favourite Books</h2>

          {/* Sort and Filter Options */}
          <div className="flex justify-between mb-4">
            <select
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value)}
              className="px-4 py-2 border rounded-lg"
            >
              <option value="Title">Sort by Title</option>
              <option value="Author">Sort by Author</option>
            </select>

            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="px-4 py-2 border rounded-lg"
            >
              {categories.map((category) => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
          </div>

          {filteredFavorites.length === 0 ? (
            <p className="text-center">No favorites found.</p>
          ) : (
            <div className="space-y-6">
              {filteredFavorites.map((favorite) => (
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

                    {/* Category Selector */}
                    <div className="mt-2">
                      <label className="mr-2">Category:</label>
                      <select
                        value={favorite.category || 'Want to Read'}
                        onChange={(e) => handleCategoryChange(favorite._id, e.target.value)}
                        className="px-2 py-1 border rounded"
                      >
                        {categories.slice(1).map((category) => (
                          <option key={category} value={category}>{category}</option>
                        ))}
                      </select>
                    </div>

                    {/* Notes Section */}
                    <textarea
                      className="w-full p-2 mt-2 border rounded"
                      placeholder="Add a note..."
                      value={favorite.note || ''}
                      onChange={(e) => handleNoteChange(favorite._id, e.target.value)}
                    />

                    {/* Remove Button */}
                    <button
                      onClick={() => handleDelete(favorite._id)}
                      className="mt-2 px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors"
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
    </div>
  );
};

export default FavoritesPage;
