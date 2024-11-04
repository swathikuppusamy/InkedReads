// models/Favorite.js
import mongoose from 'mongoose';

const favoriteSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  book: {
    id: { type: String, required: true },
    title: { type: String, required: true },
    authors: { type: [String], default: [] },
    publisher: { type: String, default: 'Unknown' },
    publishedDate: { type: String, default: 'Unknown' },
    thumbnail: { type: String, default: '' },
    webReaderLink: { type: String, default: '' }
  }
});

const Favorite = mongoose.model('Favorite', favoriteSchema);

export default Favorite;
