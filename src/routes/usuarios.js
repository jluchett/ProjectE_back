// usuarios.js - archivo de rutas para el usuario
const express = require('express');
const router = express.Router();
const usuariosController = require('../controllers/usuarios/usuariosController');
const auth = require('../middleware/auth');

// Ruta para registrar un usuario
router.post('/registro', usuariosController.registro);

// Ruta para iniciar sesión
router.post('/login', usuariosController.login);

// Ruta protegida para obtener información del usuario
router.get('/perfil', auth, usuariosController.perfil);

// Ruta protegida para obtener información del usuario
router.post('/update/:id', auth, usuariosController.actualizarPerfil);

module.exports = router;
