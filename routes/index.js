const express = require("express");
const router = express.Router();
const { welcome, login, crearCuenta, cerrarCuenta, cerrarCuentaPrevio } = require("../controllers/task.controllers");
// Guards
const { admiGuard } = require("../Guards/usuariosGuard");
const { uiGuard } = require("../Guards/usuariosGuard");
const { clienteGuard } = require("../Guards/usuariosGuard");

const users = [
  {
    nombre: "Luis",
    password: "password",
  },
];

router.get("/", welcome);
router.post("/login", login);
router.post("/crearCuenta", clienteGuard, crearCuenta);
router.post("/cerrarCuenta", clienteGuard, cerrarCuenta);
router.post("/cerrarCuentaPrevio", clienteGuard, cerrarCuentaPrevio);
router.post("/Usuario/Registrar", UsuarioRegistrar);
router.post("/DatosPersonales/guardar", DatosPersonalesGuardar);
router.post("/Usuario/productos/Lista", UsuarioProductosList);
router.post("/QuejasReclamos/enviar", QuejasReclamosEnviar);


module.exports = router;
