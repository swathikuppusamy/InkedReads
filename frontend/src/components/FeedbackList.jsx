import React, { useState, useEffect } from 'react';
import Navbar from './Navbar.jsx';

const FeedbackList = () => {
    const [feedbacks, setFeedbacks] = useState([]);
    const [filteredFeedbacks, setFilteredFeedbacks] = useState([]);
    const [ratingFilter, setRatingFilter] = useState('All');

    useEffect(() => {
        const fetchFeedbacks = async () => {
            try {
                const response = await fetch('http://localhost:5057/api/feedback');
                if (response.ok) {
                    const data = await response.json();
                    setFeedbacks(data);
                    setFilteredFeedbacks(data);
                } else {
                    console.error('Failed to fetch feedback');
                }
            } catch (err) {
                console.error('Error fetching feedback:', err);
            }
        };

        fetchFeedbacks();
    }, []);

    useEffect(() => {
        if (ratingFilter === 'All') {
            setFilteredFeedbacks(feedbacks);
        } else {
            const filtered = feedbacks.filter(feedback => feedback.rating === parseInt(ratingFilter));
            setFilteredFeedbacks(filtered);
        }
    }, [ratingFilter, feedbacks]);

    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(dateString).toLocaleDateString(undefined, options);
    };

    return (
        <div className="bg-gray-200 min-h-screen text-gray-800">
            <Navbar />
            <div className="max-w-4xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
                <h2 className="mt-10 text-3xl font-bold text-center mb-6">Feedback List</h2>

                {/* Rating Filter Dropdown */}
                <div className="mb-8 flex justify-center">
                    <label htmlFor="rating-filter" className="mr-8  font-semibold">Filter by Rating:</label>
                    <select
                        id="rating-filter"
                        value={ratingFilter}
                        onChange={(e) => setRatingFilter(e.target.value)}
                        className="px-4 py-1 bg-gray-800 text-white border border-gray-600 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-500"
                    >
                        <option value="All">All</option>
                        <option value="5">5</option>
                        <option value="4">4</option>
                        <option value="3">3</option>
                        <option value="2">2</option>
                        <option value="1">1</option>
                    </select>
                </div>

                {/* Feedback List */}
                {filteredFeedbacks.length > 0 ? (
                    filteredFeedbacks.map(feedback => (
                        <div key={feedback._id} className="bg-gray-800 p-6 rounded-lg shadow-lg mb-4">
                            <h4 className="text-xl font-semibold mb-2">{feedback.bookTitle} by {feedback.author}</h4>
                            <p className="text-yellow-400 font-semibold">Rating: {feedback.rating}</p>
                            <p className="text-gray-300 mt-2">{feedback.comments}</p>
                            <p className="text-sm text-gray-500 mt-4">Submitted on: {formatDate(feedback.reviewDate)}</p>
                        </div>
                    ))
                ) : (
                    <p className="text-center text-gray-500">No feedbacks available for the selected rating.</p>
                )}
            </div>
        </div>
    );
};

export default FeedbackList;
