/**
 * Módulo de controlador para el módulo de gestión de citas en una aplicación de gestión de consultorios médicos.
 * @module citaController
 */

const citaModel = require("../models/cita.model");
require("../config/db");

const controller = {};

/**
 * Controlador para obtener la lista de citas.
 * @function
 * @async
 * @param {Object} req - Objeto de solicitud de Express.
 * @param {Object} res - Objeto de respuesta de Express.
 * @returns {Promise<void>} - Devuelve una promesa que resuelve en un objeto JSON con la lista de citas o un objeto JSON con el error.
 */

// TO-DO actualizar el @return de la documentacion

controller.citas = async (req, res) => {
  const citasBD = await queryAll();
  try {
    if (!citasBD) {
      return res.status(404).send({ msg: "Cita no encontrada" });
    } else {
      res.status(200).json(citaBD);
    }
  } catch (error) {
    res
      .status(500)
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
  console.log(req.body);

  const {
    paciente_id,
    medico_id,
    fecha,
    hora,
    motivo,
    estado,
    notificaciones,
  } = req.body;

  const nuevaCita = new citaModel({
    paciente_id,
    medico_id,
    fecha,
    hora,
    motivo,
    estado,
    notificaciones,
  });

  try {
    const cita = await nuevaCita.save();
    // res.redirect("/citas");
    // respuesta JSON. Se puede usar como notificacion:
    res.status(201).json(cita);
  } catch (error) {
    // const errors = controlDeErrores(error);
    res.status(400).json({ error });
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
  const citaID = req.params.id;
  try {
    const citaRequested = await citaModel.findOne({ citaID });
    if (!citaRequested) {
      return res.status(404).send({ msg: "Cita no encontrada" });
    } else {
      res.status(200).json(citaRequested);
    }
  } catch (error) {
    res
      .status(500)
      .send(`${error} ---> cita con el ID: ${citaID} no encontrada`);
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
  if (!req.params.id) {
    return res.status(400).send("Se requiere el ID del Cita");
  }

  const id = req.params.id;
  const filter = { _id: id };

  const {
    paciente_id,
    medico_id,
    fecha,
    hora,
    motivo,
    estado,
    notificaciones,
  } = req.body;

  const nuevaCita = new citaModel({
    paciente_id,
    medico_id,
    fecha,
    hora,
    motivo,
    estado,
    notificaciones,
  });

  try {
    const nuevosDatos = await citaModel
      .findOneAndReplace(filter, nuevaCita, { new: true })
      .lean();
    if (!nuevosDatos) {
      return res.status(404).send("Cita no encontrada");
    }
    res.redirect(`/citas`);
  } catch (error) {
    res.status(500).send(error);
    console.log(error);
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
  const _id = req.params.id;

  try {
    const cita = await citaModel.deleteOne({ _id });

    if (!cita) {
      return res.status(404).send("Cita no encontrado");
    }
    res.send("Cita eliminado");
  } catch (error) {
    res.status(500).send(error);
  }
};

// POST: Enviar recordatorio de cita
router.post("/citas/:id/notificacion", citaController.eliminarCita);

// Función auxiliar para el control de excepciones
// function controlDeErrores(error) {
// }

module.exports = controller;
