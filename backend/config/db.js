const mongoose = require("mongoose");
require("dotenv").config();




/**
 * Configuración de la conexión a la base de datos.
 * **Nota:** En el archivo .env, debes configurar las variables de entorno de
 * la base de datos.
 */
const url = process.env.LOCAL_URL;

try {
  mongoose.connect(url);
  console.log("MongoDb corriendo");
} catch (error) {
  console.error();
}
