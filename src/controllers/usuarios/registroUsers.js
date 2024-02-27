const bcrypt = require("bcrypt");
const pool = require("../../database/db");
const validar = require("../../validators/usuariosValidator");

const registerUser = async (req, res) => {
  try {
    // Validar los datos de entrada utilizando el esquema de validación
    const { error } = validar.registroUsuario.validate(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }
    const {nombre,email,password,direccion,ciudad,pais,codigo_postal,rol,} = req.body;
    // Verificar si el usuario ya existe en la base de datos
    const usuarioExistente = await pool.query("SELECT * FROM usuarios WHERE email = $1",[email]);
    if (usuarioExistente.rows.length > 0) {
      return res.status(400).json({ msg: "El usuario ya está registrado" });
    }
    // Hash del password
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);
    // Insertar nuevo usuario en la base de datos
    const nuevoUsuario = await pool.query(
      "INSERT INTO usuarios (nombre, email, password, direccion, ciudad, pais, codigo_postal, rol) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *",
      [nombre, email, passwordHash, direccion, ciudad, pais, codigo_postal, rol]
    );
    res.status(201).json({
      msg: "Usuario registrado correctamente",
      usuario: nuevoUsuario.rows[0],
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Error del servidor");
  }
};
module.exports = {registerUser};