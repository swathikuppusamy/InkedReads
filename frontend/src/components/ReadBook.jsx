import React, { useState } from 'react';



function Readbooks() {
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
    <div className="min-h-screen bg-gray-100 flex flex-col">
    
      <div className="flex flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-gray-800 mb-6">Search for Books to Read</h1>
        <form className="flex w-full max-w-md" onSubmit={handleSearch}>
          <input 
            type="text" 
            value={query} 
            onChange={(e) => setQuery(e.target.value)} 
            placeholder="Enter book title or author" 
            required 
            className="border border-gray-300 rounded-l-md p-2 flex-1 focus:outline-none focus:ring focus:ring-blue-500"
          />
          <button type="submit" className="bg-blue-600 text-white rounded-r-md px-4 hover:bg-blue-700 transition">Search</button>
        </form>

        {bookDetails && (
          <div className="bg-white shadow-md rounded-lg mt-6 p-6 w-full max-w-lg">
            <h2 className="text-2xl font-semibold text-gray-800">{bookDetails.title}</h2>
            <p className="text-gray-600">Author(s): {bookDetails.authors}</p>
            <p className="text-gray-700 mt-2">{bookDetails.description}</p>
            {bookDetails.txtUrl && (
              <div className="mt-4">
                <button onClick={handleOpenModal} className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition">Read Online</button>
              </div>
            )}
          </div>
        )}

        {showModal && bookDetails && bookDetails.txtUrl && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white rounded-lg shadow-lg p-4 w-full max-w-3xl">
              <button onClick={handleCloseModal} className="absolute top-2 right-2 text-gray-500 hover:text-gray-700">Close</button>
              <iframe 
                src={bookDetails.txtUrl} 
                title="Book Reader" 
                className="w-full h-96" 
                frameBorder="0"
              />
            </div>
          </div>
        )}

        {message && <div className="text-red-500 mt-4">{message}</div>}
      </div>
    </div>
  );
}

export default Readbooks;
