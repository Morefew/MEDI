const express = require("express");
const router = express.Router();
const inventarioController = require("../controllers/inventario.controlador");

router.get("/api/inventario", inventarioController.getInventario);

router.get("/api/inventario/:id", inventarioController.getOneInventario);

router.post("/api/inventario", inventarioController.addInventario);

router.patch("/api/inventario/:id",inventarioController.updateInventario);

router.delete("/api/inventario/:id", inventarioController.deleteInventario);





module.exports = router;
