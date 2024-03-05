const pool = require("../../database/db");
const bcrypt = require("bcrypt");

const resetPassword = async (req, res) => {
  try {
    const { resetToken } = req.params;
    const { newPassword } = req.body;
    if (!newPassword) {
      return res
        .status(400)
        .json({ error: "no se encontro la nueva contraseña" });
    }
    console.log(resetToken);
    const passwordHash = await bcrypt.hash(newPassword, 10);
    // Busca el usuario por el token de restablecimiento de contraseña
    const tokenResult = await pool.query(
      "SELECT * FROM tokens WHERE resetToken = $1 AND resetTokenExpira > NOW()",
      [token]
    );
    // Verificar si el token es válido y aún no ha expirado
    if (tokenResult.rows.length === 0) {
      return res.status(400).json({
        message:
          "El enlace para reestablecer la contraseña no es válido o ha expirado",
        success: false,
      });
    }
    // Actualizar la contraseña del usuario en la base de datos
    await pool.query("UPDATE usuarios SET contraseña = $1 WHERE email = $2", [
      passwordHash,
      tokenResult.rows[0].email,
    ]);
    // Eliminar el token de la base de datos
    await pool.query("DELETE FROM tokens WHERE resetToken = $1", [token]);
    //respuesta del servidor
    res.json({
      message: "Contraseña reestablecida correctamente",
      success: true,
    });
  } catch (error) {
    console.error("Error al reestablecer la contraseña:", error);
    res.status(500).json({ message: "Error al reestablecer la contraseña" });
  }
};
module.exports = resetPassword;
