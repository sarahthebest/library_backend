const User = require('../models/Users');
import { v4 as uuidv4 } from 'uuid';

const registerUser = async (req, res) => {
    try{
        const { username, email, password } = req.body;
        const UUID = uuidv4();
        const newUser = new User({username, email, password, UUID});
        await newUser.save();
        res.status(201).json({message:"Successful register! Proceed to login"});
    } catch (err) {
        res.status(500).json({
            message: "Failed to register user",
            error: err.message,
        });
    }
};

const login = async (req, res) => {

};