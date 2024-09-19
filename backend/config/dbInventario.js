const mongoose = require("mongoose");
require("dotenv").config();

const collection = process.env.DB_COLLECTION;
const dbURI = process.env.DB_URI;
const dbPort = process.env.DB_PORT;
const url = `${dbURI}:${dbPort}/${collection}`;
const urlweb = 'mongodb+srv://medi:i6BY5XEuevPIVyNH@medi.vknwb.mongodb.net/MediInventario?retryWrites=true&w=majority&appName=MEDI'
//const urlWeb = 'mongodb+srv://MEDIINVENTARIO:MEDIINVENTARIO@mediinventario.01xqn.mongodb.net/MEDIINVENTARIO?retryWrites=true&w=majority&appName=MEDIINVENTARIO'

try {
  mongoose.connect(urlWeb);
  console.log("MongoDb corriendo MEDIINVENTARIO");
} catch (error) {
  console.error();
}
