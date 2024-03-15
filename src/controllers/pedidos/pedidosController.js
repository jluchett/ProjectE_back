const registrarPedido = require('../pedidos/registrarPedido');
const listarPedidos = require('../pedidos/listarPedidos');
const obtenerPedido = require('./obtenerPedido');
const actualizarPedido = require('../pedidos/actualizarPedido')
const eliminarPedido = require('./eliminarPedido');

module.exports = {
    registrarPedido,
    listarPedidos,
    obtenerPedido,
    actualizarPedido,
    eliminarPedido,
}