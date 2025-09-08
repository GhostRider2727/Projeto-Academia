const express = require("express");
const router = express.Router();
const treinosController = require("../controllers/treinosController");

router.get("/listar", treinosController.listar);

module.exports = router;
