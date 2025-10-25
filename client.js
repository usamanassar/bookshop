const axios = require("axios");

async function getAllBooks() {
  const res = await axios.get("http://localhost:3000/books");
  console.log("All Books:", res.data);
}

function getBookByISBN(isbn) {
  axios.get(`http://localhost:3000/books/isbn/${isbn}`)
    .then(res => console.log("Book by ISBN:", res.data))
    .catch(err => console.error("Error:", err.message));
}

async function getBookByAuthor(author) {
  const res = await axios.get(`http://localhost:3000/books/author/${author}`);
  console.log("Books by Author:", res.data);
}

async function getBookByTitle(title) {
  const res = await axios.get(`http://localhost:3000/books/title/${title}`);
  console.log("Books by Title:", res.data);
}


(async () => {
  await getAllBooks();
  getBookByISBN("1111");
  await getBookByAuthor("George Orwell");
  await getBookByTitle("The Hobbit");
})();
