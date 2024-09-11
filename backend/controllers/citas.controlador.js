const citaModel = require("../models/cita.model");

const controller = {};

controller.getCita = async (req, res) => {
  await res.send("Hola Mundo CITAS desde Express");
};

module.exports = controller;
