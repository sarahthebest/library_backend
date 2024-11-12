const Book = require("../models/Book");

const addBook = async (req, res) => {
    try {
        const { title, author, genre, status } = req.body;
        const newBook = new Book({ title, author, genre, status });
        await newBook.save();
        res.status(201).json({
            message: "Book added successfully",
            book: newBook,
        });
    } catch (error) {
        res.status(500).json({
            message: "Failed to add book",
            error: error.message,
        });
    }
};

const getBooks = async (req, res) => {
    try {
        const books = await Book.find();
        res.status(200).json(books);
    } catch (error) {
        res.status(500).json({
            message: "Failed to retrieve books",
            error: error.message,
        });
    }
};

module.exports = { addBook, getBooks };
