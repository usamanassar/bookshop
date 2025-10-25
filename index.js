const express = require("express");
const app = express();
const books = require("./books");
const user_routes = require("./users");
const client_routes = require("./client");

app.use(express.json()); // for JSON body parsing

// Routes
app.use("/users", user_routes);
app.use("/client", client_routes);
app.use("/books", books);

app.get("/", (req, res) => {
  res.send("📚 Book Review API is running successfully!");
});

// Start server
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});
