const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const citasRouter = require("./routes/citasRutas");
const historialMedRouter = require("./routes/historialMedRutas");
const inventarioRutas = require("./routes/inventarioRutas")

require("dotenv").config();
require("./config/db");
require("./config/dbInventario");

const app = express();

app.use(cookieParser());
app.use(express.json())

app.use(bodyParser.urlencoded({ extended: true }));

// SERVER TEST
app.get("/", (req, res) => {
  res.send("Hola Mundo SERVIDOR CORRIENDO desde Express");
});

app.use(citasRouter);
app.use(historialMedRouter);
app.use(inventarioRutas)

const serverPort = process.env.SERVER_PORT;
app.listen(serverPort, () => {
  console.log(`Servidor corriendo en puerto ${serverPort}`);
});
