//pedidosValidator.js
const Joi = require('joi');

// Esquema de validación para la solicitud de creación de un pedido
const crearPedidoSchema = Joi.object({
  id_usuario: Joi.number().integer().required(),
  estado: Joi.string().max(50).required(),
  fecha: Joi.date().required(),
  total: Joi.number().precision(2).positive().required()
});

module.exports = crearPedidoSchema;
