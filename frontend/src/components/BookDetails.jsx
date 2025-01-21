// BookDetails.jsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from '../utils/axiosConfig.js';
import coverImg from '../assets/img-1.jpg';
import { FaArrowLeft } from 'react-icons/fa';

const GOOGLE_BOOKS_API_URL = "https://www.googleapis.com/books/v1/volumes/";

const BookDetails = () => {
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBookDetails = async () => {
      try {
        const response = await axios.get(`${GOOGLE_BOOKS_API_URL}${id}`); // Use Axios for the API request
        const data = response.data;

        if (data) {
          const volumeInfo = data.volumeInfo;
          const newBook = {
            title: volumeInfo.title || "Title not available",
            author: volumeInfo.authors ? volumeInfo.authors.join(", ") : "Unknown Author",
            cover_img: volumeInfo.imageLinks ? volumeInfo.imageLinks.thumbnail : coverImg,
            description: volumeInfo.description || "No description available",
          };
          setBook(newBook);
        } else {
          setError(true);
        }
      } catch (err) {
        console.error("Failed to fetch book details:", err);
        setError(true);
      }
    };

    fetchBookDetails();
  }, [id]);

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-red-600 text-lg">An error occurred. Could not fetch book details.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-4">
      <button onClick={() => navigate(-1)} className="text-blue-600 hover:underline flex items-center mb-6">
        <FaArrowLeft className="mr-2" />
        Back to Search
      </button>
      {book ? (
        <div className="max-w-3xl mx-auto p-8 bg-white shadow-lg rounded-lg">
          <h2 className="text-3xl font-bold mb-4">{book.title}</h2>
          <p className="text-gray-700 mb-2"><strong>Author:</strong> {book.author}</p>
          <img src={book.cover_img} alt={`Cover of ${book.title}`} className="w-full h-64 object-cover rounded-md mb-4" />
          <p className="text-gray-800 leading-relaxed">{book.description}</p>
        </div>
      ) : (
        <p className="text-gray-700">Loading book details...</p>
      )}
    </div>
  );
};

export default BookDetails;
