// controllers/users.js
const BookModel = require("../models/Book");

const getBooks = async (req, res) => {
  try {
    const books = await BookModel.find({});
    res.json(books);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener los libros" });
  }
};

const postBook = async (req, res) => {
  const { id, name, author, stock } = req.body;
  if (!id || !name || !author || !stock) {
    return res.status(400).json({
      error: "Debe proporcionar todos los datos requeridos.",
    });
  }
  try {
    const newBook = await BookModel.create({ id, name, author, stock });
    res.json(newBook);
  } catch (error) {
    res.status(500).json({ error: "Error al crear el nuevo libro" });
  }
};

const getBook = async (req, res) => {
  const bookId = parseInt(req.params.id);
  try {
    const book = await BookModel.findOne({ id: bookId });
    if (!book) {
      return res.status(400).json({ error: "Libro no encontrado" });
    }
    return res.json(book);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener el libro" });
  }
};

const deleteBook = async (req, res) => {
  const bookId = parseInt(req.params.id);
  try {
    const deleteBook = await BookModel.findOneAndDelete({ id: bookId });
    if (!deleteBook) {
      return res
        .status(404)
        .json({ error: "Libro no encontrado. No se pudo eliminar." });
    }
    res.json({
      message: "Libro eliminado correctamente.",
      book: deleteBook,
    });
  } catch (error) {
    res.status(500).json({ error: "Error al eliminar el libro" });
  }
};

const updateBook = async (req, res) => {
  const bookId = parseInt(req.params.id);
  const { name, author, stock } = req.body;
  if (!name) {
    return res.status(404).json({ error: "Debe proporcionar un nombre." });
  }
  try {
    const updatedBook = await BookModel.findOneAndUpdate(
      { id: bookId },
      { name, author, stock },
      { new: true }
    );
    if (!updatedBook) {
      return res
        .status(404)
        .json({ error: "Libro no encontrado. No se pudo actualizar." });
    }
    res.json({
      message: "Libro actualizado correctamente ",
      book: updatedBook,
    });
  } catch (error) {
    res.status(500).json({ error: "Error al actualizar el libro" });
  }
};

module.exports = { getBooks, postBook, getBook, deleteBook, updateBook };
