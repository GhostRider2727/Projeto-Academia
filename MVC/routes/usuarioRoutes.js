const express = require("express");
const router = express.Router();
const usuarioController = require("../controllers/usuarioController");

router.get("/listar", usuarioController.listar);

module.exports = router;
