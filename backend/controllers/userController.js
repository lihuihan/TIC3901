import express from 'express';
//import router from '../routes/user-router';
import UserModel from '../models/userModel.js';

//const uuid = require('uuid/v4');
//https://github.com/meabhisingh/mernProjectEcommerce/blob/master/backend/controllers/productController.js
//const {validationResult} = require('express-validator');
import validationResult from 'express-validator';
import HttpError from '../models/http-error.js';
//const HttpError = require('../modles/http-error')


/*
let DUMMY_USER = [
    
    { id: 8, name: 'Alice', contactEmail: "alice@gmail.com", password:"a" },
    { id: 9, name: 'Bob',contactEmail: "alice@gmail.com", password:"b"  },
    { id: 10, name: 'Charlie', contactEmail: "charlie@gmail.com", password:"c" }

]
*/


const getUser = "All user from controller test";

const createUser = async(req,res,next)=>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return next(
            new HttpError('Invalid inputs passed, pls check your data',422)
        );
    }
    const {name,contactEmail,password} = req.body;

    const createdUser = new User({
        name,
        contactEmail,
        password
    });

    //save is method in mongoose
try{
    await createUser.save();
} catch(err){
    const error = new HttpError(
        'Create user failed, pls try again',
        500
    );
    return next(error);
}
    res.status(201).json({user:createdUser});

}
export { getUser,createUser }