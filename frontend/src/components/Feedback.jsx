import React, { useState } from 'react';
import axios from '../utils/axiosConfig.js';
import Navbar from './Navbar.jsx';

const FeedbackForm = () => {
    const [formData, setFormData] = useState({
        bookTitle: '',
        author: '',
        rating: 1,
        comments: '',
        reviewDate: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevData => ({ ...prevData, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const currentDate = new Date().toISOString();
        const updatedFormData = { ...formData, reviewDate: currentDate };

        try {
            const response = await axios.post('api/feedback', updatedFormData);

            if (response.status === 200 || response.status === 201) {
                alert('Feedback submitted successfully!');
                setFormData({ bookTitle: '', author: '', rating: 1, comments: '', reviewDate: '' });
            } else {
                alert('Error submitting feedback');
            }
        } catch (err) {
            console.error(err);
            alert('Error submitting feedback');
        }
    };

    return (
        <div>
            <Navbar />
            <div className="bg-gray-800 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
                <div className="max-w-md w-full bg-gray-800 p-2 rounded-lg shadow-md">
                    <h2 className="text-center text-4xl font-md text-white mb-6">Submit Feedback</h2>
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-200">Book Title:</label>
                            <input
                                type="text"
                                name="bookTitle"
                                value={formData.bookTitle}
                                onChange={handleChange}
                                required
                                className="mt-1 px-3 py-2 bg-gray-900 text-white border border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 w-full"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-200">Author:</label>
                            <input
                                type="text"
                                name="author"
                                value={formData.author}
                                onChange={handleChange}
                                required
                                className="mt-1 px-3 py-2 bg-gray-900 text-white border border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 w-full"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-200">Rating:</label>
                            <select
                                name="rating"
                                value={formData.rating}
                                onChange={handleChange}
                                className="mt-1 px-3 py-2 bg-gray-900 text-white border border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 w-full"
                            >
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                                <option value="4">4</option>
                                <option value="5">5</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-200">Comments:</label>
                            <textarea
                                name="comments"
                                value={formData.comments}
                                onChange={handleChange}
                                required
                                className="mt-1 px-3 py-2 bg-gray-900 text-white border border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 w-full h-24 resize-none"
                            ></textarea>
                        </div>
                        <div>
                            <button
                                type="submit"
                                className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition"
                            >
                                Submit
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default FeedbackForm;
