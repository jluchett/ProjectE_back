// productosValidator.js
const Joi = require('joi');

// Esquema de validación para la solicitud de creación o actualización de un producto
const productoSchema = Joi.object({
  nombre: Joi.string().required(),
  descripcion: Joi.string().required(),
  precio: Joi.number().positive().required(),
  cantidad_disponible: Joi.number().integer().min(0).required(),
  imagen: Joi.string().uri().required()
});

module.exports = productoSchema;
