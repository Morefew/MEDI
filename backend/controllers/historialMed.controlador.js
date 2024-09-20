require("../config/db");
const historialModel = require("../models/historial.model");

const controller = {};

const queryAll = async () => {
  try {
    return await historialModel.find();
  } catch (error) {
    console.log(error);
    return [];
  }
};

const queryByID = async (id) => {
  try {
    return await historialModel.findById(id);
  } catch (error) {
    console.log(error);
    return null;
  }
};

controller.getHistorial = async (req, res) => {
  
  const historialClinicoBD = await queryAll();
  res.status(200).json(historialClinicoBD);
};


controller.getOneHistorial = async (req, res) => {
  
  const id = req.params.id
  const historialClinicoBD = await queryByID(id);
  res.status(200).json(historialClinicoBD);
};

controller.addHistorial = async (req, res) => {

  
  const historial = new historialModel(req.body)
  

  try {
    await historial.save() 
    res.status(201).json(historial)
  } catch (error) {
    res.status(500).send({error:error})
  }
};

controller.updateHistorial = async (req, res) => {
  

  try {
    const pacienteActualizado = await historialModel.findByIdAndUpdate(
      req.params.id, 
      req.body, 
      { new: true, runValidators: true }
    );
    
    if (!pacienteActualizado) {
      return res.status(404).json({ message: 'Paciente no encontrado' });
    }
    
    res.json(pacienteActualizado);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

controller.deleteHistorial = async (req, res) => {
  try {
    const historiaEliminada = await historialModel.findByIdAndDelete(req.params.id);
    if (!historiaEliminada) return res.status(404).json({ message: 'Historia no encontrada' });
    res.status(200).json({ message: 'Historia eliminada con éxito' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
module.exports = controller;
