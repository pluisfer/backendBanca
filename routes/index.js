const express = require("express");
const router = express.Router();
const { welcome, login, crearCuenta, cerrarCuenta, cerrarCuentaPrevio } = require("../controllers/task.controllers");

const users = [
  {
    nombre: "Luis",
    password: "password",
  },
];

router.get("/", welcome);

router.post("/login", login);
router.post("/crearCuenta", crearCuenta);
router.post("/cerrarCuenta", cerrarCuenta);
router.post("/cerrarCuentaPrevio", cerrarCuentaPrevio);

module.exports = router;
