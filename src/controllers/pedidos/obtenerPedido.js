const pool = require("../../database/db");

const obtenerPedido = async (req, res) => {
  try {
    const { id } = req.params;
    const pedido = await pool.query("SELECT * FROM pedidos WHERE id = $1", [id]);
    if (pedido.rows.length === 0) {
      return res.status(404).json({ msg: "pedido no encontrado" });
    }
    res.status(200).json(pedido.rows[0]);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Error del servidor");
  }
};
module.exports = obtenerPedido;