const pool = require("../../database/db");

const listarMetodos = async (req, res) => {
  try {
    const metodos = await pool.query("select * from metodos_pago");
    res.status(201).json({ metodosPago: metodos.rows });
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Error del servidor");
  }
};
module.exports = listarMetodos;
