const pool = require("../../database/db");

const deleteMetodo = async (req, res) => {
  try {
    const { id } = req.params;
    const existeMetodo = await pool.query("select * from metodos_pago where id = $1", [id]);
    if (!existeMetodo) {
      return res
        .status(404)
        .json({ msg: "El metodo de pago no esta registrado" });
    }
    const delMetodo = await pool.query("DELETE FROM metodos_pago WHERE id=$1 RETURNING *", [id]);
    res.status(201).json({ msg: "Metodo eliminado", metodoPago: delMetodo.rows[0]});
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Error del servidor");
  }
};
module.exports = deleteMetodo;