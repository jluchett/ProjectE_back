const pool = require("../../database/db");

// Función para eliminar un producto
async function eliminarProducto(req, res) {
  try {
    const { id } = req.params; // Obtener el ID del producto de los parámetros de la URL
    // Eliminar el producto de la base de datos por su ID
    await pool.query("DELETE FROM productos WHERE id = $1", [id]);
    res.status(200).json({ msg: "Producto eliminado correctamente" });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Error del servidor");
  }
}
// Exportación de la función
module.exports = eliminarProducto;
