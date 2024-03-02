const pool = require("../../database/db");

// Función para actualizar un producto
async function actualizarProducto(req, res) {
  try {
    const { id } = req.params; // Obtener el ID del producto de los parámetros de la URL
    const { nombre, descripcion, precio, cantidad_disponible, imagen } = req.body; // Obtener los datos actualizados del producto del cuerpo de la solicitud
    // Actualizar el producto en la base de datos
    const productoActualizado = await pool.query(
      "UPDATE productos SET nombre = $1, descripcion = $2, precio = $3, cantidad_disponible = $4, imagen = $5 WHERE id = $6 RETURNING *",
      [nombre, descripcion, precio, cantidad_disponible, imagen, id]
    );
    // Verificar si el producto se actualizó correctamente
    if (productoActualizado.rows.length === 0) {
      return res.status(404).json({ msg: "El producto no fue encontrado" });
    }
    res.status(200).json({
      msg: "Producto actualizado correctamente",
      producto: productoActualizado.rows[0],
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Error del servidor");
  }
}
// Exportación de la función
module.exports = actualizarProducto;
