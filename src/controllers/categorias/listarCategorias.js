const pool = require("../../database/db");

const listarCategorias = async (req, res) => {
  try {
    const listaCategorias = await pool.query("select * from categorias");

    if (listaCategorias) {
      res.status(201).json(listaCategorias.rows);
    }
  } catch (error) {
    console.log(error.message);
    res.status(500).send("error del servidor");
  }
};

module.exports = listarCategorias;
