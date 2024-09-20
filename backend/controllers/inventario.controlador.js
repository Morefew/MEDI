require("../config/db");
const inventarioModel = require("../models/inventario.model");

const controller = {};

const queryAll = async () => {
  try {
    return await inventarioModel.find();
  } catch (error) {
    console.log(error);
    return [];
  }
};

const queryByID = async (id) => {
  try {
    return await inventarioModel.findById(id);
  } catch (error) {
    console.log(error);
    return null;
  }
};

controller.getInventario = async (req, res) => {
  const inventarioBD = await queryAll();
  res.status(200).json(inventarioBD);
};

controller.getOneInventario = async (req, res) => {
  const id = req.params.id;
  const inventarioBD = await queryByID(id);
  res.status(200).json(inventarioBD);
};

controller.addInventario = async (req, res) => {
  const inventario = new inventarioModel(req.body);

  try {
    await inventario.save();
    res.status(201).json(inventario);
  } catch (error) {
    res.status(500).send({ error: error });
  }
};

controller.updateInventario = async (req, res) => {
  try {
    const inventarioActualizado = await inventarioModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!inventarioActualizado) {
      return res.status(404).json({ message: "Producto no encontrado" });
    }

    res.json(inventarioActualizado);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

controller.deleteInventario = async (req, res) => {
  try {
    const inventarioEliminado = await inventarioModel.findByIdAndDelete(
      req.params.id
    );
    if (!inventarioEliminado)
      return res.status(404).json({ message: "Producto no encontrado" });
    res.status(200).json({ message: "Producto eliminado con éxito" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
module.exports = controller;
