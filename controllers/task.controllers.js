const { compare } = require("bcrypt");
const { sign } = require("jsonwebtoken");
require("dotenv").config();
//Modelos
const { usuariosModel } = require("../Modelos/usuariosModel")
const { datosPersonalesModel } = require("../Modelos/datosPersonalesModel")
const { crearCuentaModel } = require("../Modelos/crearCuentaModel")
const { qyrModel } = require("../Modelos/qyrModel")
const { transferenciasModel } = require("../Modelos/transferenciasModel")

const users = [
  {
    nombre: "Luis",
    password: "password",
  },
];
module.exports = {
  welcome: function (req, res, next) {
    res.send("welcome to the Backend server");
  },

  /**
API Rest Login
Descripción: Verifica usuario y contraseña con respecto al JSON.
Ruta: /Login
Entrada: usuario, contraseña
Método: POST
Entrega: estado/msg/url/token */

  login: async function (req, res) {
    const { usuario, contraseña } = req.body;
    const user = await usuariosModel.findOne({ usuario });
    if (!user) {
        return res.status(401).send({ estado: "error", msg: "Credenciales NO válidas" });
    }
    const passOK = await compare(contraseña, user.contraseña);
    if (passOK === true) {
        const token = sign(
            {
                usuario: user.usuario,
                rol: user.rol
            },
            process.env.JWT_PASS
        )
        if (user.rol === "c"){
            const rdp = await datosPersonalesModel.findOne({ usuario });
            if (!rdp) {
                return res.status(200).send({ estado: "ok", msg: "Logueado", url:"/RegistroDatosPersonales", token, usuario });
           } else {
                return res.status(200).send({ estado: "ok", msg: "Logueado", url:"/BancaVirtual", token, usuario });
            }
        } else if (user.rol === "ui"){
            return res.status(200).send({ estado: "ok", msg: "Logueado", url:"/UsuarioInterno", token });
        } else {
            return res.status(200).send({ estado: "ok", msg: "Logueado", url:"/Dashboard", token });
        }
    }
    return res.status(401).send({ estado: "error1", msg: "Credenciales NO válidas" });
  },

  /**
 * API Rest Crear Cuenta
 * Descripción: Crea una fiducuenta con la información especificada por el usuario.
 * Ruta: /CrearCuenta
 * Método: POST
 * Datos de entrada: usuario, fondoInversion, tipoCuenta, nCuenta, valor
 * Respuesta: estado/msg
 */
  crearCuenta: function (req, res) {
    const data = req.body;
    const cuenta = new crearCuentaModel(data);
    cuenta.save(function (error) {
        if (error) {
            return res.status(500).send({ estado: "error", msg: "ERROR: Cuenta NO creada" });
        }
        return res.status(200).send({ estado: "ok", msg: "Su cuenta ha sido creada!" });
    });
  },

  /**
 * API Rest Cerrar Cuenta
 * Descripción: Elimina la cuenta especificada por el usuario.
 * Ruta: /CerrarCuenta
 * Método: POST
 * Datos de entrada: _id
 * Respuesta: estado/msg
 */
  cerrarCuenta: function (req, res) {
    const cuenta = req.body;
    crearCuentaModel.findByIdAndRemove(cuenta._id, function (error) {
        if (error) {
            return res.status(500).send({ estado: "error", msg: "ERROR: Cuenta NO borrada" });
        }
        return res.status(200).send({ estado: "ok", msg: "La cuenta ha sido eliminada!" });
    });

  },

  /**
 * API Rest Cerrar Cuenta Previo
 * Descripción: Consulta las cuentas creadas por el cliente.
 * Ruta: /CerrarCuenta/previo
 * Método: POST
 * Datos de entrada: usuario
 * Respuesta: estado/msg/data
 */
  cerrarCuentaPrevio: function (req, res) {
    const user = req.body;
    crearCuentaModel.find({ usuario : user.usuario }, function (error, cuenta) {
        if (error) {
            return res.send({ estado: "error", msg: "ERROR al buscar cuenta" })
        } else {
            if (cuenta !== null) {
                res.send({ estado: "ok", msg: "Cuenta encontrada", data: cuenta });
            } else {
                res.send({ estado: "error", msg: "Cuenta NO encontrada" });
            }
        }
    })
  }
};
