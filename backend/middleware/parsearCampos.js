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
