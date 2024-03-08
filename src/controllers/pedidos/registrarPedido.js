const pool = require("../../database/db");

const registrarPedido = async (req, res) => {
  try {
    const { idUser, fecha, estado, total } = req.body;
    const nuevoPedido = await pool.query(
      "INSERT INTO pedidos (id_usuario, fecha, estado, total) VALUES ($1, $2, $3, $4) RETURNING *",
      [idUser, fecha, estado, total]
    );
    res.status(201).json({
      msg: "pedido registrado correctamente",
      pedid: nuevoPedido.rows[0],
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Error del servidor");
  }
};
module.exports = registrarPedido;