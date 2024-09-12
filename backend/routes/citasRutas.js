const express = require("express");
require("../middleware/authMiddleware");
const router = express.Router();
const citaController = require("../controllers/citas.controlador");

// GET: Listar citas
router.get("/citas", citaController.citas);

// POST: Crear nueva cita
router.post("/crear-cita", citaController.crearCita);

// GET: Obtener detalles de una cita
router.get("/citas/:id", citaController.UnicaCita);

// PUT: Actualizar información de una cita
router.put("/citas/:id", citaController.actualizarCita);

// DELETE: Cancelar una cita
router.delete("/citas/:id", citaController.eliminarCita);

// POST: Enviar recordatorio de cita
router.post("/citas/:id/notificacion", citaController.eliminarCita);

// router.use(authMiddleware);

module.exports = router;
