// productosController.js

// Importación de los módulos de funciones específicas
const crearProducto = require('./crearProducto');
const listarProductos = require('./listarProductos');
const obtenerProducto = require('./obtenerProducto');
const actualizarProducto = require('./actualizarProducto');
const eliminarProducto = require('./eliminarProducto');

// Exportación de las funciones del controlador
module.exports = {
  crearProducto,
  listarProductos,
  obtenerProducto,
  actualizarProducto,
  eliminarProducto,
};
