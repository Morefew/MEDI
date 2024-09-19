const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const { isEmail } = require("validator");

const usuarioSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: [true, `Por favor introduzca su nombre`],
    trim: true,
  },
  primer_apellido: {
    type: String,
    required: [true, `Por favor introduzca su primero apellido`],
    trim: true,
  },
  segundo_apellido: {
    type: String,
    trim: true,
  },
  fecha_nacimiento: {
    type: Date,
    required: true,
  },
  direccion: {
    type: String,
    required: true,
  },
  telefono: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: [true, `La casilla para el correo no puede quedar vacía`],
    unique: true,
    lowercase: true,
    validate: [isEmail, "Por favor introduzca una dirección de correo válida"],
  },
  contraseña: {
    type: String,
    required: [true, `Por favor introduzca una clave válida`],
    minlength: [8, `La clave debe tener como mínimo 8 caracteres.`],
  },
  rol: {
    type: String,
    enum: ["doctor", "administrador", "paciente"],
    required: [true, `La casilla para el rol no puede quedar vacía`],
  },
  contacto_emergencia: {
    type: String,
  },
  fecha_creacion: {
    type: Date,
    default: Date.now,
  },
  ultima_sesion: {
    type: Date,
  },
});

// Middleware para encriptar la contraseña antes de guardar
usuarioSchema.pre("save", async function (next) {
  if (!this.isModified("contraseña")) return next();

  try {
    const salt = await bcrypt.genSalt(8);
    this.contraseña = await bcrypt.hash(this.contraseña, salt);
    next();
  } catch (error) {
    next(error);
  }
});

// Método para comparar contraseñas
usuarioSchema.methods.compararContraseña = async function (
  contraseñaCandidata
) {
  return bcrypt.compare(contraseñaCandidata, this.contraseña);
};

const Usuario = mongoose.model("Usuario", usuarioSchema);

module.exports = Usuario;
