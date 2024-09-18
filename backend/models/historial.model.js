const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Definir el esquema para la historia clínica
const historiaClinicaSchema = new Schema({
  // paciente_id: { type: Schema.Types.ObjectId, required: true, ref: 'Paciente' }, // Referencia al paciente
  paciente_id: {type: Number},
  consultas: [
    {
      fecha: { type: Date, required: true }, 
      medico: { type: String, required: true }, 
      notas: { type: String } 
    }
  ],
  diagnosticos: [{ type: String }], 
  tratamientos: [{ type: String }], 
  // recetas: [{ type: Schema.Types.ObjectId, ref: 'Receta' }], // Referencias a las recetas electrónicas
  documentos: [{ type: String }], 
  ultima_actualizacion: { type: Date, default: Date.now } 
});

// Crear el modelo basado en el esquema
const HistoriaClinica = mongoose.model('HistoriaClinica', historiaClinicaSchema);

module.exports = HistoriaClinica;
