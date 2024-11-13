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
            const firstBook = response.data.items.find((item) => {
                const titleMatches =
                    item.volumeInfo.title.toLowerCase() === title.toLowerCase();
                const authorMatches =
                    item.volumeInfo.authors &&
                    item.volumeInfo.authors.some(
                        (a) => a.toLowerCase() === author.toLowerCase()
                    );
                return titleMatches && authorMatches;
            });

            if (firstBook) {
                const bookData = firstBook.volumeInfo;

                const newBook = new Book({
                    title: bookData.title,
                    authors: bookData.authors || [],
                    status, 
                    publishedDate: bookData.publishedDate || "",
                    description: bookData.description || "",
                    isbn: bookData.industryIdentifiers
                        ? bookData.industryIdentifiers.map(
                              (id) => id.identifier
                          )
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
        } else {
            res.status(404).json({ message: "Book not found" });
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

module.exports = { addBook, getBooks };
