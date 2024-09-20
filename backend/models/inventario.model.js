const mongoose = require('mongoose');

// Definición del esquema del producto
const inventarioSchema = new mongoose.Schema({

  producto: {
    type: String,
    required: true,
    trim: true, // Elimina los espacios en blanco al inicio y al final
  },
  categoria: {
    type: String,
    required: true,
    enum: ['medicamentos', 'insumos', 'otros'], // Asegura que solo se permita ciertas categorías
    trim: true,
  },
  cantidad: {
    type: Number,
    required: true,
    min: 0, // Evita cantidades negativas
  },
  umbral: {
    type: Number,
    required: true,
    min: 0, // El umbral no puede ser negativo
  },
  proveedor: {
    type: String,
    required: true,
    trim: true,
  },
  fecha_reabastecimiento: {
    type: Date,
    required: true,
    default: Date.now, // Por defecto, se asigna la fecha actual
  },
  caducidad: {
    type: Date, // Campo opcional ya que no todos los productos tienen caducidad
  },
});

// Crear el modelo basado en el esquema
const Inventario = mongoose.model('Inventario', inventarioSchema);

module.exports = Inventario;

