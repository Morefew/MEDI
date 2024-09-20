const mongoose = require("mongoose");
require("dotenv").config();

//Conexion a BD Local
// const url = process.env.LOCAL_URL;

//Conexion BD Atlas
const url = process.env.ATLAS_URL;

console.log(url);

try {
  mongoose.connect(urlWeb);
  console.log("MongoDb corriendo");
} catch (error) {
  console.error();
}
