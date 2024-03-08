const express = require('express');
const router = express.Router();
const pedidosController = require('../controllers/pedidos/pedidosController');
const auth = require('../middleware/auth');
// Ruta para registrar un pedido
router.post('/crear', pedidosController.registrarPedido);


module.exports = router;