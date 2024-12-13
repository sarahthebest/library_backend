const User = require("../models/Users");
const bcrypt = require("bcrypt");
const { v4: uuidv4 } = require("uuid");
const { createUser, findUserByEmail } = require("../domain/user_handler");
const {
    generateAccessToken,
    generateCsrfToken,
} = require("../domain/auth_handler");

const register_user = async (req, res) => {
    try {
        const { username, email, password } = req.body;
        if (!username || !email || !password) {
            return res.status(400).json({ message: "All fields required!" });
        }
        const existingUser = await findUserByEmail(email);
        if (existingUser) {
            return res
                .status(400)
                .json({ message: "Email is already registered!" });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const UUID = uuidv4();
        const accessToken = generateAccessToken({ email });
        const csrfToken = generateCsrfToken({ email });
        const newUser = await createUser({
            username,
            email,
            password: hashedPassword,
            UUID,
        });

        res.cookie("accessToken", accessToken);
        res.cookie("csrfToken", csrfToken);

        res.status(201).json({
            message: "Successful register! Proceed to login.",
            user: {
                id: newUser._id,
                username: newUser.username,
                email: newUser.email,
            },
        });
    } catch (err) {
        console.error("Error during registration:", err);
        res.status(500).json({
            message: "Failed to register user.",
            error: err.message || "An unknown error occurred.",
        });
    }
};

const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res
                .status(400)
                .json({ message: "All fields are required!" });
        }
        const user = await findUserByEmail(email);
        if (!user) {
            return res.status(400).json({ message: "User not found!" });
        }
        const verifiedPassword = await bcrypt.compare(password, user.password);
        if (!verifiedPassword) {
            return res
                .status(400)
                .json({ message: "Incorrect credentials, try again!" });
        }
        const token = generateAccessToken(user);
        return res.status(200).json({ message: "Login success!", token });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Server error!" });
    }
};

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
