const pool = require("../../database/db");

const eliminarPedido = async (req, res) => {
  try {
    const { id } = req.params;

    await pool.query("DELETE FROM pedidos WEHERE id = $1", [id]);

    res.status(200).json({msg: "Pedido eliminado"})
    
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Error del servidor");
  }
};
module.exports = eliminarPedido;