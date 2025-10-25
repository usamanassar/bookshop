const express = require("express");
const jwt = require("jsonwebtoken");
const axios = require("axios");
const books = require("./books.js");
const { users, isValid, authenticatedUser } = require("./users.js");
const app = express();

app.use(express.json());

const SECRET_KEY = "mysecretkey"; // secret for signing JWT

// ---------------------------
// TASKS 1–6 (same as before)
// ---------------------------

// Task 1
app.get("/books", (req, res) => res.send(JSON.stringify(books, null, 2)));

// Task 2
app.get("/books/isbn/:isbn", (req, res) => {
  const isbn = req.params.isbn;
  const book = Object.values(books).find(b => b.isbn === isbn);
  book ? res.send(book) : res.status(404).send({ message: "Book not found" });
});

// Task 3
app.get("/books/author/:author", (req, res) => {
  const author = req.params.author.toLowerCase();
  const result = Object.values(books).filter(b => b.author.toLowerCase() === author);
  result.length ? res.send(result) : res.status(404).send({ message: "No books for this author" });
});

// Task 4
app.get("/books/title/:title", (req, res) => {
  const title = req.params.title.toLowerCase();
  const result = Object.values(books).filter(b => b.title.toLowerCase() === title);
  result.length ? res.send(result) : res.status(404).send({ message: "No books for this title" });
});

// Task 5
app.get("/books/review/:isbn", (req, res) => {
  const isbn = req.params.isbn;
  const book = Object.values(books).find(b => b.isbn === isbn);
  book ? res.send(book.reviews) : res.status(404).send({ message: "Book not found" });
});

// Task 6
app.post("/register", (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) return res.status(400).send({ message: "Username and password required" });
  if (isValid(username)) return res.status(400).send({ message: "User already exists" });

  users.push({ username, password });
  res.send({ message: "User registered successfully" });
});

// ---------------------------
// TASK 7: Login (JWT)
// ---------------------------
app.post("/customer/login", (req, res) => {
  const { username, password } = req.body;

  if (!authenticatedUser(username, password)) {
    return res.status(401).send({ message: "Invalid username or password" });
  }

  const token = jwt.sign({ username }, SECRET_KEY, { expiresIn: "1h" });
  res.send({ message: "Login successful", token });
});

// Middleware for verifying JWT
const authenticateJWT = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(403).send({ message: "Token missing" });

  const token = authHeader.split(" ")[1];
  jwt.verify(token, SECRET_KEY, (err, user) => {
    if (err) return res.status(403).send({ message: "Invalid token" });
    req.user = user;
    next();
  });
};

// ---------------------------
// TASK 8: Add or Modify Review
// ---------------------------
app.put("/auth/review/:isbn", authenticateJWT, (req, res) => {
  const isbn = req.params.isbn;
  const review = req.query.review;
  const username = req.user.username;

  if (!review) return res.status(400).send({ message: "Review query is required" });

  const book = Object.values(books).find(b => b.isbn === isbn);
  if (!book) return res.status(404).send({ message: "Book not found" });

  // Add or modify review
  book.reviews[username] = review;
  res.send({ message: "Review added/modified successfully", reviews: book.reviews });
});

// ---------------------------
// TASK 9: Delete Review
// ---------------------------
app.delete("/auth/review/:isbn", authenticateJWT, (req, res) => {
  const isbn = req.params.isbn;
  const username = req.user.username;

  const book = Object.values(books).find(b => b.isbn === isbn);
  if (!book) return res.status(404).send({ message: "Book not found" });

  if (book.reviews[username]) {
    delete book.reviews[username];
    res.send({ message: "Your review deleted successfully" });
  } else {
    res.status(404).send({ message: "No review found for this user" });
  }
});

// ---------------------------
// TASK 10–13: Axios with Async/Await
// ---------------------------

app.get("/async/books", async (req, res) => {
  try {
    const response = await axios.get("http://localhost:3000/books");
    res.send(response.data);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

app.get("/async/isbn/:isbn", async (req, res) => {
  try {
    const response = await axios.get(`http://localhost:3000/books/isbn/${req.params.isbn}`);
    res.send(response.data);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

app.get("/async/author/:author", async (req, res) => {
  try {
    const response = await axios.get(`http://localhost:3000/books/author/${req.params.author}`);
    res.send(response.data);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

app.get("/async/title/:title", async (req, res) => {
  try {
    const response = await axios.get(`http://localhost:3000/books/title/${req.params.title}`);
    res.send(response.data);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// ---------------------------
// START SERVER
// ---------------------------
const PORT = 3000;
app.listen(PORT, () => console.log(`✅ Server is running on http://localhost:${PORT}`));
