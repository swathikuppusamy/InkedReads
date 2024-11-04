import React, { useState } from 'react';
import Navbar from './Navbar.jsx';

function App() {
  const [query, setQuery] = useState('');
  const [bookDetails, setBookDetails] = useState(null);
  const [message, setMessage] = useState('');
  const [showModal, setShowModal] = useState(false); // Modal visibility state

  const handleSearch = (event) => {
    event.preventDefault();
    setMessage('');
    setBookDetails(null);
    setShowModal(false); // Hide modal on new search

    // Fetch data from Gutendex API
    fetch(`https://gutendex.com/books?search=${encodeURIComponent(query)}`)
      .then(response => response.json())
      .then(data => {
        if (data.results.length > 0) {
          const book = data.results[0];
          const title = book.title;
          const authors = book.authors.map(author => author.name).join(', ');
          const description = (book.translations && book.translations.length > 0) 
            ? book.translations[0].description 
            : 'No description available.';
          const txtUrl = book.formats['text/plain; charset=us-ascii'];

          setBookDetails({
            title,
            authors,
            description,
            txtUrl
          });
        } else {
          setMessage('No books found for the search query.');
        }
      })
      .catch(error => {
        console.error('Error fetching book data:', error);
        setMessage('Error fetching book data. Please try again later.');
      });
  };

  const handleOpenModal = () => {
    setShowModal(true); // Open modal
  };

  const handleCloseModal = () => {
    setShowModal(false); // Close modal
  };

  return (
    <div className="bg-gray-100  min-h-screen">
      <Navbar />
      <div className="max-w-2xl mx-auto py-10 px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-800 text-center mb-8">Search for Books to Read</h1>
        <form className="flex items-center mb-6" onSubmit={handleSearch}>
          <input 
            type="text" 
            value={query} 
            onChange={(e) => setQuery(e.target.value)} 
            placeholder="Enter book title or author" 
            required 
            className="flex-1 px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 shadow-sm"
          />
          <button 
            type="submit" 
            className="ml-4 px-6 py-2 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 shadow-lg transition"
          >
            Search
          </button>
        </form>

        {bookDetails && (
          <div className="bg-white rounded-lg shadow-md p-6 mt-4">
            <h2 className="text-2xl font-semibold text-gray-800 mb-2">{bookDetails.title}</h2>
            <p className="text-gray-700 mb-4">Author(s): {bookDetails.authors}</p>
            <p className="text-gray-600 mb-4">{bookDetails.description}</p>
            {bookDetails.txtUrl && (
              <button 
                onClick={handleOpenModal} 
                className="px-4 py-2 bg-blue-600 text-white rounded-md font-medium hover:bg-blue-700 transition duration-300"
              >
                Read Online
              </button>
            )}
          </div>
        )}

        {showModal && bookDetails && bookDetails.txtUrl && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-lg p-6 max-w-3xl w-full relative">
              <button 
                onClick={handleCloseModal} 
                className="absolute top-4 right-4 text-gray-500 hover:text-gray-800"
              >
                Close
              </button>
              <iframe 
                src={bookDetails.txtUrl} 
                title="Book Reader" 
                className="w-full h-[500px] border-none rounded-lg"
                frameBorder="0"
              />
            </div>
          </div>
        )}

        {message && (
          <div className="mt-6 text-center text-red-500 font-semibold">
            {message}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
