const pool = require("../../database/db");

const updateMetodo = async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre } = req.body;
    if (!nombre || typeof nombre !== "string") {
      return res
        .status(400)
        .json({ msg: "El nombre debe ser texto y no estar vacio" });
    }
    const existeMetodo = await pool.query("select * from where id = $1", [id]);
    if (!existeMetodo) {
      return res
        .status(300)
        .json({ msg: "El metodo de pago no esta registrado" });
    }
    const actualMetodo = await pool.query("UPDATE metodos_pago SET nombre=$1 WHERE id=$2 RETURNING *", [nombre, id]);
    res.status(201).json({ msg: "Metodo actualizado", metodoPago: actualMetodo.rows[0]});
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Error del servidor");
  }
};
module.exports = updateMetodo;
