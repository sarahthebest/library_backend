const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
  title: String,
  authors: [String],
  status: String,
  publishedDate: String,
  description: String,
  isbn: [String],
  pageCount: Number,
  categories: [String],
  imageLinks: {
    smallThumbnail: String,
    thumbnail: String
  },
  averageRating: Number,
  infoLink: String,
  status: {
    type: String,
    enum: ["Reading", "Completed", "Want to read"],
    default: "Want to read",
  },
});

const Book = mongoose.model('Book', bookSchema);

module.exports = Book;
