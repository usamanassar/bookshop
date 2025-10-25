const express = require("express");
const axios = require("axios");
const router = express.Router();

// Test route to confirm it works
router.get("/", (req, res) => {
  res.send("Client API is working!");
});

// Example: Get all books (async/await)
router.get("/books", async (req, res) => {
  try {
    const response = await axios.get("http://localhost:5000/books");
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Example: Get book by ISBN
router.get("/isbn/:isbn", async (req, res) => {
  try {
    const response = await axios.get(`http://localhost:5000/books/isbn/${req.params.isbn}`);
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Example: Get book by author
router.get("/author/:author", async (req, res) => {
  try {
    const response = await axios.get(`http://localhost:5000/books/author/${req.params.author}`);
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Example: Get book by title
router.get("/title/:title", async (req, res) => {
  try {
    const response = await axios.get(`http://localhost:5000/books/title/${req.params.title}`);
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
