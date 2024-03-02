
const pool = require("../../database/db");

// Función para listar todos los productos
async function listarProductos(req, res) {
  try {
    // Consultar todos los productos en la base de datos
    const productos = await pool.query("SELECT * FROM productos");

    res.status(200).json(productos.rows);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Error del servidor");
  }
}
// Exportación de la función
module.exports = listarProductos;
