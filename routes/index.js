const express = require("express");
const router = express.Router();
const { welcome, login, transferencias, crearCuenta, cerrarCuenta, Previo, UsuarioRegistrar, DatosPersonalesGuardar, UsuarioProductosList, QuejasReclamosEnviar } = require("../controllers/task.controllers");
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
router.post("/Previo", clienteGuard, Previo);
router.post("/Usuario/Registrar", admiGuard, UsuarioRegistrar);
router.post("/DatosPersonales/guardar", clienteGuard, DatosPersonalesGuardar);
router.post("/Usuario/productos/Lista",  clienteGuard, UsuarioProductosList);
router.post("/QuejasReclamos/enviar", clienteGuard, QuejasReclamosEnviar);
router.post("/Transferencias", clienteGuard, transferencias);


module.exports = router;
