/* eslint-disable no-unused-vars */
// import React, { useState, useEffect } from 'react';

// const AwardBooks = () => {
//   const [books, setBooks] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);
//   const [year, setYear] = useState('2023');

//   const fetchAwardedBooks = async (year) => {
//     const API_KEY = 'c4901fbbf6mshe559c7655f29ebdp1fc8e3jsn44bc2a28f0a1';

//     try {
//       setLoading(true);
//       const response = await fetch(`https://hapi-books.p.rapidapi.com/top/${year}`, {
//         method: 'GET',
//         headers: {
//           'x-rapidapi-key': API_KEY,
//           'x-rapidapi-host': 'hapi-books.p.rapidapi.com'
//         }
//       });

//       if (response.status === 429) {
//         setError('Rate limit exceeded. Please try again later.');
//         return;
//       }

//       if (!response.ok) {
//         throw new Error(`HTTP error! Status: ${response.status}`);
//       }

//       const data = await response.json();
//       setBooks(data || []);
//     } catch (error) {
//       setError(`An error occurred: ${error.message}`);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleSearch = () => {
//     if (year && year > 0) {
//       setError(null);
//       fetchAwardedBooks(year);
//     } else {
//       setError('Please enter a valid year.');
//     }
//   };

//   useEffect(() => {
//     fetchAwardedBooks(year);
//   }, [year]);

//   return (
//     <div className="bg-gray-900 text-gray-200 min-h-screen flex flex-col items-center justify-center p-6">
//       <div className="max-w-2xl w-full bg-white bg-opacity-10 backdrop-blur-md p-6 rounded-lg shadow-lg mb-8">
//         <h1 className="text-3xl font-bold text-center mb-4">Discover Award-Winning Books</h1>
//         <p className="text-center mb-6">Enter a year to explore the top books awarded in that year.</p>
//         <div className="flex mb-4">
//           <input
//             type="number"
//             id="year"
//             value={year}
//             onChange={(e) => setYear(e.target.value)}
//             placeholder="e.g. 2021"
//             className="border border-gray-600 rounded-l-md p-2 flex-1 bg-gray-800 text-gray-200"
//           />
//           <button
//             onClick={handleSearch}
//             className="bg-gray-600 text-white rounded-r-md px-4 py-2 hover:bg-gray-700 transition"
//           >
//             Search
//           </button>
//         </div>
//         <div className="mb-4">
//           {loading && <p className="text-center">Loading...</p>}
//           {error && <p className="text-center text-red-300">Error: {error}</p>}
//         </div>
//       </div>

//       <div className="w-full">
//         {!loading && !error && books.length > 0 && (
//           <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//             {books.map((book) => (
//               <li key={book.book_id} className="bg-white rounded-lg overflow-hidden shadow-md transform transition-all hover:scale-105">
//                 <a href={book.url} target="_blank" rel="noopener noreferrer" className="flex flex-col p-4">
//                   <img src={book.cover} alt={book.name} className="w-full h-48 object-cover mb-2 rounded-md" />
//                   <h3 className="text-lg font-semibold">{book.name}</h3>
//                   <p className="text-gray-700">{book.category ? book.category : 'Unknown Category'}</p>
//                 </a>
//               </li>
//             ))}
//           </ul>
//         )}

//         {!loading && !error && books.length === 0 && (
//           <p className="text-center text-gray-300">No books found for the year {year}.</p>
//         )}
//       </div>
//     </div>
//   );
// };

// export default AwardBooks;

import React, { useState } from 'react';
import Navbar from './Navbar.jsx';
const AwardBooks = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [year, setYear] = useState('2023');

  const fetchAwardedBooks = async (year) => {
    const API_KEY = '9b0c3f90a5msh08e7f4211d00f3dp1be3d9jsn76517c91b4ed';

    try {
      setLoading(true);
      const response = await fetch(`https://hapi-books.p.rapidapi.com/top/${year}`, {
        method: 'GET',
        headers: {
          'x-rapidapi-key': API_KEY,
          'x-rapidapi-host': 'hapi-books.p.rapidapi.com'
        }
      });

      if (response.status === 429) {
        setError('Rate limit exceeded. Please try again later.');
        return;
      }

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      setBooks(data || []);
    } catch (error) {
      setError(`An error occurred: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = () => {
    if (year && year > 0) {
      setError(null);
      fetchAwardedBooks(year);
    } else {
      setError('Please enter a valid year.');
    }
  };

  return (
    <><Navbar/>
    <div className="bg-gray-200 text-gray-800 min-h-screen flex flex-col items-center justify-center p-6">
      <div className="max-w-2xl w-full bg-white bg-opacity-10 backdrop-blur-md p-6 rounded-lg shadow-lg mb-8">
        <h1 className="text-3xl font-bold text-center mb-4">Discover Award-Winning Books</h1>
        <p className="text-center mb-6">Enter a year to explore the top books awarded in that year.</p>
        <div className="flex mb-4">
          <input
            type="number"
            id="year"
            value={year}
            onChange={(e) => setYear(e.target.value)}
            placeholder="e.g. 2021"
            className="border border-gray-600 rounded-l-md p-2 flex-1 bg-gray-800 text-gray-200"
          />
          <button
            onClick={handleSearch}
            className="bg-blue-600 text-white rounded-r-md px-6 py-2  hover:bg-blue-800 transition"
          >
            Search
          </button>
        </div>
        <div className="mb-4">
          {loading && <p className="text-center">Loading...</p>}
          {error && <p className="text-center text-red-300">Error: {error}</p>}
        </div>
      </div>

      <div className="w-full">
        {!loading && !error && books.length > 0 && (
          <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {books.map((book) => (
              <li key={book.book_id} className="bg-white rounded-lg overflow-hidden shadow-md transform transition-all hover:scale-105">
                <a href={book.url} target="_blank" rel="noopener noreferrer" className="flex flex-col p-4">
                  <img src={book.cover} alt={book.name} className="w-full h-48 object-cover mb-2 rounded-md" />
                  <h3 className="text-lg font-semibold">{book.name}</h3>
                  <p className="text-gray-700">{book.category ? book.category : 'Unknown Category'}</p>
                </a>
              </li>
            ))}
          </ul>
        )}

        {!loading && !error && books.length === 0 && (
          <p className="text-center text-gray-600">No books found for the year {year}.</p>
        )}
      </div>
    </div>
    </>
  );
};

export default AwardBooks;
