const express = require("express");
const router = express.Router();

let users = [];

// ✅ GET /users → See all users (for testing)
router.get("/", (req, res) => {
  res.json(users);
});

// ✅ POST /users/register → Register user
router.post("/register", (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: "Username and password required" });
  }

  const existingUser = users.find(u => u.username === username);
  if (existingUser) {
    return res.status(409).json({ message: "User already exists" });
  }

  users.push({ username, password });
  return res.status(201).json({ message: "User successfully registered" });
});

// ✅ POST /users/login → Login
router.post("/login", (req, res) => {
  const { username, password } = req.body;
  const user = users.find(u => u.username === username && u.password === password);

  if (user) {
    return res.status(200).json({ message: "Login successful" });
  } else {
    return res.status(401).json({ message: "Invalid username or password" });
  }
});

module.exports = router;
