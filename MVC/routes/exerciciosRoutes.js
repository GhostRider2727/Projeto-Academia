const express = require("express");
const router = express.Router();
const exerciciosController = require("../controllers/exerciciosController");

router.get("/listar", exerciciosController.listar);

module.exports = router;
