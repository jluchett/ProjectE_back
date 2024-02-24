// productos.js - archivo de rutas para los productos
const express = require('express');
const router = express.Router();
const productosController = require('../controllers/productos/productosController');
const auth = require('../middleware/auth');

// Ruta para registrar un usuario
router.post('/crear', productosController.crearProducto);

// Ruta para iniciar sesión
//router.post('/login', usuariosController.login);

// Ruta protegida para obtener información del usuario
router.get('/listar', productosController.listarProductos);

module.exports = router;
