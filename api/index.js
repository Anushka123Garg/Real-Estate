import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRouter from './routes/user.route.js';
import authRouter from './routes/auth.route.js';
import listingRouter from './routes/listing.route.js';
import cookieParser from 'cookie-parser';
import path from 'path';
import Listing from './models/listing.model.js';
// import cors from 'cors';

dotenv.config();

mongoose.connect(process.env.MONGO).then(async () => {
    console.log("Connected to MongoDB!");

    const result = await Listing.updateMany(
        { balcony: { $exists: false } },
        { $set: { balcony: false } }
    );
    console.log(`Updated ${result.modifiedCount} listings to include 'balcony' field.`);

}).catch((err) => {
    console.log(err);
});

const __dirname = path.resolve();

const app = express();

// Configure CORS - place this BEFORE routes
// app.use(cors({
//     // Allow requests from your client origin
//     origin: '*',
//     credentials: true // Allow cookies to be sent
// }));

// Handle preflight requests
// app.options('*', cors());

app.use(express.json());  // Allow JSON as input to server
app.use(cookieParser());  // For getting info from cookie

// API routes
app.use("/api/user", userRouter);
app.use("/api/auth", authRouter);
app.use("/api/listing", listingRouter);

// Serve static files from the React app
app.use(express.static(path.join(__dirname, '/client/dist')));

// For any other request, send the React app
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'client', 'dist', 'index.html'));
});

// Error handling middleware
app.use((err, req, res, next) => {

    const allowedOrigins = ['https://real-estate-xbh8.onrender.com', 'https://real-estate-1-d1r6.onrender.com']
    const origin = req.headers.origin;
    if (allowedOrigins.includes(origin)) {
        res.setHeader('Access-Control-Allow-Origin', origin);
    } else {
        res.setHeader('Access-Control-Allow-Origin', '*');
    }
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    res.header("Access-Control-Allow-credentials", true);
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, UPDATE");
    next();

    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal Server Error';
    return res.status(statusCode).json({
        success: false,
        statusCode,
        message,
    });
});

// Start the server
app.listen(3000, () => {
    console.log('Server is running on port 3000!!!');
});