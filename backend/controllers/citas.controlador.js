/**
 * Módulo de controlador para el módulo de gestión de citas en una aplicación de gestión de consultorios médicos.
 * @module citaController
 */

const CitaModel = require("../models/cita.model");
const UsuarioModel = require("../models/usuario.model");
const mongoose = require("mongoose");
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

const buscarFechasDisponibles = async (doctorId, fechaInicio, fechaFin) => {
  console.log("Doctor ID:", doctorId);
  console.log("Fecha Inicio:", fechaInicio);
  console.log("Fecha Fin:", fechaFin);

  const citasProgramadas = await CitaModel.aggregate([
    {
      $match: {
        doctor_id: new mongoose.Types.ObjectId(doctorId),
        fecha: {
          $gte: new Date(fechaInicio),
          $lte: new Date(fechaFin),
        },
        estado: { $in: ["confirmada", "pendiente"] },
      },
    },
    {
      $group: {
        _id: { $dateToString: { format: "%Y-%m-%d", date: "$fecha" } },
        citas: { $sum: 1 },
      },
    },
  ]);

  console.log("Citas Programadas:", citasProgramadas);

  const citasProgramadasMap = new Map(
    citasProgramadas.map((c) => [c._id, c.citas])
  );

  console.log("Mapa de Citas Programadas:", [...citasProgramadasMap.entries()]);

  const fechasDisponibles = [];
  for (
    let d = new Date(fechaInicio);
    d <= new Date(fechaFin);
    d.setDate(d.getDate() + 1)
  ) {
    const fechaStr = d.toISOString().split("T")[0];
    const citasEnFecha = citasProgramadasMap.get(fechaStr) || 0;
    if (citasEnFecha < 8) {
      fechasDisponibles.push(fechaStr);
    }
  }

  console.log("Fechas Disponibles:", fechasDisponibles);

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
  const citas = await CitaModel.aggregate([
    {
      $lookup: {
        from: "usuarios",
        localField: "paciente_id",
        foreignField: "_id",
        as: "paciente",
      },
    },
    {
      $unwind: "$usuarios",
    },
    {
      $group: {
        id: "$_id",
        Nombre: { $first: "$nombre" },
        Apellido: { $first: "$primer_apellido" },
      },
    },
  ]);
  try {
    if (!citas) {
      return res.status(404).send({ msg: "Cita no encontrada" });
    } else {
      res.status(200).json(citas);
    }
  } catch (error) {
    res
      .status(500)
      // const errors = controlDeErrores(error);
      .send(`${error} ---> citas no encontrada`);
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
  console.log(req.body);
  const {
    paciente_id,
    doctor_id,
    fecha,
    hora,
    motivo,
    estado,
    notificaciones,
  } = req.body;

  try {
    const cita = await new CitaModel({
      paciente_id,
      doctor_id,
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
  const { _id } = req.body;

  if (!_id) {
    return res.status(400).json({ error: "Se requiere el ID de la Cita" });
  }

  console.log(_id);

  try {
    const cita = await CitaModel.findById(_id);

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
  const { _id, ...datos } = req.body;
  console.log("ID de la cita a actualizar:", _id);
  console.log("Datos de actualización:", datos);

  if (!_id) {
    return res.status(400).json({ error: "Se requiere el ID de la Cita" });
  }

  try {
    const resultado = await CitaModel.updateOne(
      { _id: _id },
      {
        $set: datos,
        $currentDate: { updatedAt: true },
      },
      { runValidators: true }
    );

    console.log("Resultado de la actualización:", resultado);

    if (resultado.matchedCount === 0) {
      return res.status(404).json({ error: "Cita no encontrada" });
    }

    if (resultado.modifiedCount === 0) {
      return res
        .status(200)
        .json({ message: "No se realizaron cambios en la cita" });
    }

    // Obtener la cita actualizada para enviarla en la respuesta
    const citaActualizada = await CitaModel.findById(_id);
    res.json(citaActualizada);
  } catch (error) {
    console.error("Error al actualizar la cita:", error);
    res
      .status(500)
      .json({ error: "Error al actualizar la cita", details: error.message });
  }
};

/**
 * Controlador para eliminar una cita existente.
 * @function
 * @async
 * @param {Object} req - Objeto de solicitud de Express.
 * @param {Object} res - Objeto de respuesta de Express.
 * @returns {Promise<void>} - Devuelve una promesa que resuelve en una respuesta HTTP indicando si la cita fue cancelada o un error.
 */
controller.eliminarCita = async (req, res) => {
  const { _id } = req.body;

  if (!_id) {
    return res.status(400).json({ error: "Se requiere el ID de la Cita" });
  }

  try {
    const resultado = await CitaModel.findByIdAndDelete(_id);

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

/**
 * Controlador para obtener todos los tipos de citas relacionadas a paciente específico.
 * @function
 * @async
 * @param {Object} req - Objeto de solicitud de Express.
 * @param {Object} res - Objeto de respuesta de Express.
 * @returns {Promise<void>} - Devuelve una promesa que resuelve en una respuesta HTTP con las citas del paciente o un error.
 */
controller.citasPaciente = async (req, res) => {
  const { paciente_id } = req.body;

  // Validando que el ID pertenece a un Paciente
  if (!paciente_id) {
    return res.status(400).json({ error: "Se requiere el ID del Paciente" });
  }

  try {
    const paciente = await UsuarioModel.findOne({
      _id: paciente_id,
      rol: "paciente",
    });

    if (!paciente) {
      return res
        .status(404)
        .json({ error: "El Id proporcionado no pertenece a un paciente" });
    }
  } catch (error) {
    console.error("Error al validar paciente:", error);
    // const errors = controlDeErrores(error);
    res.status(500).json({ error: "Error al comprobar el paciente" });
  }

  // Buscar y devolver las citas del paciente
  try {
    const citas = await CitaModel.findOne({
      paciente_id: paciente_id,
    });

    if (!citas) {
      return res.status(404).json({ error: "El paciente no tiene citas" });
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
  const { doctor_id, fechaInicio, fechaFin } = req.body;

  // Validar que todos los parámetros necesarios estén presentes

  // Comprobar que las fechas son válidas

  // Validar el doctorId

  // Buscar fechas disponibles
};

// POST: Enviar recordatorio de cita
// router.post("/citas/:id/notificacion", citaController.notificarCita);

// Función auxiliar para el control de errores
// function controlDeErrores(error) {
// }

module.exports = controller;
