const pool = require("../../database/db");

const listarPedidos = async (req, res) => {
  try {
    const pedidos = await pool.query("Select * from pedidos");
    res.status(200).json(pedidos.rows)
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Error del servidor");
  }
};
module.exports = listarPedidos;