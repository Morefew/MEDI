const express = require("express");
const router = new express.Router();
const historialMedController = require("../controllers/historialMed.controlador");

router.get("/api/historial-clinico", historialMedController.getHistorial);

router.get("/api/historial-clinico/:id", historialMedController.getOneHistorial);

router.post("/api/historial-clinico", historialMedController.addHistorial);

router.patch("/api/historial-clinico/:id", historialMedController.updateHistorial);

router.delete("/api/historial-clinico/:id", historialMedController.deleteHistorial);



// router.use(authMiddleware);

module.exports = router;
