/**
 * Módulo de rutas para la gestión de citas en una aplicación de gestión de consultorios médicos.
 * @module CitaRoutes
 */

const express = require("express");
require("../middleware/authMiddleware");
const router = new express.Router();
const citaController = require("../controllers/citas.controlador");
const parsearCampos = require("../middleware/parsearCampos");

/**
 * Ruta para obtener la lista de citas.
 * @name GET/citas
 * @function
 * @memberof module:CitaRoutes
 * @inner
 * @param {string} path - Ruta de la API.
 * @param {function} middleware - Controlador para manejar la solicitud.
 */
router.get("/api/citas", citaController.citas);

/**
 * Ruta para obtener la lista citas de un centro.
 * @name GET/api/citas/centro
 * @function
 * @memberof module:CitaRoutes
 * @inner
 * @param {string} path - Ruta de la API.
 * @param {function} middleware - Controlador para manejar la solicitud.
 */
router.get("/api/citas/centro", citaController.citasCentro);

/**
 * Ruta para obtener las citas de un especialista específico.
 * @name GET/api/citas/especialista
 * @function
 * @memberof module:CitaRoutes
 * @inner
 * @param {string} path - Ruta de la API.
 * @param {function} middleware - Controlador para manejar la solicitud.
 */
router.get("/api/citas/especialista", citaController.citasEspecialista);

/**
 * Ruta para obtener la lista de especialistas.
 * @name GET/api/especialistas
 * @function
 * @memberof module:CitaRoutes
 * @inner
 * @param {string} path - Ruta de la API.
 * @param {function} middleware - Controlador para manejar la solicitud.
 */
router.get("/api/especialistas", citaController.especialistas);

/**
 * Ruta para obtener la lista de centros.
 * @name GET/api/centros
 * @function
 * @memberof module:CitaRoutes
 * @inner
 * @param {string} path - Ruta de la API.
 * @param {function} middleware - Controlador para manejar la solicitud.
 */
router.get("/api/centros", citaController.centros);

/**
 * Ruta para crear una nueva cita.
 * @name POST/crear-cita
 * @function
 * @memberof module:CitaRoutes
 * @inner
 * @param {string} path - Ruta de la API.
 * @param {function} middleware - Controlador para manejar la solicitud.
 */
router.post("/api/cita/crear", parsearCampos, citaController.crearCita);

/**
 * Ruta para obtener los detalles de una cita específica.
 * @name GET/citas/:id
 * @function
 * @memberof module:CitaRoutes
 * @inner
 * @param {string} path - Ruta de la API.
 * @param {function} middleware - Controlador para manejar la solicitud.
 */
router.get("/api/cita/detalles", citaController.unicaCita);

/**
 * Ruta para actualizar la información de una cita existente.
 * @name PUT/citas/:id
 * @function
 * @memberof module:CitaRoutes
 * @inner
 * @param {string} path - Ruta de la API.
 * @param {function} middleware - Controlador para manejar la solicitud.
 */
router.put("/api/cita/actualizar", citaController.actualizarCita);

/**
 * Ruta para cancelar una cita existente.
 * @name DELETE/citas/:id
 * @function
 * @memberof module:CitaRoutes
 * @inner
 * @param {string} path - Ruta de la API.
 * @param {function} middleware - Controlador para manejar la solicitud.
 */
router.delete("/api/cita/eliminar", citaController.eliminarCita);

/**
 * Ruta para enviar un recordatorio de cita.
 * @name POST/citas/:id/notificacion
 * @function
 * @memberof module:CitaRoutes
 * @inner
 * @param {string} path - Ruta de la API.
 * @param {function} middleware - Controlador para manejar la solicitud.
 */

// router.post("/citas/:id/notificacion", citaController.notificarCita);

/**
 * Ruta para obtener todos los tipos de citas relacionadas a un paciente específico.
 * @name GET/api/citas/fechas-disponibles/paciente/:id
 * @function
 * @memberof module:CitaRoutes
 * @inner
 * @param {string} path - Ruta de la API.
 * @param {function} middleware - Controlador para manejar la solicitud.
 */
router.get("/api/cita/paciente", citaController.citasPaciente);

/**
 * Ruta para obtener las fechas disponibles para un médico específico.
 * @name GET/api/citas/disponibles
 * @function
 * @memberof module:CitaRoutes
 * @inner
 * @param {string} path - Ruta de la API.
 * @param {function} middleware - Controlador para manejar la solicitud.
 */
router.get("/api/citas/disponibles", citaController.citasDisponiblesDoctor);

// router.use(authMiddleware);

module.exports = router;
