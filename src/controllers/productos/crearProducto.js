// crearProducto.js

// Importación de dependencias necesarias
const pool = require("../../database/db");

// Función para crear un nuevo producto
const crearProducto = async (req, res) =>{
  try {
    const { nombre, descripcion, precio, cantidad_disponible, imagen } = req.body;

    // Insertar nuevo producto en la base de datos
    const nuevoProducto = await pool.query(
      "INSERT INTO productos (nombre, descripcion, precio, cantidad_disponible, imagen) VALUES ($1, $2, $3, $4, $5) RETURNING *",
      [nombre, descripcion, precio, cantidad_disponible, imagen]
    );

    res.status(201).json({
      msg: "Producto creado correctamente",
      producto: nuevoProducto.rows[0],
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Error del servidor");
  }
}

// Exportación de la función
module.exports = crearProducto;
