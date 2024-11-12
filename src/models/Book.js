const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({
    title: { type: String, required: true },
    author: { type: String, required: true },
    genre: [String],
    status: {
        type: String,
        enum: ["Reading", "Completed", "Want to read"],
        required: true,
    },
    startDate: { type: Date },
    endDate: { type: Date },
    rating: { type: Number, min: 1, max: 5 },
});

module.exports = mongoose.model("Book", bookSchema);
