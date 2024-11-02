//models/Userprofile.js
import mongoose from 'mongoose';


const userSchema = new mongoose.Schema({
    userId: { type: String, unique: true, required: true }, // Unique identifier for each user
    name: { type: String, required: true },
    email: { type: String, required: true },
    photo: { type: String },
    bio: { type: String }, // Add bio field
    favoriteBooks: { type: [String] },
    favoriteGenres: { type: [String] },
    favoriteAuthors: { type: [String] },
    themes: { type: [String] },
    followers: { type: Number, default: 0 }, // Add followers count with default value
    following: { type: Number, default: 0 }, // Add following count with default value
});

const Userprofile = mongoose.model('User1', userSchema);

export default Userprofile;
