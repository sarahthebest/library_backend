const Book = require("../models/Book");
const axios = require("axios");

const addBook = async (req, res) => {
    const { title, author, status } = req.body;
    const searchQuery = `intitle:${title} inauthor:${author}`;

    try {
        const response = await axios.get(
            `https://www.googleapis.com/books/v1/volumes?q=${searchQuery}`
        );

        if (response.data.totalItems > 0) {
            const firstBook = response.data.items[0];
            const bookData = firstBook.volumeInfo;

            const newBook = new Book({
                title: bookData.title,
                authors: bookData.authors || [],
                status,
                publishedDate: bookData.publishedDate || "",
                description: bookData.description || "",
                isbn: bookData.industryIdentifiers
                    ? bookData.industryIdentifiers.map((id) => id.identifier)
                    : [],
                pageCount: bookData.pageCount || 0,
                categories: bookData.categories || [],
                imageLinks: bookData.imageLinks || {},
                averageRating: bookData.averageRating || 0,
                infoLink: bookData.infoLink || "",
            });

            await newBook.save();

            res.status(200).json({
                message: "Book added successfully",
                book: newBook,
            });
        } else {
            res.status(404).json({ message: "No matching book found" });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error adding book" });
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

const searchBooks = async (req, res) => {
    const { title } = req.query;
    const searchQuery = `intitle:${title}`;
    try {
        const response = await axios.get(
            `https://www.googleapis.com/books/v1/volumes?q=${searchQuery}&orderBy=relevance&maxResults=10`
        );
        if (response.data.items) {
            return res.json(response.data.items);
        } else {
            return res.status(404).json({ message: "No books found" });
        }
    } catch (error) {
        console.error(error);
        return res
            .status(500)
            .json({ error: "Error occurred while searching" });
    }
};

module.exports = { addBook, getBooks, searchBooks };
