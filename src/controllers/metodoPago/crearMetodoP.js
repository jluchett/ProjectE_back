const pool = require("../../database/db");

const crearMetodo = async (req, res) => {
  try {
    const { nombre } = req.body;
    if (!nombre || typeof nombre !== "string") {
      return res
        .status(400)
        .json({ msg: "El nombre debe ser texto y no estar vacio" });
    }
    const existeMetodo = await pool.query("select * from where nombre = $1", [
      nombre,
    ]);
    if (existeMetodo) {
      return res
        .status(300)
        .json({ msg: "Este nombre de metodo pago ya esta registrado" });
    }
    await pool.query("INSERT INTO metodos_pago (nombre) values ($1)", [nombre]);
    res.status(201).json({ msg: "Metodo registrado" });
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Error del servidor");
  }
};
module.exports = crearMetodo;
