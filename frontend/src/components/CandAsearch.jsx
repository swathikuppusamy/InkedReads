/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

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
  const navigate = useNavigate();
  const userId = localStorage.getItem('userId');

  const categories = [
    'Fiction',
    'Science',
    'Technology',
    'History',
    'Mystery',
    'Romance',
    'Fantasy',
    'Biography',
    'Self-Help',
  ];

  const authors = [
    'J.K. Rowling',
    'Stephen King',
    'Isaac Asimov',
    'Agatha Christie',
    'J.R.R. Tolkien',
    'George R.R. Martin',
    'Ernest Hemingway',
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    setCurrentPage(1);
    fetchBooks(query, 0);
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
    if (selectedCategory) {
      fetch(`https://www.googleapis.com/books/v1/volumes?q=subject:${selectedCategory}&startIndex=${(currentPage - 1) * booksPerPage}&maxResults=12&key=${apiKey}`)
        .then((response) => response.json())
        .then((data) => {
          if (data.items) {
            setBooks(data.items);
            setTotalBooks(Math.min(data.totalItems, 100));
            setError(null);
          } else {
            setBooks([]);
            setError('No books found for the selected category');
          }
        })
        .catch((error) => {
          setError('Error fetching books');
          console.error('Error fetching books:', error);
        });
    } else if (selectedAuthor) {
      fetch(`https://www.googleapis.com/books/v1/volumes?q=inauthor:${selectedAuthor}&startIndex=${(currentPage - 1) * booksPerPage}&maxResults=12&key=${apiKey}`)
        .then((response) => response.json())
        .then((data) => {
          if (data.items) {
            setBooks(data.items);
            setTotalBooks(Math.min(data.totalItems, 100));
            setError(null);
          } else {
            setBooks([]);
            setError('No books found for the selected author');
          }
        })
        .catch((error) => {
          setError('Error fetching books');
          console.error('Error fetching books:', error);
        });
    } else {
      setBooks([]);
    }
  }, [selectedCategory, selectedAuthor, currentPage]);

  const handlePageChange = (direction) => {
    if (direction === 'next' && currentPage < Math.ceil(totalBooks / booksPerPage)) {
      setCurrentPage((prevPage) => prevPage + 1);
    } else if (direction === 'prev' && currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  const handleAddToFavorites = (book) => {
    if (!userId) {
      alert("You need to log in to add to favorites.");
      navigate('/login'); // Redirect to login page
      return;
    }

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
    .then(response => {
      if (!response.ok) {
        throw new Error('Failed to add favorite');
      }
      return response.json();
    })
    .then(data => {
      console.log('Book added to favorites:', data);
      alert('Book added to favorites');
    })
    .catch(error => {
      console.error('Error adding book to favorites:', error);
      alert('Error adding to favorites');
    });
  };

  

  return (
    <div className="flex flex-col lg:flex-row max-w-7xl mx-auto p-4">
      <div className="flex-shrink-0 w-full lg:w-1/4 bg-gray-100 rounded-lg p-4 shadow-md">
        <h2 className="text-xl font-bold mb-4">Categories</h2>
        <ul className="space-y-2">
          {categories.map((category, index) => (
            <li key={index}>
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  checked={selectedCategory === category}
                  onChange={() => {
                    setSelectedCategory(category);
                    setSelectedAuthor('');
                    setCurrentPage(1);
                  }}
                  className="form-radio text-indigo-600 h-4 w-4"
                />
                <span className="ml-2">{category}</span>
              </label>
            </li>
          ))}
        </ul>

        <h2 className="text-xl font-bold mt-4 mb-2">Authors</h2>
        <ul className="space-y-2">
          {authors.map((author, index) => (
            <li key={index}>
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  checked={selectedAuthor === author}
                  onChange={() => {
                    setSelectedAuthor(author);
                    setSelectedCategory('');
                    setCurrentPage(1);
                  }}
                  className="form-radio text-indigo-600 h-4 w-4"
                />
                <span className="ml-2">{author}</span>
              </label>
            </li>
          ))}
        </ul>
      </div>

      <div className="flex-grow w-full lg:w-3/4 bg-white rounded-lg p-4 shadow-md mt-4 lg:mt-0">
        <h1 className="text-2xl font-bold mb-4">Book Search</h1>

        <form onSubmit={handleSubmit} className="flex mb-4">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Enter book title or author"
            className="flex-grow border border-gray-300 rounded-lg px-4 py-2 mr-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <button type="submit" className="bg-indigo-600 text-white rounded-lg px-4 py-2">
            Search
          </button>
        </form>

        {error && <p className="text-red-500">{error}</p>}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {books.length > 0 &&
            books.map((book, index) => {
              const { title, authors, publisher, publishedDate, imageLinks, webReaderLink } = book.volumeInfo;
              return (
                <div key={index} className="bg-gray-100 rounded-lg p-4 shadow-md">
                  {imageLinks && imageLinks.thumbnail && (
                    <img src={imageLinks.thumbnail} alt={`Cover of ${title}`} className="w-full h-40 object-cover rounded" />
                  )}

                  <h3 className="text-lg font-semibold mt-2">{title || 'No title'}</h3>
                  <p><strong>Authors:</strong> {authors ? authors.join(', ') : 'No authors'}</p>
                  <p><strong>Publisher:</strong> {publisher || 'No publisher'}</p>
                  <p><strong>Published Date:</strong> {publishedDate || 'No published date'}</p>
                  
                  {webReaderLink && (
                    <p>
                      <a href={webReaderLink} target="_blank" rel="noopener noreferrer" className="text-indigo-600 hover:underline">
                        Read Online
                      </a>
                    </p>
                  )}
                  
                  <button className="bg-red-500 text-white rounded-lg px-4 py-2 mt-2" onClick={() => handleAddToFavorites(book)}>
                    ❤️ Add to Favorites
                  </button>
                </div>
              );
            })}
        </div>

        {totalBooks > booksPerPage && (
          <div className="flex justify-between mt-4">
            <button
              onClick={() => handlePageChange('prev')}
              disabled={currentPage === 1}
              className={`px-4 py-2 rounded-lg ${currentPage === 1 ? 'bg-gray-300 cursor-not-allowed' : 'bg-indigo-600 text-white hover:bg-indigo-700'}`}
            >
              Previous
            </button>
            <button
              onClick={() => handlePageChange('next')}
              disabled={currentPage >= Math.ceil(totalBooks / booksPerPage)}
              className={`px-4 py-2 rounded-lg ${currentPage >= Math.ceil(totalBooks / booksPerPage) ? 'bg-gray-300 cursor-not-allowed' : 'bg-indigo-600 text-white hover:bg-indigo-700'}`}
            >
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default BooksSearch;
