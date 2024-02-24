// usuariosController.js
const moduloRegistro = require("./registroUsers")
const moduloLogin = require("./loginUsers")
const moduloPerfil = require("./perfilUsers")

module.exports = {
  registro: moduloRegistro.registerUser,
  login: moduloLogin.loginUser,
  perfil: moduloPerfil.perfilUser
};
