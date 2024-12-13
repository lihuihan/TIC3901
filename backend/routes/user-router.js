import express from 'express';
import {
    //the functions will be used in userController

} from '../controllers/userController.js'

const router = express.Router();


// GET request to retrieve all users
/** not make sense allow user view all user info
 * below code for testing router,module 
*/
 router.get('/', async (req, res, next) => {
    try {
        const users = await UserModel.find(); // Assuming UserModel has a method like find to retrieve users
        console.log('GET Request for all users');
        res.json(users); // Return the list of users
    } catch (error) {
        next(error); // Pass errors to the error handling middleware
    }
});


// GET request to retrieve a user by ID
//not make sense user know their id...and access from tab
router.get('/:uid', async (req, res, next) => {
    const userId = req.params.uid;
    try {
        const user = await UserModel.findById(userId); // Fetch user by ID using appropriate method
        if (!user) {
            return res.status(404).json({ message: 'User not found' }); // Handle user not found
        }
        console.log(`GET Request for user ID: ${userId}`);
        res.json(user); // Return the user object
    } catch (error) {
        next(error); // Pass errors to the error handling middleware
    }
});

export default router;

