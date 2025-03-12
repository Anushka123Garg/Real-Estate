import express from 'express'
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRouter from './routes/user.route.js';
import authRouter from './routes/auth.route.js';
import listingRouter from './routes/listing.route.js';
import cookieParser from 'cookie-parser';
import path from 'path';
import Listing from './models/listing.model.js';


dotenv.config();

mongoose.connect(process.env.MONGO).then(async () => {
    console.log("Connected to MongoDB!");

    const result = await Listing.updateMany(
        { balcony: { $exists: false } }, 
        { $set: { balcony: false } } 
    );
    console.log(`Updated ${result.modifiedCount} listings to include 'balcony' field.`);

    }).catch ((err) => {
        console.log(err);
    });

    const __dirname = path.resolve();

const app = express();

app.use(express.json());  //allow the JSON as input to server, otherwise undefined will come

app.use(cookieParser());  //for getting info from cookie

app.listen(3000, () => {
    console.log('Server is running on port 3000!!!');
}
);

app.use("/api/user", userRouter);
app.use("/api/auth", authRouter);
app.use("/api/listing", listingRouter);

app.use(express.static(path.join(__dirname, '/client/dist')));

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'client','dist','index.html'));
});

//middleware
app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal Server Error';
    return res.status(statusCode).json({
        success:false,
        statusCode,
        message,
    });
});