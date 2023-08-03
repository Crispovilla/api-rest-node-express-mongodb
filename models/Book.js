// models/Books.js
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  id: { type: Number, required: true, unique: true },
  name: { type: String, required: true },
  author: { type: String, required: true },
  stock: { type: Number, required: true },
});

const BookModel = mongoose.model("Book", userSchema);

module.exports = BookModel;
