const express = require("express");
const router = express.Router();
const metodosController = require("../controllers/metodoPago/metodosController");

router.post("/crar", metodosController.crearMetodo);

module.exports = router;
