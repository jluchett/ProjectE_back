// usuariosController.js
const moduloRegistro = require("./registroUsers")
const moduloLogin = require("./loginUsers")
const moduloPerfil = require("./perfilUsers")
const actualizarPerfil = require("./updateUser")
const forgotPassword = require("./forgotPass")
const resetPassword = require("./resetPass")

module.exports = {
  registro: moduloRegistro.registerUser,
  login: moduloLogin.loginUser,
  perfil: moduloPerfil.perfilUser,
  actualizarPerfil,
  forgotPassword,
  resetPassword
};
