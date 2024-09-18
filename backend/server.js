const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const citasRouter = require("./routes/citas.rutas");
const historialMedRouter = require("./routes/historialMed.rutas");
const usuarioRouter = require("./routes/usuario.rutas");

require("dotenv").config();
require("./config/db");

const app = express();

app.use(cookieParser());

app.use(express.json());

// app.use(bodyParser.urlencoded({ extended: true }));

// SERVER TEST
app.get("/", (req, res) => {
  res.send("Hola Mundo SERVIDOR CORRIENDO desde Express");
});

app.use(usuarioRouter);
app.use(citasRouter);
app.use(historialMedRouter);

const serverPort = process.env.SERVER_PORT;
app.listen(serverPort, () => {
  console.log(`Servidor corriendo en puerto ${serverPort}`);
});
