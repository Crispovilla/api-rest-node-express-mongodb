const express = require("express");
const mongoose = require("mongoose");

const app = express();
const PORT = process.env.PORT || 3001;
mongoose.connect(
  "mongodb+srv://crispo:hNyWUThnKBZBn0pT@cluster-libreria.rxiqvjd.mongodb.net/?retryWrites=true&w=majority"
);
const db = mongoose.connection;
db.on("error", (err) => console.error("Error de conexión a MongoDB:", err));
db.once("open", () => console.log("Conexión exitosa a MongoDB"));

// Middleware para procesar datos en formato JSON
app.use(express.json());
// Rutas
const booksRoutes = require("./routes/books");
app.use("/books", booksRoutes);

// Manejo de errores
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Algo salió mal" });
});

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor iniciado en http://localhost:${PORT}`);
});
