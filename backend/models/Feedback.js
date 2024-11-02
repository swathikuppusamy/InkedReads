//models/Feedback.js
import mongoose from 'mongoose';

const feedbackSchema = new mongoose.Schema({
    bookTitle: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    rating: {
        type: Number,
        required: true,
        min: 1,
        max: 5
    },
    comments: {
        type: String,
        required: true
    },
    reviewDate: {  // Renamed to reviewDate
        type: Date,
        default: Date.now // If no reviewDate is provided, use current date
    }
});

const Feedback = mongoose.model('Feedback', feedbackSchema);

export default Feedback;
