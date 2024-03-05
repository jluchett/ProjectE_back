const crypto = require("crypto");
const pool = require("../../database/db");
const nodemailer = require("nodemailer");

const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    // Busca el usuario por su correo electrónico
    const usuario = await pool.query(
      "SELECT * FROM usuarios WHERE email = $1",
      [email]
    );
    if (usuario.rows.length === 0) {
      return res.status(400).json({ msg: "Correo electronico no registrado" });
    }

    // Genera un token único para restablecer la contraseña
    const resetToken = crypto.randomBytes(20).toString("hex");
    const resetTokenExpiration = Date.now() + 3600000; // Expira en 1 hora
    await pool.query(
      "INSERT INTO tokens(email, resettoken, resettokenexpira) values ($1, $2, $3)",
      [email, resetToken, resetTokenExpiration]
    );

    const transporter = nodemailer.createTransport({
      host: "smtp.office365.com",
      port: 587,
      secure: false,
      auth: {
        user: process.env.REMITE,
        pass: process.env.CONTRA,
      },
      tls: {
        rejectUnauthorized: false,
      },
    });
    const resetUrl = `http://localhost:3001/usuarios/resetPass/${resetToken}`;
    const mailOptions = {
      from: process.env.REMITE,
      to: user.email,
      subject: "Restablecimiento de contraseña",
      text: `Hola ${
        user.email.split("@")[0]
      },\n\nPara restablecer tu contraseña, haz clic en el siguiente enlace:\n\n${resetUrl}`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error("Error al enviar el correo electrónico:", error);
      } else {
        console.log("Correo electrónico enviado:", info.response);
        res.json({
          message:
            "Se ha enviado un enlace al correo electrónico para restablecer la contraseña",
          success: true,
        });
      }
    });
  } catch (error) {
    console.error(
      "Error al solicitar el restablecimiento de contraseña:",
      error
    );
    res.status(500).json({
      message: "Error al solicitar el restablecimiento de contraseña",
    });
  }
};
module.exports = forgotPassword;
