import React, { useState } from 'react';

const FeedbackForm = () => {
    const [formData, setFormData] = useState({
        bookTitle: '',
        author: '',
        rating: 1,
        comments: '',
        reviewDate: ''  // Add reviewDate field
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevData => ({ ...prevData, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Capture the current date when submitting feedback
        const currentDate = new Date().toISOString();  // Capture in ISO format
        const updatedFormData = { ...formData, reviewDate: currentDate };

        try {
            const response = await fetch('http://localhost:5057/api/feedback', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updatedFormData)  // Send the updated form data with reviewDate
            });

            if (response.ok) {
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
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="bg-white rounded-lg shadow-md p-6 w-96">
                <h2 className="text-2xl font-semibold mb-4">Submit Feedback</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">Book Title:</label>
                        <input
                            type="text"
                            name="bookTitle"
                            value={formData.bookTitle}
                            onChange={handleChange}
                            required
                            className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">Author:</label>
                        <input
                            type="text"
                            name="author"
                            value={formData.author}
                            onChange={handleChange}
                            required
                            className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">Rating:</label>
                        <select
                            name="rating"
                            value={formData.rating}
                            onChange={handleChange}
                            className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        >
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                        </select>
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">Comments:</label>
                        <textarea
                            name="comments"
                            value={formData.comments}
                            onChange={handleChange}
                            required
                            className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            rows="4"
                        ></textarea>
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-indigo-600 text-white font-semibold py-2 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    >
                        Submit
                    </button>
                </form>
            </div>
        </div>
    );
};

export default FeedbackForm;
