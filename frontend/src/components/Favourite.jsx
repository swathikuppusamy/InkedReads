import React, { useState, useEffect } from 'react';


const FavPage = () => {
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
    return <p>Loading favorites...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div>
  
    <div className="fav-page">
      <h2>Your Favorite Books</h2>
      {favorites.length === 0 ? (
        <p>No favorites found.</p>
      ) : (
        <div className="fav-book-list">
          {favorites.map((favorite) => (
            <div key={favorite._id} className="fav-book-item">
              <img src={favorite.book.thumbnail} alt={favorite.book.title} className="book-image" />
              <div className="book-details">
                <h3>{favorite.book.title}</h3>
                <p><strong>Author:</strong> {favorite.book.authors.join(', ')}</p>
                <p><strong>Published:</strong> {favorite.book.publishedDate}</p>
                <button className="fav-delete-button" onClick={() => handleDelete(favorite._id)}>
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

export default FavPage;