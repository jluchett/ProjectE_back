// actualizar el perfil de un usuario
const pool = require("../../database/db")
const validar = require("../../validators/usuariosValidator")

async function actualizarPerfil(req, res) {
  try {
    const { id } = req.user; // Obtener el ID del usuario autenticado
    // Obtener los datoS actualizados del perfil
    const { nombre, email, direccion, ciudad, pais, codigo_postal } = req.body; 
    // Validar los datos de entrada utilizando el esquema de validación
    const { error } = validar.updateUsuario.validate(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }
    // Actualizar el perfil del usuario en la base de datos
    const usuarioActualizado = await pool.query(
      "UPDATE usuarios SET nombre = $1, email = $2, direccion = $3, ciudad = $4, pais = $5, codigo_postal = $6 WHERE id = $7 RETURNING *",
      [nombre, email, direccion, ciudad, pais, codigo_postal, id]
    );

    res.status(200).json({
      msg: "Perfil de usuario actualizado correctamente",
      usuario: usuarioActualizado.rows[0],
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Error del servidor");
  }
}
module.exports = actualizarPerfil;