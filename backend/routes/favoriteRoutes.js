// routes/favorites.js
import express from 'express';
import Favorite from '../models/favoriteBook.js';

const router = express.Router();

// POST a favorite book
router.post('/', async (req, res) => {
  const { userId, book } = req.body;

  try {
    const newFavorite = new Favorite({ userId, book });
    await newFavorite.save();
    res.status(201).json(newFavorite);
  } catch (error) {
    res.status(500).json({ message: 'Error saving favorite book', error });
  }
});

// GET favorites for a specific user
router.get('/:userId', async (req, res) => {
  const { userId } = req.params;

  try {
    const favorites = await Favorite.find({ userId });
    if (favorites.length === 0) {
      return res.status(404).json({ message: 'No favorites found for this user' });
    }
    res.status(200).json(favorites);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching favorite books', error });
  }
});

router.delete('/:id', async (req, res) => {
    const { id } = req.params;
  
    try {
      const deletedFavorite = await Favorite.findByIdAndDelete(id);
      if (!deletedFavorite) {
        return res.status(404).json({ message: 'Favorite not found' });
      }
      res.status(200).json({ message: 'Favorite deleted successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Error deleting favorite book', error });
    }
  });

export default router;
