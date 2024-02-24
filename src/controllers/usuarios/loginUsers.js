const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const pool = require("../../database/db")
const secretKey = process.env.JWT_SECRET;

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    // Verificar si el usuario existe en la base de datos
    const usuario = await pool.query("SELECT * FROM usuarios WHERE email = $1",[email]);
    if (usuario.rows.length === 0) {
      return res.status(400).json({ msg: "Credenciales inválidas" });
    }
    // Verificar el password
    const passwordValido = await bcrypt.compare(password, usuario.rows[0].password);
    if (!passwordValido) {
      return res.status(400).json({ msg: "Credenciales inválidas" });
    }
    // Generar token de autenticación
    const payload = {
      usuario: {
        id: usuario.rows[0].id,
        nombre: usuario.rows[0].nombre,
        email: usuario.rows[0].email,
      },
    };
    jwt.sign(payload, secretKey, { expiresIn: "1h" }, (error, token) => {
      if (error) throw error;
      res.json({ token });
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Error del servidor");
  }
};
module.exports = {loginUser};