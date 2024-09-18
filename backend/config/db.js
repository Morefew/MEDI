const mongoose = require("mongoose");
require("dotenv").config();

const collection = process.env.DB_COLLECTION;
const dbURI = process.env.DB_URI;
const dbPort = process.env.DB_PORT;
const url = `${dbURI}:${dbPort}/${collection}`;
const urlWeb = 'mongodb+srv://medi:i6BY5XEuevPIVyNH@medi.vknwb.mongodb.net/Medi01?retryWrites=true&w=majority&appName=MEDI'

try {
  mongoose.connect(urlWeb);
  console.log("MongoDb corriendo");
} catch (error) {
  console.error();
}
