const express = require("express");
const router = express.Router();

// Dummy books data
let books = {
  "1234": {
    title: "The Great Gatsby",
    author: "F. Scott Fitzgerald",
    reviews: {}
  },
  "5678": {
    title: "To Kill a Mockingbird",
    author: "Harper Lee",
    reviews: {}
  }
};

// Get all books
router.get("/", (req, res) => {
  res.json(books);
});

// Get book details by ISBN
router.get("/:isbn", (req, res) => {
  const isbn = req.params.isbn;
  if (books[isbn]) {
    res.json(books[isbn]);
  } else {
    res.status(404).json({ message: "Book not found" });
  }
});

module.exports = router;
