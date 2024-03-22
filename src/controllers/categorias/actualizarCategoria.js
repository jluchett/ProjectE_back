const pool = require("../../database/db");

const updateCategoria = async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre } = req.body;
    if (!nombre || typeof nombre !== "string") {
      return res
        .status(400)
        .json({ msg: "No se ha proporcionado nombre o no es texto" });
    }
    const existeCategoria = await pool.query(
      "select * from categorias where id = $1",
      [id]
    );
    if (!existeCategoria) {
      return res.status(404).json({ msg: "Categoria no encontrada" });
    }
    await pool.query("UPDATE categorias SET nombre = $2  WHERE id = $1", [
      id,
      nombre,
    ]);
    res.status(201).json({ msg: "Categoria actualizada" });
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Error del servidor");
  }
};
module.exports = updateCategoria;