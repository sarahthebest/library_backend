const { v4: uuidv4 } = require('uuid');
const User = require("../models/Users");

const createUser = async (userData) => {
    const newUser = new User(userData);
    return await newUser.save();
};

const findUserByEmail = async (email) => {
    return await User.findOne({ email });
};

module.exports = { createUser, findUserByEmail };