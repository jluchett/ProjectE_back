const pool = require("../../database/db");
// Función para obtener un producto por su ID
async function obtenerProducto(req, res) {
  try {
    const { id } = req.params; // Obtener el ID del producto de los parámetros de la URL
    // Consultar el producto en la base de datos por su ID
    const producto = await pool.query("SELECT * FROM productos WHERE id = $1", [id]);
    // Verificar si el producto fue encontrado
    if (producto.rows.length === 0) {
      return res.status(404).json({ msg: "Producto no encontrado" });
    }
    res.status(200).json(producto.rows[0]); // Devolver el producto encontrado como respuesta
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Error del servidor");
  }
}
// Exportación de la función
module.exports =  obtenerProducto;
