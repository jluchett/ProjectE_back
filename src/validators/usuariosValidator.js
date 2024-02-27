// usuariosValidator.js
const Joi = require('joi');

// Esquema de validación para la solicitud de registro de usuario
const registroUsuario = Joi.object({
  nombre: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().required(),
  direccion: Joi.string().required(),
  ciudad: Joi.string().required(),
  pais: Joi.string().required(),
  codigo_postal: Joi.string().required(),
  rol: Joi.string().required()
});

// Esquema de validación para la solicitud de registro de usuario
const updateUsuario = Joi.object({
  nombre: Joi.string().required(),
  email: Joi.string().email().required(),
  direccion: Joi.string().required(),
  ciudad: Joi.string().required(),
  pais: Joi.string().required(),
  codigo_postal: Joi.string().required()
});
module.exports = {
  registroUsuario,
  updateUsuario
};