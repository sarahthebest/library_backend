const mongoose = require("mongoose");

const user_schema = new mongoose.Schema({
    username: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    UUID: { type: String, required: true },
});

module.exports = mongoose.model("User", user_schema);
