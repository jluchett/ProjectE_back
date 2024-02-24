// usuariosController.js
const moduloRegistro = require("./registroUsers")
const moduloLogin = require("./loginUsers")
const moduloPerfil = require("./perfilUsers")

// Función para registrar un nuevo usuario

// Función para iniciar sesión de un usuario


// Función para obtener el perfil de un usuario autenticado

module.exports = {
  registro: moduloRegistro.registerUser,
  login: moduloLogin.loginUser,
  perfil: moduloPerfil.perfilUser
};
