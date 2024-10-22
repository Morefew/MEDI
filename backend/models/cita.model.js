const mongoose = require("mongoose");

const citaMedicaSchema = new mongoose.Schema(
  {
    especialista: {
      type: String,
      required: [true, "Por favor indique el nombre del Doctor para la cita"],
    },
    fecha: {
      type: Date,
      required: [true, "Por favor indique una fecha para la cita"],
    },
    hora: {
      type: String,
      required: [true, "Por favor indique una hora para la cita"],
    },
    tipo_servicio: {
      type: String,
      required: [
        true,
        "Por favor indique el tipo de servicio a solicitar de la cita",
      ],
      trim: true,
    },
    estado: {
      type: String,
      enum: ["confirmada", "pendiente"],
      default: "pendiente",
    },
    paciente_nombre: {
      type: String,
      trim: true,
      required: [true, "Por favor seleccione el paciente para la cita"],
    },
    paciente_edad: {
      type: Number,
      required: [true, "Por favor indique la edad del paciente"],
    },
    paciente_nacionalidad: {
      type: String,
      trim: true,
      required: [true, "Por favor indique la nacionalidad del paciente"],
    },
    paciente_cedula: {
      type: String,
      trim: true,
      required: [true, "Por favor indique la cedula del paciente"],
    },
    paciente_genero: {
      type: String,
      trim: true,
      required: [true, "Por favor indique el genero del paciente"],
    },
    paciente_direccion: {
      type: String,
      trim: true,
      required: [true, "Por favor indique la dirección del paciente"],
    },
    tipo_paciente: {
      type: String,
      trim: true,
    },
    solicitante_nombre: {
      type: String,
      trim: true,
      required: [
        true,
        "Por favor indique el nombre de quien solicita el servicio al paciente",
      ],
    },
    solicitante_apellido: {
      type: String,
      trim: true,
      required: [
        true,
        "Por favor indique el apellido de quien solicita el servicio al paciente",
      ],
    },
    afiliacion_ars: {
      type: String,
      trim: true,
    },
    centro_nombre: {
      type: Number,
      required: [true, "Por favor indique el nombre del centro para la cita"],
    },
  },
  {
    timestamps: true,
  }
);

const citaMedica = mongoose.model("citas", citaMedicaSchema);

module.exports = citaMedica;
