const express = require("express");
const router = express.Router();
const categoriasController = require("../controllers/categorias/categoriasController");
const auth = require("../middleware/auth");

router.post("/crear", categoriasController.crearCategoria);

module.exports = router;
