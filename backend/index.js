import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import router from './routes/user.js';
import https from 'https';
import feedbackRoutes from './routes/Feedback_routes.js';
import userRoutes from './routes/userprofile.js';
import favoriteRoutes from './routes/favoriteRoutes.js';
import multer from 'multer'; // Import multer for file uploads

// Load environment variables from .env file
dotenv.config();

// Validate required environment variables
if (!process.env.MONGODB_URL) {
    console.error('MONGODB_URL is not defined in the environment variables.');
    process.exit(1); // Exit the application if the variable is missing
}

// Create Express app
const app = express();

// Access environment variables
const PORT = process.env.PORT || 5057;
const MONGO_URI = process.env.MONGODB_URL;

// Middleware
const allowedOrigins = [
    'https://ink-z331.onrender.com',
  ...Array.from({length: 65535}, (_, i)=>`http://localhost:${i+1}`)
]

const corsOption = {
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    }
    else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ['GET','POST','PUT','DELETE'],
  credentials: true,
}
app.use(cors());
// Set up multer for file uploads with limits
const upload = multer({
    dest: 'uploads/', // Directory for storing uploaded files
    limits: {
        fileSize: 5 * 1024 * 1024, // Limit files to 5MB
    },
});

// Parse JSON bodies with a limit (set to 10MB)
app.use(express.json({ limit: '10mb' })); // Increase the limit as needed
app.use(express.urlencoded({ limit: '10mb', extended: true })); // For URL-encoded data

// Connect to MongoDB Atlas
mongoose.connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log('Connected to MongoDB Atlas'))
.catch(err => console.error('Error connecting to MongoDB Atlas:', err));

// Use authentication routes
app.use('/api/auth', router); 
app.use('/api/feedback', feedbackRoutes);
app.use('/api/profile', userRoutes);
app.use('/favorites', favoriteRoutes);


// Handle 404 errors for undefined routes
app.use((req, res, next) => {
    res.status(404).send('Route not found');
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

// Endpoint to fetch book content
app.get('/fetch-book', (req, res) => {
    const bookUrl = req.query.url;

    console.log('Received request for URL:', bookUrl); // Log the requested URL

    if (!bookUrl) {
        return res.status(400).send('Book URL is required.');
    }

    // Use https.get to fetch book content with timeout
    const request = https.get(bookUrl, (response) => {
        let data = '';

        response.on('data', (chunk) => {
            data += chunk;
        });

        response.on('end', () => {
            if (response.statusCode === 200) {
                res.send(data); // Send the book content
            } else {
                res.status(response.statusCode).send('Failed to fetch book content.');
            }
        });

    });

    // Handle request errors
    request.on('error', (error) => {
        console.error('Error fetching book content:', error.message);
        res.status(500).send('Error fetching book content.');
    });

    // Set timeout for the request
    request.setTimeout(10000, () => { // 10 seconds timeout
        request.abort();
        res.status(500).send('Request timed out.');
    });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
