const express = require("express");
const router = express.Router();
const { welcome, login, crearCuenta, cerrarCuenta, cerrarCuentaPrevio, UsuarioRegistrar, DatosPersonalesGuardar, QuejasReclamosEnviar, UsuarioProductosList } = require("../controllers/task.controllers");

const users = [
  {
    nombre: "Luis",
    password: "password",
  },
];

router.get("/", welcome);
router.post("/login", login);
router.post("/Usuario/Registrar", UsuarioRegistrar);
router.post("/DatosPersonales/guardar", DatosPersonalesGuardar);
router.post("/Usuario/productos/Lista", UsuarioProductosList);
router.post("/QuejasReclamos/enviar", QuejasReclamosEnviar);
router.post("/crearCuenta", crearCuenta);
router.post("/cerrarCuenta", cerrarCuenta);
router.post("/cerrarCuentaPrevio", cerrarCuentaPrevio);

module.exports = router;
