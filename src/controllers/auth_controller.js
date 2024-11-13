const User = require("../models/Users");
const { v4: uuidv4 } = require('uuid');

const register_user = async (req, res) => {
    try {
        const { username, email, password } = req.body;
        const UUID = uuidv4();
        const newUser = new User({ username, email, password, UUID });
        await newUser.save();
        res.status(201).json({
            message: "Successful register! Proceed to login",
        });
    } catch (err) {
        res.status(500).json({
            message: "Failed to register user",
            error: err.message,
        });
    }
};

const login = async (req, res) => {};

const cookie_consent = (req, res) => {
    try {
        const { consent } = req.body;

        res.cookie("consent", consent, {
            maxAge: 30 * 24 * 60 * 60 * 1000,
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "Strict",
        });

        res.status(200).json({ message: "Cookie consent set" });
    } catch (err) {
        res.status(500).json({
            message: "Failed to set cookie",
            error: err.message,
        });
    }
};
module.exports = { register_user, login, cookie_consent };
