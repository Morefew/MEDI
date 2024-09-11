const express = require("express");
const router = express.Router();
const citaController = require("../controllers/citas.controlador");

router.get("/citas", citaController.getCita);

// router.use(authMiddleware);

module.exports = router;
