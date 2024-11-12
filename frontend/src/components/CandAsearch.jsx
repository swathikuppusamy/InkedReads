import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from './Navbar.jsx';

const BooksSearch = () => {
  const [query, setQuery] = useState('');
  const [books, setBooks] = useState([]);
  const [error, setError] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedAuthor, setSelectedAuthor] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalBooks, setTotalBooks] = useState(0);
  const booksPerPage = 12;
  const apiKey = 'AIzaSyB1ZDjfU1JjNa8SE57ojxvCfQiHrBbCPy4';

  const userId = localStorage.getItem('userId');

  const categories = [
    'Fiction', 'Science', 'Technology', 'History', 'Mystery', 'Romance', 'Fantasy', 'Biography', 'Self-Help'
  ];

  const authors = [
    'J.K. Rowling', 'Stephen King', 'Isaac Asimov', 'Agatha Christie', 'J.R.R. Tolkien', 'George R.R. Martin', 'Ernest Hemingway'
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    setCurrentPage(1);
    fetchBooks(query, 0);
  };

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
  const handleWhatsAppShare = (book) => {
    const title = book.volumeInfo.title || "Unknown title";
    const authors = book.volumeInfo.authors ? book.volumeInfo.authors.join(', ') : "Unknown author";
    const link = book.volumeInfo.webReaderLink || "https://books.google.com/";
  
    const message = `Check out this book: ${title} by ${authors}. Find out more here: ${link}`;
    const url = `https://wa.me/?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  };
  

  const fetchBooks = (query, startIndex) => {
    fetch(`https://www.googleapis.com/books/v1/volumes?q=${query}&startIndex=${startIndex}&maxResults=${booksPerPage}&key=${apiKey}`)
      .then((response) => response.json())
      .then((data) => {
        if (data.items) {
          setBooks(data.items);
          setTotalBooks(Math.min(data.totalItems, 100));
          setError(null);
        } else {
          setBooks([]);
          setError('No books found');
        }
      })
      .catch((error) => {
        setError('Error fetching books');
        console.error('Error fetching books:', error);
      });
  };

  useEffect(() => {
    if (selectedCategory || selectedAuthor) {
      const query = selectedCategory ? `subject:${selectedCategory}` : `inauthor:${selectedAuthor}`;
      fetchBooks(query, (currentPage - 1) * booksPerPage);
    } else {
      setBooks([]);
    }
  }, [selectedCategory, selectedAuthor, currentPage]);

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <div className="flex text-center">
        <div className="w-1/4 p-4 bg-white shadow-md">
          {/* Categories and Authors Filter */}
          <h2 className="text-lg font-semibold mb-4">Categories</h2>
          <ul className="space-y-2">
            {categories.map((category, index) => (
              <li key={index} className="text-gray-700">
                <label className="flex items-center space-x-2">
                  <input
                    type="radio"
                    checked={selectedCategory === category}
                    onChange={() => {
                      setSelectedCategory(category);
                      setSelectedAuthor('');
                      setCurrentPage(1);
                    }}
                    className="text-indigo-600"
                  />
                  <span>{category}</span>
                </label>
              </li>
            ))}
          </ul>

          <h2 className="text-lg font-semibold mt-6 mb-4">Authors</h2>
          <ul className="space-y-2">
            {authors.map((author, index) => (
              <li key={index} className="text-gray-700">
                <label className="flex items-center space-x-2">
                  <input
                    type="radio"
                    checked={selectedAuthor === author}
                    onChange={() => {
                      setSelectedAuthor(author);
                      setSelectedCategory('');
                      setCurrentPage(1);
                    }}
                    className="text-indigo-600"
                  />
                  <span>{author}</span>
                </label>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex-1 p-8">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">Book Search</h1>
          <form onSubmit={handleSubmit} className="flex items-center mb-6">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Enter book title or author"
              className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <button type="submit" className="ml-4 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700">
              Search
            </button>
          </form>

          {error && <p className="text-red-500">{error}</p>}

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {books.length > 0 &&
              books.map((book, index) => {
                const { title, authors, publisher, publishedDate, imageLinks, webReaderLink } = book.volumeInfo;
                return (
                  <Link to={`/book/${book.id}`} key={index} className="p-4 bg-white shadow-md rounded-lg">
                    {imageLinks && imageLinks.thumbnail && (
                      <img src={imageLinks.thumbnail} alt={`Cover of ${title}`} className="w-full h-48 object-cover rounded-md" />
                    )}

                    <h3 className="text-lg font-semibold mt-4">{title || 'No title'}</h3>
                    <p className="text-gray-600 mt-1"><strong>Authors:</strong> {authors ? authors.join(', ') : 'No authors'}</p>
                    <p className="text-gray-600"><strong>Publisher:</strong> {publisher || 'No publisher'}</p>
                    <p className="text-gray-600"><strong>Published Date:</strong> {publishedDate || 'No published date'}</p>

                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        handleAddToFavorites(book);
                      }}
                      className="mt-4 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
                    >
                      ❤️ Add to Favorites
                    </button>

                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        handleWhatsAppShare(book);
                      }}
                      className="mt-4 px-2 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
                    >
                      📲 Share on WhatsApp
                    </button>
                  </Link>
                );
              })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BooksSearch;
