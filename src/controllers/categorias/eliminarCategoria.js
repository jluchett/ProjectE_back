const pool = require("../../database/db");

const eliminarCategoria = async (req, res) => {
  try {
    const { id } = req.params;
    const existCateg = await pool.query(
      "select * from categorias where id = $1",
      [id]
    );
    if (!existCateg) {
      return res.status(404).json({ msg: "Categoria no encontrada" });
    }
    await pool.query("DELETE FROM categorias WHERE id = $1", [id]);
    res.status(201).json({ msg: "Categoria eliminada" });
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Error del servidor");
  }
};
module.exports = eliminarCategoria;
