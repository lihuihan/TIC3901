import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import session from 'express-session';
import passport from 'passport';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import cors from 'cors';

import userRouter from './routes/UserRouter.js';
import authRouter from './routes/auth.route.js'; 
import HttpError from './utils/HttpError.js'; 
import './config/passport.js';

dotenv.config();
const serPort = process.env.SERVER_PORT;
const mongoUri = process.env.ATLAS_URI;
/**
 * This code set up the server and connect to the database.
 * also set up the middleware for the server.
 */
const app = express(); // Initialize the app before using it

mongoose
    .connect(mongoUri)
    .then(() => {
        app.listen(serPort, () => {
            console.log(`Database connected, listening to port: ${serPort}`);
        });
    })
    .catch(err => {
        console.log(err);
    });

const __dirname = path.resolve();

app.use(cors());
app.use(bodyParser.json());
app.use(cookieParser());
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false } // Set to true if using HTTPS
}));
app.use(passport.initialize());
app.use(passport.session());

app.use('/api/user', userRouter);
app.use('/api/auth', authRouter);

app.use(express.static(path.join(__dirname, 'frontend')));

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'frontend', 'index.html'));
});

app.use((req, res, next) => {
    const error = new HttpError('Route not found', 404);
    next(error); // Use next() to pass the error to the error handler
});

app.use((error, req, res, next) => {
    if (res.headersSent) {
        return next(error);
    }
    const statusCode = error.code && Number.isInteger(error.code) ? error.code : 500;
    res.status(statusCode);
    res.json({ message: error.message || 'An unknown error occurred' });
});