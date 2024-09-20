const express = require("express");
const router = new express.Router();
const historialMedController = require("../controllers/historialMed.controlador");

router.get("/api/historial-medico", historialMedController.getHistorial);

router.get("/historial-medico/:id", historialMedController.getOneHistorial);

router.post("/historial-medico", historialMedController.addHistorial);

router.patch("/historial-medico/:id", historialMedController.updateHistorial);

router.delete("/historial-medico/:id", historialMedController.deleteHistorial);



// router.use(authMiddleware);

module.exports = router;
