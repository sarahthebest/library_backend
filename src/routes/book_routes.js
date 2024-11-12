const express = require('express');
const router = express.Router();
const bookController = require("../controllers/book_controller");

router.post("/add", bookController.addBook);
router.get("/get_books", bookController.getBooks);

module.exports = router;