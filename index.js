const express = require("express");
const app = express();
const bodyParser = require("body-parser");

// Middleware
app.use(bodyParser.json());

// Import books data
const books = require("./books.js");

app.get("/books", (req, res) => {
  res.json(books);
});

app.get("/books/isbn/:isbn", (req, res) => {
  const isbn = req.params.isbn;
  const book = books.find(b => b.isbn === isbn);
  if (book) {
    res.json(book);
  } else {
    res.status(404).json({ message: "Book not found" });
  }
});

// ===== Task 3: Get all books by Author =====
app.get("/books/author/:author", (req, res) => {
  const author = req.params.author.toLowerCase();
  const filtered = books.filter(b => b.author.toLowerCase() === author);
  if (filtered.length > 0) {
    res.json(filtered);
  } else {
    res.status(404).json({ message: "No books found for this author" });
  }
});

// ===== Task 4: Get all books based on Title =====
app.get("/books/title/:title", (req, res) => {
  const title = req.params.title.toLowerCase();
  const filtered = books.filter(b => b.title.toLowerCase().includes(title));
  if (filtered.length > 0) {
    res.json(filtered);
  } else {
    res.status(404).json({ message: "No books found with that title" });
  }
});

// ===== Task 5: Get book Review =====
app.get("/books/review/:isbn", (req, res) => {
  const isbn = req.params.isbn;
  const book = books.find(b => b.isbn === isbn);
  if (book) {
    res.json(book.reviews || {});
  } else {
    res.status(404).json({ message: "Book not found" });
  }
});

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`✅ Bookshop server is running on http://localhost:${PORT}`);
});
module.exports = app;