import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();
import userRouter from './routes/UserRouter.js';
import HttpError from './errors/HttpError.js';
import bodyParser from 'body-parser';
/**
 * Body Parser can parse incoming JSON requests and convert them into JavaScript 
 * objects, enabling developers to interact with the data easily.
 * npm install body-parser
 */


//const placeRoutes = require('./routes/places-routes');
//const placeRoutes = require('./routes/users-routes');
//const HttpError = require('./modles/http-error');

const app = express();
// Middleware to parse JSON requests
app.use(express.json()); 

// Use the user routes
app.use('/api/user', userRouter); 


app.use(bodyParser.json());

//app.use('/api/places',placeRoutes); //=>/api/places...
//app.use('/api/users',userRoutes);

app.use((req,res,next)=>{
    const error = new HttpError('route not find',404);
    throw error;
    if(res.headersSent){
        return next(error);
    }
    res.status(error.code || 500);
    res.json({message:error.message || 'An unknown error occured'});

});

const serPort = process.env.SERVER_PORT
const mongoUri=process.env.ATLAS_URI

mongoose.connect(mongoUri).then(
    ()=>{
        app.listen(serPort);
        console.log(`Database connected, listening to port: ${serPort}`)
    }
).catch( err=>{
    console.log(err);
}   
);



