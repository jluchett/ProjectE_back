const express = require("express");
const router = express.Router();
const metodosController = require("../controllers/metodoPago/metodosController");

router.post("/crar", metodosController.crearMetodo);
router.get('/listar',metodosController.listarMetodos);
router.put('/update/:id',metodosController.updateMetodo);
router.delete('/delete/:id',metodosController.deleteMetodo);
router.get('/get/:id',metodosController.obtenerMetodo);

module.exports = router;
