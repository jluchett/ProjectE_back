const express = require('express');
const router = express.Router();
const pedidosController = require('../controllers/pedidos/pedidosController');
const auth = require('../middleware/auth');

// Ruta para registrar un pedido
router.post('/crear', pedidosController.registrarPedido);
// Ruta para consultar todos los pedidos
router.get('/listar', pedidosController.listarPedidos);
// Ruta para obtener pedido por id
router.get('/obtener/:id',pedidosController.obtenerPedido);

module.exports = router;