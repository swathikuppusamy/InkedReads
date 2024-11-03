// //index.js
// import express from "express"
// import cors from 'cors'
// import dotenv from 'dotenv'
// import mongoose from "mongoose"
// import { UserRouter } from "./routes/user.js"
// import cookieParser from 'cookie-parser'
// dotenv.config()

// const app =express()
// app.use(express.json())
// app.use(cors({
//     origin:["http://localhost:5173"],
//     credentials:true
// }))
// app.use(cookieParser())
// app.use('/auth',UserRouter)
// mongoose.connect(process.env.MONGO_URL)

// app.listen(process.env.PORT,()=>{
//     console.log(`Server running on port ${process.env.PORT}`)
// })

// index.js
import express from "express";
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from "mongoose";
import { UserRouter } from "./routes/user.js";
import favoriteRouter from './routes/favourite.js';
import feedbackRouter from './routes/feedback.js';
import userprofileRouter from './routes/userprofile.js';
import cookieParser from 'cookie-parser';

dotenv.config();

const app = express();

// Middleware setup
app.use(express.json());
app.use(cors({
    origin: ["http://localhost:5173"],
    credentials: true
}));
app.use(cookieParser());

// Database connection
mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log("Connected to MongoDB"))
.catch((error) => console.error("MongoDB connection error:", error));

// Routes
app.use('/auth', UserRouter);
app.use('/favorites', favoriteRouter);
app.use('/feedback', feedbackRouter);
app.use('/profile-settings', userprofileRouter);

// Start server
app.listen(process.env.PORT, () => {
    console.log(`Server running on port ${process.env.PORT}`);
});

