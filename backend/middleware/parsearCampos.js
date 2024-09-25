/**
 * Middleware para parsear los campos de la solicitud y convertirlos al formato adecuado.
 * @function
 * @param {Object} req - Objeto de solicitud de Express.
 * @param {Object} res - Objeto de respuesta de Express.
 * @param {function} next - Función para pasar al siguiente middleware en la cadena.
 * @returns {void}
 */
const parserCampos = (req, res, next) => {
  if (req.body.paciente_id && req.body.paciente_id.$oid) {
    req.body.paciente_id = req.body.paciente_id.$oid;
  }
  if (req.body.doctor_id && req.body.doctor_id.$oid) {
    req.body.doctor_id = req.body.doctor_id.$oid;
  }
  if (req.body.fecha && req.body.fecha.$date) {
    req.body.fecha = new Date(req.body.fecha.$date);
  }
  next();
};

module.exports = parserCampos;
