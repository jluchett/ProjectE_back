const pool = require("../../database/db");

const obtenerCategoria = async (req, res) => {
  try {
    const { id } = req.params;
    const existCateg = await pool.query(
      "select * from categorias where id = $1",
      [id]
    );
    if (existCateg) {
      res.status(201).json({ Categoria: existCateg.rows[0] });
    } else {
      res.status(404).json({ msg: "Categoria no encontrada" });
    }
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Error del servidor");
  }
};
module.exports = obtenerCategoria;
