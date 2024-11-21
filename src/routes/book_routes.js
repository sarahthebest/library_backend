const express = require('express');
const router = express.Router();
const { addBook, getBooks, searchBooks } = require("../controllers/book_controller");

router.post("/add", addBook);
router.get("/get_books", getBooks);
router.get("/search", searchBooks);


module.exports = router;