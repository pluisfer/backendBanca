const users = [
  {
    nombre: "Luis",
    password: "password",
  },
];
module.exports = {
  welcome: function (req, res, next) {
    res.send("welcome to backend server");
  },

  /**
API Rest Login
Descripción: Verifica usuario y contraseña con respecto al JSON.
Ruta: /Login
Entrada: usuario, password
Método: POST
Entrega: Status/message */

  login: function (req, res) {
    let result = users.find((user) => user.nombre == req.body.nombre);
    if (result) {
      if (result.password == req.body.password) {
        res.status(200).send({
          message: "Successful Login!!",
          redirectUrl: "/Clientes",
        });
      } else {
        res.status(200).send({
          message: "Password incorrect!",
        });
      }
    } else {
      res.status(200).send({
        message: "User not found!!",
      });
    }
  },

  ClienteRegistrar: function (req, res) {
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


  }


};



