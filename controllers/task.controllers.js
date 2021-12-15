export const welcome = (req, res, next) => {
  res.send("welcome to backend server");
};

/**
API Rest Login
Descripción: Verifica usuario y contraseña con respecto al JSON.
Ruta: /Login
Entrada: usuario, password
Método: POST
Entrega: Status/message */

export const login = (req, res) => {
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
};
