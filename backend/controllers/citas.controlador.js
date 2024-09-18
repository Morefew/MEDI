/**
 * Módulo de controlador para el módulo de gestión de citas en una aplicación de gestión de consultorios médicos.
 * @module citaController
 */

const CitaModel = require("../models/cita.model");
const UsuarioModel = require("../models/usuario.model");
require("../config/db");

/**
 * Objeto que contiene los controladores para el módulo de gestión de citas.
 * @namespace controller
 */
const controller = {};

/**
 * Número máximo de citas permitidas por día.
 * @constant {number}
 */
const CITASMAX = 8;

/**
 * Función para buscar fechas disponibles para un médico en un rango de fechas.
 * @function
 * @async
 * @param {string} usuarioId - ID del médico.
 * @param {Date} fechaInicio - Fecha de inicio del rango.
 * @param {Date} fechaFin - Fecha de fin del rango.
 * @returns {Promise<string[]>} - Devuelve una promesa que resuelve en un array de fechas disponibles.
 */
const buscarFechasDisponibles = async (usuarioId, fechaInicio, fechaFin) => {
  const fechasOcupadas = await Cita.aggregate([
    {
      $match: {
        usuario_id: usuarioId,
        fecha: { $gte: fechaInicio, $lte: fechaFin },
        estado: { $in: ["confirmada", "pendiente"] },
      },
    },
    {
      $group: {
        _id: { $dateToString: { format: "%Y-%m-%d", date: "$fecha" } },
        citas: { $sum: 1 },
      },
    },
    {
      $match: {
        citas: { $gte: CITASMAX }, // Asumiendo un máximo de 8 citas por día
      },
    },
  ]);

  const fechasOcupadasSet = new Set(fechasOcupadas.map((f) => f._id));

  const todasLasFechas = [];
  for (
    let d = new Date(fechaInicio);
    d <= fechaFin;
    d.setDate(d.getDate() + 1)
  ) {
    todasLasFechas.push(d.toISOString().split("T")[0]);
  }

  const fechasDisponibles = todasLasFechas.filter(
    (fecha) => !fechasOcupadasSet.has(fecha)
  );

  return fechasDisponibles;
};

/**
 * Controlador para obtener la lista de citas.
 * @function
 * @async
 * @param {Object} req - Objeto de solicitud de Express.
 * @param {Object} res - Objeto de respuesta de Express.
 * @returns {Promise<void>} - Devuelve una promesa que resuelve en un objeto JSON con la lista de citas o un objeto JSON con el error.
 */
controller.citas = async (req, res) => {
  const citas = await CitaModel.find();
  try {
    if (!citas) {
      return res.status(404).send({ msg: "Cita no encontrada" });
    } else {
      res.status(200).json(citaBD);
    }
  } catch (error) {
    res
      .status(500)
      // const errors = controlDeErrores(error);
      .send(`${error} ---> cita con el ID: ${citaID} no encontrada`);
  }
};

/**
 * Controlador para crear una nueva cita.
 * @function
 * @async
 * @param {Object} req - Objeto de solicitud de Express.
 * @param {Object} res - Objeto de respuesta de Express.
 * @returns {Promise<void>} - Una promesa que resuelve en un objeto JSON con la nueva cita o un objeto JSON con el error.
 */
controller.crearCita = async (req, res) => {
  const {
    paciente_id,
    medico_id,
    fecha,
    hora,
    motivo,
    estado,
    notificaciones,
  } = req.body;

  try {
    const cita = await new CitaModel({
      paciente_id,
      medico_id,
      fecha,
      hora,
      motivo,
      estado,
      notificaciones,
    }).save();
    // respuesta JSON. Se puede usar como notificacion:
    res.status(201).json(cita);
  } catch (error) {
    // const errors = controlDeErrores(error);
    res.status(400).json({ error: error.message });
  }
};

/**
 * Controlador para obtener detalles de una cita específica.
 * @function
 * @async
 * @param {Object} req - Objeto de solicitud de Express.
 * @param {Object} res - Objeto de respuesta de Express.
 * @returns {Promise<void>} - Una promesa que resuelve en una vista renderizada con los detalles de la cita o un mensaje de error.
 */
controller.unicaCita = async (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({ error: "Se requiere el ID de la Cita" });
  }

  try {
    const cita = await CitaModel.findById(id);

    if (!cita) {
      return res.status(404).json({ error: "Cita no encontrada" });
    }

    res.status(200).json(cita);
  } catch (error) {
    console.error("Error al buscar la cita:", error);
    // const errors = controlDeErrores(error);
    res.status(500).json({ error: "Error al buscar la cita" });
  }
};

/**
 * Controlador para actualizar los detalles de una cita específica.
 * @function
 * @async
 * @param {Object} req - Objeto de solicitud de Express.
 * @param {Object} res - Objeto de respuesta de Express.
 * @returns {Promise<void>} - Una promesa que resuelve en una redirección a la página de citas o un mensaje de error.
 */

controller.actualizarCita = async (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({ error: "Se requiere el ID de la Cita" });
  }

  try {
    const citaActualizada = await CitaModel.findByIdAndUpdate(
      id,
      { $set: req.body },
      { new: true, runValidators: true }
    );

    if (!citaActualizada) {
      return res.status(404).json({ error: "Cita no encontrada" });
    }

    res.json(citaActualizada);
  } catch (error) {
    console.error("Error al actualizar la cita:", error);
    // const errors = controlDeErrores(error);
    res.status(500).json({ error: "Error al actualizar la cita" });
  }
};

/**
 * Controlador para cancelar una cita existente.
 * @function
 * @async
 * @param {Object} req - Objeto de solicitud de Express.
 * @param {Object} res - Objeto de respuesta de Express.
 * @returns {Promise<void>} - Devuelve una promesa que resuelve en una respuesta HTTP indicando si la cita fue cancelada o un error.
 */
controller.eliminarCita = async (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({ error: "Se requiere el ID de la Cita" });
  }

  try {
    const resultado = await CitaModel.findByIdAndDelete(id);

    if (!resultado) {
      return res.status(404).json({ error: "Cita no encontrada" });
    }

    res.status(200).json(resultado);
  } catch (error) {
    console.error("Error al eliminar la cita:", error);
    // const errors = controlDeErrores(error);
    res.status(500).json({ error: "Error al eliminar la cita" });
  }
};

// TODO - citas del Paciente
controller.citasPaciente = async (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({ error: "Se requiere el ID del Paciente" });
  }

  try {
    const citas = await CitaModel.findOne();

    if (!citas) {
      return res.status(404).json({ error: "Cita no encontrada" });
    }

    res.status(200).json(citas);
  } catch (error) {
    console.error("Error al buscar la cita:", error);
    // const errors = controlDeErrores(error);
    res.status(500).json({ error: "Error al buscar la cita" });
  }
};

/**
 * Controlador para obtener las fechas disponibles para un médico específico.
 * @function
 * @async
 * @param {Object} req - Objeto de solicitud de Express.
 * @param {Object} res - Objeto de respuesta de Express.
 * @returns {Promise<void>} - Devuelve una promesa que resuelve en una respuesta HTTP con las fechas disponibles o un error.
 */
controller.citasDisponiblesDoctor = async (req, res) => {
  const { doctorId, fechaInicio, fechaFin } = req.query;

  // Validar que todos los parámetros necesarios estén presentes
  if (!doctorId || !fechaInicio || !fechaFin) {
    return res.status(400).json({ error: "Faltan parámetros requeridos" });
  }

  // Convertir las fechas de string a objetos Date
  const fechaInicioDate = new Date(fechaInicio);
  const fechaFinDate = new Date(fechaFin);

  // Comprobar que las fechas son válidas
  if (isNaN(fechaInicioDate.getTime()) || isNaN(fechaFinDate.getTime())) {
    return res.status(400).json({ error: "Fechas inválidas" });
  }

  // Validar el doctorId
  try {
    const usuarioSolicitado = await UsuarioModel.findOne({
      _id: doctorId,
      rol: "doctor",
    });
    if (!usuarioSolicitado) {
      res.status(404).send({ mensaje: "Doctor no encontrado" });
    }
  } catch (error) {
    res.status(500).send(`Error al buscar al doctor: ${error.message}`);
  }

  // Buscar fechas disponibles

  try {
    const fechasDisponibles = await buscarFechasDisponibles(
      doctorId,
      rangoInicio,
      rangoFin
    );
    res.json(fechasDisponibles);
  } catch (error) {
    console.error("Error al buscar fechas disponibles:", error);
    res.status(500).json({ error: "Error al buscar fechas disponibles" });
  }
};

// POST: Enviar recordatorio de cita
// router.post("/citas/:id/notificacion", citaController.notificarCita);

// Función auxiliar para el control de errores
// function controlDeErrores(error) {
// }

module.exports = controller;
