// controllers/pedidosController.js

const pool = require('../../database/db');

// Función para actualizar un pedido por su ID
async function actualizarPedido(req, res) {
  try {
    const { id } = req.params;
    const { id_usuario, fecha, estado, total } = req.body;

    // Verificar si el pedido existe
    const pedidoExistente = await pool.query('SELECT * FROM pedidos WHERE id = $1', [id]);
    if (pedidoExistente.rows.length === 0) {
      return res.status(404).json({ message: 'Pedido no encontrado' });
    }

    // Actualizar el pedido en la base de datos
    await pool.query('UPDATE pedidos SET id_usuario = $1, fecha = $2, estado = $3, total = $4 WHERE id = $5',
      [id_usuario, fecha, estado, total, id]);

    res.json({ message: 'Pedido actualizado correctamente' });
  } catch (error) {
    console.error('Error al actualizar el pedido:', error);
    res.status(500).json({ message: 'Error del servidor al actualizar el pedido' });
  }
}

module.exports = actualizarPedido;

