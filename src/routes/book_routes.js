const express = require('express');
const router = express.Router();
const { addBook, getBooks } = require("../controllers/book_controller");

router.post("/add", addBook);
router.get("/get_books", getBooks);

module.exports = router;