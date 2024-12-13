const jwt = require('jsonwebtoken');
const bcrypt = require("bcrypt");

const SECRET_KEY = process.env.SECRET_KEY;  
const REFRESH_SECRET_KEY = process.env.REFRESH_SECRET_KEY;  

exports.generateAccessToken = (user) => {
    const payload = {
        id: user.id,
        username: user.username,
    };
    return jwt.sign(payload, SECRET_KEY, { expiresIn: '15m' });
};

exports.generateRefreshToken = (user) => {
    return jwt.sign({ id: user.id }, REFRESH_SECRET_KEY, { expiresIn: '7d' });
};

exports.generateCsrfToken = () => {
    return require('crypto').randomBytes(64).toString('hex');
};

exports.validateAccessToken = (token) => {
    try {
        return jwt.verify(token, SECRET_KEY);
    } catch (error) {
        return null;
    }
};

exports.validateRefreshToken = (token) => {
    try {
        return jwt.verify(token, REFRESH_SECRET_KEY);
    } catch (error) {
        return null;
    }
};

exports.cryptPassword = async (plainPassword) => {
    const saltRounds = 10;
    if (!plainPassword) {
        throw new Error("Plain password is required");
    }
    const hashedPassword = await bcrypt.hash(plainPassword, saltRounds);
    return hashedPassword;
}

exports.comparepareHashwords = async (outside, inside) => {
    return await bcrypt.compare(outside, inside);
}