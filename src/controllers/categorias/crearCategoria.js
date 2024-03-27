const pool = require("../../database/db");

const crearCategoria = async (req, res) => {
  try {
    const { nombre } = req.body;
    if (!nombre || typeof nombre !== 'string') {
      return res.status(400).json({ msg: "No se ha proporcionado nombre o no es texto" });
    }
    const findCategory = await pool.query(
      "Select * from categorias Where nombre = $1",
      [nombre]
    );
    if (findCategory) {
      return res.status(300).json({ msg: "Categoria ya existe" });
    }
    const newCategory = await pool.query(
      "insert into categorias (nombre) values($1) RETURNING *",
      [nombre]
    );
    res.status(201).json({ msg: "Categoria agregada", Categoria: newCategory.rows[0]})
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Error del servidor");
  }
};

module.exports = crearCategoria;
