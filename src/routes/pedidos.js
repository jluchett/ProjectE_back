const express = require('express');
const router = express.Router();
const pedidosController = require('../controllers/pedidos/pedidosController');
const auth = require('../middleware/auth');

// Ruta para registrar un pedido
router.post('/crear', pedidosController.registrarPedido);
// Ruta para consultar todos los pedidos
router.post('/listar', pedidosController.listarPedidos);

module.exports = router;