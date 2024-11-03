// index.js
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import { UserRouter } from "./routes/user.js";
import favoriteRouter from "./routes/favourite.js";
import feedbackRouter from "./routes/feedback.js";
import userprofileRouter from "./routes/userprofile.js";
import cookieParser from "cookie-parser";
import multer from "multer";
import https from "https";

dotenv.config();

// Validate required environment variables
if (!process.env.MONGO_URL) {
    console.error("MONGO_URL is not defined in the environment variables.");
    process.exit(1);
}

// Create Express app
const app = express();

// Access environment variables
const PORT = process.env.PORT || 5057;
const MONGO_URI = process.env.MONGO_URL;

// Middleware
const allowedOrigins = [
    "https://ink-z331.onrender.com",
    ...Array.from({ length: 65535 }, (_, i) => `http://localhost:${i + 1}`)
];

const corsOption = {
    origin: (origin, callback) => {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error("Not allowed by CORS"));
        }
    },
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
};

app.use(cors(corsOption));
app.use(express.json({ limit: "10mb" })); // Increase payload limit to 10MB
app.use(express.urlencoded({ limit: "10mb", extended: true })); // For URL-encoded data
app.use(cookieParser());

// Set up multer for file uploads with limits
const upload = multer({
    dest: "uploads/", // Directory for storing uploaded files
    limits: {
        fileSize: 5 * 1024 * 1024, // Limit files to 5MB
    },
});

// Connect to MongoDB
mongoose.connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log("Connected to MongoDB"))
.catch(error => console.error("MongoDB connection error:", error));

// Routes
app.use("/auth", UserRouter);
app.use("/api/favorites", favoriteRouter);
app.use("/api/feedback", feedbackRouter);
app.use("/api/profile-settings", userprofileRouter);

// Handle 404 errors for undefined routes
app.use((req, res) => {
    res.status(404).send("Route not found");
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send("Something broke!");
});

// Endpoint to fetch book content
app.get("/fetch-book", (req, res) => {
    const bookUrl = req.query.url;

    console.log("Received request for URL:", bookUrl);

    if (!bookUrl) {
        return res.status(400).send("Book URL is required.");
    }

    // Use https.get to fetch book content with timeout
    const request = https.get(bookUrl, (response) => {
        let data = "";

        response.on("data", (chunk) => {
            data += chunk;
        });

        response.on("end", () => {
            if (response.statusCode === 200) {
                res.send(data);
            } else {
                res.status(response.statusCode).send("Failed to fetch book content.");
            }
        });
    });

    // Handle request errors
    request.on("error", (error) => {
        console.error("Error fetching book content:", error.message);
        res.status(500).send("Error fetching book content.");
    });

    // Set timeout for the request
    request.setTimeout(10000, () => {
        request.abort();
        res.status(500).send("Request timed out.");
    });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});