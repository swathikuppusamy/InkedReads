// routes/userprofile.js
import express from 'express';
import Userprofile from '../models/Userprofile.js'; // Corrected to match the file name

const router = express.Router();

// Create or update user profile
router.post('/', async (req, res) => {
    const { userId, name, email, photo, bio, favoriteBooks, favoriteGenres, favoriteAuthors, themes, followers, following } = req.body;

    try {
        // Use findOneAndUpdate to either update the existing user or create a new one
        const user = await Userprofile.findOneAndUpdate(
            { userId },
            { 
                name, 
                email, 
                photo, 
                bio, // Update bio
                favoriteBooks, 
                favoriteGenres, 
                favoriteAuthors, 
                themes,
                followers: followers || 0, // Use provided followers count or default to 0
                following: following || 0, // Use provided following count or default to 0
            },
            { new: true, upsert: true } // upsert: true means create if not found
        );
        res.status(200).json(user); // Respond with the updated or created user
    } catch (error) {
        res.status(500).json({ message: error.message }); // Handle any errors
    }
});

// Fetch user profile by userId
router.get('/:userId', async (req, res) => {
    const { userId } = req.params; // Get userId from request parameters

    try {
        const user = await Userprofile.findOne({ userId }); // Corrected model name in findOne query
        if (!user) {
            return res.status(404).json({ message: 'User not found' }); // If no user found
        }
        res.status(200).json(user); // Respond with user data
    } catch (error) {
        res.status(500).json({ message: error.message }); // Handle any errors
    }
});

export default router;
