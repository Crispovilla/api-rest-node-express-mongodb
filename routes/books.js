// routes/users.js
const express = require("express");
const router = express.Router();
const {
  getBooks,
  postBook,
  getBook,
  deleteBook,
  updateBook,
} = require("../controllers/books");

// Rutas para los usuarios
router.get("/", getBooks);
router.post("/", postBook);
router.get("/:id", getBook);
router.delete("/:id", deleteBook);
router.put("/:id", updateBook);

module.exports = router;
