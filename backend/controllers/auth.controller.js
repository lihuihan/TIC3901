import User from '../models/UserModel.js';
import bcryptjs from 'bcryptjs';
import passport from 'passport';
import HttpError from '../utils/HttpError.js'; 

export const signup = async (req, res, next) => {
    const { name, email, password } = req.body;
    const hashedPassword = bcryptjs.hashSync(password, 10);
    const newUser = new User({ name, email, password: hashedPassword });
    try {
        await newUser.save();
        res.status(201).json({ message: 'User created successfully' });
    } catch (error) {
        next(new HttpError(error.message, 500)); // Pass a proper HttpError to the next middleware
    }
};

export const signin = (req, res, next) => {
    passport.authenticate('local', (err, user, info) => {
        if (err) {
            return next(err);
        }
        if (!user) {
            return res.status(401).json({ message: info.message });
        }
        req.logIn(user, (err) => {
            if (err) {
                return next(err);
            }
            return res.status(200).json({ message: 'User signed in successfully' });
        });
    })(req, res, next);
};

export const signout = (req, res) => {
    req.logout();
    res.status(200).json({ message: 'Signout success!' });
};

export const google = async (req, res, next) => {
    try {
        const user = await User.findOne({ email: req.body.email });
        if (user) {
            // Create a session for the user
            req.session.user = {
                id: user._id,
                username: user.username,
                email: user.email
            };

            const { password: hashedPassword, ...rest } = user._doc;
            res.status(200).json(rest);
        } else {
            const generatedPassword = bcryptjs.hashSync(req.body.password, 10);
            const newUser = new User({
                username: req.body.username,
                email: req.body.email,
                password: generatedPassword
            });

            await newUser.save();

            // Create a session for the new user
            req.session.user = {
                id: newUser._id,
                username: newUser.username,
                email: newUser.email
            };

            const { password: hashedPassword, ...rest } = newUser._doc;
            res.status(201).json(rest);
        }
    } catch (error) {
        next(error);
    }
};
