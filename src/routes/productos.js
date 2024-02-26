// productos.js - archivo de rutas para los productos
const express = require('express');
const router = express.Router();
const productosController = require('../controllers/productos/productosController');
const auth = require('../middleware/auth');

// Ruta para registrar un producto
router.post('/crear', productosController.crearProducto);

// Ruta para actualizar un producto
router.put('/update/:id', auth, productosController.actualizarProducto);

// Ruta protegida para obtener listado de productos
router.get('/listar', auth, productosController.listarProductos);

// Ruta para obtener un producto por su ID
router.get('/get/:id', productosController.obtenerProducto);

module.exports = router;
