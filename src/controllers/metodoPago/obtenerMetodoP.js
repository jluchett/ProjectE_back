const pool = require("../../database/db");

const obtenerMetodo = async (req, res) => {
  try {
    const { id } = req.params;
    const existMetodo = await pool.query(
      "select * from metodos_pago where id = $1",
      [id]
    );
    if (existMetodo) {
      res.status(201).json({ MetodoPago: existMetodo.rows[0] });
    } else {
      res.status(404).json({ msg: "Metodo pago no encontrado" });
    }
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Error del servidor");
  }
};
module.exports = obtenerMetodo;
