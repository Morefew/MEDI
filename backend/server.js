const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const citasRouter = require("./routes/citasRutas");
const historialMedRouter = require("./routes/historialMedRutas");

require("dotenv").config();
require("./config/db");

const app = express();

app.use(cookieParser());

app.use(bodyParser.urlencoded({ extended: true }));

// SERVER TEST
app.get("/", (req, res) => {
  res.send("Hola Mundo SERVIDOR CORRIENDO desde Express");
});

app.use(express.json);

app.use(citasRouter);
app.use(historialMedRouter);

const serverPort = process.env.SERVER_PORT;
app.listen(serverPort, () => {
  console.log(`Servidor corriendo en puerto ${serverPort}`);
});
