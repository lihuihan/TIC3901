const bcrypt = require('bcryptjs');
const User = require("../modles/User");
const jwt = require('jsonwebtoken');
require('dotenv').config();

const createUser = async(userData) =>{
    try{
        const email = userData.email;
        const password = userData.password;
        const firstName = userData.firstName;
        const existingUser = await User.findOne({email:email});
        if(existingUser){
            throw new Error('User already exist');
            console.log('User already exists.')
        }
        const hashedPassword = await bcrypt.hash(password,10);
        const user = new User({
            email :email,
            firstName:firstName,
            password:hashedPassword
        });
        await user.save();
        return user
    }catch(error){
        console.log('Error creating user: ${error}');
    }
}

const loginUser = async(userData) =>{
    try{
        const email = userData.email;
        const password = userData.password;
   
        const existingUser = await User.findOne({email:email});
        if(!existingUser){
            throw new Error('User not exist');
            //console.log('User already exists.')
        }
        const isPasswordVaild = await bcrypt.compare(password,existingUser.password);
        if(!isPasswordVaild){
            throw new Error('Invalid password')
        }
        const token = jwt.sign({id:existingUser._id,email:existingUser._email},
            process.env.JWT_SECRET,
            {expiresIn:'30m'} //session expires in 30 m
        );
        return token

    }catch(error){
        console.log('Error loging: ${error}');
    }
}

module.exports={createUser, loginUser};