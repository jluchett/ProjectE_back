//pedidosValidator.js
const Joi = require('joi');

// Esquema de validación para la solicitud de creación de un pedido
const crearPedidoSchema = Joi.object({
  id_usuario: Joi.number().integer().required(),
  fecha: Joi.date().required(),
  estado: Joi.string().max(50).required(),
  total: Joi.number().precision(10).scale(2).required()
});

module.exports = crearPedidoSchema;
