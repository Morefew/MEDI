const jwt = require("jsonwebtoken");
const User = require("../models/usuario.model");
require("../config/db");

/**
 * Middleware para verificar si la sesión está activada y si el token de autenticación es válido.
 * @function
 * @param {Object} req - Objeto de solicitud de Express.
 * @param {Object} res - Objeto de respuesta de Express.
 * @param {Function} next - Función para pasar al siguiente middleware.
 * @returns {Promise<void>} - Devuelve una promesa que resuelve en una respuesta HTTP con un mensaje de error o una redirección a la página de inicio de sesión si la sesión no está activada.
 */
const authMiddleware = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.id);

    if (!req.user) {
      return res.status(401).json({ error: "No se encontró el usuario" });
    }

    if (req.user.active === false) {
      return res.status(401).json({ error: "La sesión ha expirado" });
    }

    next();
  } catch (error) {
    console.error("Error al verificar la autenticación:", error);
    res.status(500).json({ error: "Error al verificar la autenticación" });
  }
};

/**
 * Middleware para asignar la sesión a la solicitud.
 * @function
 * @param {Object} req - Objeto de solicitud de Express.
 * @param {Object} res - Objeto de respuesta de Express.
 * @param {Function} next - Función para pasar al siguiente middleware.
 * @returns {Promise<void>} - Devuelve una promesa que resuelve en una respuesta HTTP con un mensaje de error o una redirección a la página de inicio de sesión si la sesión no está activada.
 */
const setSession = (req, res, next) => {
  req.session.user = req.user;
  next();
};

module.exports = authMiddleware;