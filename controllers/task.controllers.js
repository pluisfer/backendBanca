const { compare } = require("bcrypt");
const { sign } = require("jsonwebtoken");
require("dotenv").config();
//Modelos
const { usuariosModel } = require("../Modelos/usuariosModel")
const { datosPersonalesModel } = require("../Modelos/datosPersonalesModel")
const { crearCuentaModel } = require("../Modelos/crearCuentaModel")
const { qyrModel } = require("../Modelos/qyrModel")
const { transferenciasModel } = require("../Modelos/transferenciasModel")
const { transferenciasModel1 } = require("../Modelos/transferenciasModel1")

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
                return res.status(200).send({ estado: "ok", msg: "Logueado", url:"/Registrarse", token, usuario });
           } else {
                return res.status(200).send({ estado: "ok", msg: "Logueado", url:"/Clientes", token, usuario });
            }
        } else if (user.rol === "ui"){
            return res.status(200).send({ estado: "ok", msg: "Logueado", url:"/UsuarioInterno", token });
        } 
        else {
          return res.status(200).send({ estado: "ok", msg: "Logueado", url: "/Dashboard", token });
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
        console.log(error)
      }
      return res.status(200).send({ estado: "ok", msg: "Su cuenta ha sido creada!" });
    });
  },

  /**
   * API Rest Registro Clientes
    Desacripcion: registra a un usuario que haya solicitado la creacion de su cuenta, esto lo aran el administrado.
    Ruta: /Registrar
    Entrada: usuario, contraseña, confirmar contraseña, tipo de usuario
    metodo: POST
    Entrega: json{estado: "ok", msg: "usuario guardado"}
    error: json{estado: "error", msg: "ERROR usuario no guardado"}
   */

  UsuarioRegistrar: function (req, res) {
    const data = req.body;
    const clientes = new userModel(data);
    clientes.save(function (error) {
      if (error) {
        res.send({ estado: "error", msg: "ERROR: cliente no guardado" });
        return false;
      }

      res.send({ estado: "ok", msg: "cliente guardado" });
    })
  },

  /**
   * API Reste registrar datos personales
   * Descripcion: el usuario al logearse sera redireccionado a llenar los datos personales, solo es una sola ves.
   * Ruta: /DatosPersonales/guardar
   * Metodo: POST
   * Entrega: json{ estado: "ok", msg: "datos almacenados correctamente" }
   * EARROR: json{ estado: "error", msg: "ERROR: datos no guardados" }
   */
  DatosPersonalesGuardar: function (req, res) {
    const data = req.body;
    const DatosClientes = new datosPersonalesModel(data);
    DatosClientes.save(function (error) {
      if (error) {
        res.send({ estado: "error", msg: "ERROR: datos no guardados" });
        return false
      }
      res.send({ estado: "ok", msg: "datos almacenados correctamente" })

    })



  },

  QuejasReclamosEnviar: function (req, res) {
    const data = req.body;
    const QuejasReclamos = new quejasReclamosModel(data);
    QuejasReclamos.save(function (error) {
      if (error) {
        res.send({ estado: "error", msg: "ERROR: queja no enviada" });
        return false
      }
      res.send({ estado: "ok", msg: "solicitud enviada correctamente" })

    })


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
  Previo: function (req, res) {
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
  },



  /**
   * API Rest listado de productos/fidicuentas creadas por el usuario
   * Descripcion: se enlistara todos los productos/fiducuentas que el usuario vaya creando
   * Ruta: /Usuario/productos/Lista
   * metodo: POST
   * Respuesta: json{ estado: "ok", msg: "Producto Encontrado", data: prod }
   */
  UsuarioProductosList: function (req, res) {
    crearCuentaModel.find({}, function (error, nCuenta) {
      if (error) {
        return res.send({ estado: "error", msg: "ERROR al buscar Producto" })
      } else {
        if (nCuenta !== null) {
          res.send({ estado: "ok", msg: "Producto Encontrado", data: nCuenta });
        } else {
          res.send({ estado: "error", msg: "Producto NO Encontrado" });
        }
      }
    })

  },

  transferencias: function(req, res) {
    const cuenta = req.body;
    const min = 100000000;
    const max = 999999999;
    const nTransferencia = Math.floor(Math.random()*(max-min+1)+min);
    crearCuentaModel.findOne({ nCuenta : cuenta.origen }, function (error, data) {
        if (error) {
            return res.send({ estado: "error", msg: "ERROR al hacer transferencia" })
        } else {
            if (data !== null) {
                const valor1 = data.valor-cuenta.monto;
                crearCuentaModel.findOneAndUpdate({ nCuenta : cuenta.origen }, {
                    $set: { valor:valor1 }
                }, function (error) {
                if (error) {
                    return res.status(500).json({ estado: "error", msg: "ERROR: Producto NO Guardado!" })
                }
                    //res.status(200).json({ estado: "ok", msg: "Producto Guardado!" })
                    const nCuenta = cuenta.origen;
                    const valor = cuenta.montoDestino;
                    const saldo = data.valor-cuenta.monto;
                    const datos = {
                        nCuenta,
                        nTransferencia,
                        valor,
                        saldo
                    }
                    const guardar = new transferenciasModel(datos);
                    guardar.save(function (error) {
                        if (error) {
                            return res.status(500).send({ estado: "error", msg: "ERROR al hacer transferencia" });
                        }
                        //return res.status(200).send({ estado: "ok", msg: "Su cuenta ha sido creada!" });
                    });
                })
            } else {
                res.send({ estado: "error", msg: "ERROR al hacer transferencia" });
            }
        }
    })
    
    crearCuentaModel.findOne({ nCuenta : cuenta.destino }, function (error, data) {
        if (error) {
            return res.send({ estado: "error", msg: "ERROR al hacer transferencia" })
        } else {
            if (data !== null) {
                const valor2 = data.valor+cuenta.montoDestino;
                crearCuentaModel.findOneAndUpdate({ nCuenta : cuenta.destino }, {
                    $set: { valor:valor2 }
                }, function (error) {
                if (error) {
                    return res.status(500).json({ estado: "error", msg: "ERROR: Producto NO Guardado!" })
                } else {
                    //res.status(200).json({ estado: "ok", msg: "Producto Guardado!" })
                    const nCuenta1 = cuenta.destino;
                    const valor1 = cuenta.montoDestino;
                    const saldo1 = data.valor+cuenta.montoDestino;
                    const datos1 = {
                        nCuenta : nCuenta1,
                        nTransferencia,
                        valor : valor1,
                        saldo : saldo1
                    }
                    const guardar = new transferenciasModel1(datos1);
                    guardar.save(
                        function (error) {
                        if (error) {
                            return res.status(500).send({ estado: "error", msg: "ERROR al hacer transferencia1" });
                        }
                        return res.status(200).send({ estado: "ok", msg: "Transferencia realizada con éxito!" });
                    }
                    );
                }
                })
            } else {
                res.send({ estado: "error", msg: "ERROR al hacer transferencia" });
            }
        }
    })
  }
};



