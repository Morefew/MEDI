const UsuarioModel = require("../models/usuario.model");

require("../config/db");

const controller = {};

// Controlador para obtener todos los usuarios
controller.usuarios = async (req, res) => {
  try {
    const usuarios = await UsuarioModel.find();
    res.json(usuarios);
  } catch (error) {
    res.status(500).json({
      mensaje: "Error al obtener los usuarios",
      error: error.message,
    });
  }
};

// Controlador para obtener todos los usuarios de acuerdo al rol
controller.usuarioRol = async (req, res) => {
  const { rol } = req.query;

  try {
    const usuarios = await UsuarioModel.find({ rol });
    res.json(usuarios);
  } catch (error) {
    res.status(500).json({
      mensaje: "Error al obtener los usuarios por rol",
      error: error.message,
    });
  }
};

controller.usuarioID = async (req, res) => {
  const userID = req.params.id;
  try {
    const userRequested = await UsuarioModel.findById(userID).exec();
    if (!userRequested) {
      return res.status(404).send({ msg: "Usuario no encontrado" });
    }
  } catch (error) {
    res
      .status(500)
      .send(`${error} ---> usuario con el ID: ${userID} no encontrado`);
  }
};

controller.usuarioBorrar = async (req, res) => {
  const _id = req.params.id;

  try {
    const user = await UsuarioModel.deleteOne({ _id });

    if (user.deletedCount === 0) {
      return res.status(404).send("Usuario no encontrado");
    }
    res.send("Usuario eliminado");
  } catch (error) {
    res.status(500).send(error);
  }
};

controller.usuarioCrear = async (req, res) => {
  const {
    nombre,
    primer_apellido,
    segundo_apellido,
    fecha_nacimiento,
    direccion,
    telefono,
    email,
    contraseña,
    rol,
    contacto_emergencia,
  } = req.body;

  const newUser = new UsuarioModel({
    nombre,
    primer_apellido,
    segundo_apellido,
    fecha_nacimiento,
    direccion,
    telefono,
    email,
    contraseña,
    rol,
    contacto_emergencia,
  });

  try {
    const user = await newUser.save();
    res.status(201).json(user);
  } catch (error) {
    res.status(400).json({ errors });
  }
};

controller.updateUser = async (req, res) => {
  if (!req.params.id) {
    return res.status(400).send("Se requiere el ID del Usuario");
  }

  const id = req.params.id;
  const filter = { _id: id };

  const {
    nombre,
    primer_apellido,
    segundo_apellido,
    fecha_nacimiento,
    direccion,
    telefono,
    email,
    contraseña,
    rol,
    contacto_emergencia,
  } = req.body;

  const newUser = new UsuarioModel({
    nombre,
    primer_apellido,
    segundo_apellido,
    fecha_nacimiento,
    direccion,
    telefono,
    email,
    contraseña,
    rol,
    contacto_emergencia,
  });

  try {
    const updatedUser = await UsuarioModel.findOneAndReplace(filter, newUser, {
      new: true,
    }).lean();
    if (!updatedUser) {
      return res.status(404).send("User not found");
    }
    res.json(updatedUser);
  } catch (error) {
    res.status(500).send(error);
    console.log(error);
  }
};

module.exports = controller;
