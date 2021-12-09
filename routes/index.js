const express = require("express");
const router = express.Router();

const users = [
  {
    nombre: "Luis",
    password: "password",
  },
];

/* GET home page. */
router.get("/", function (req, res, next) {
  res.send("welcome to backend server");
});

router.post("/Login", function (req, res) {
  let result = users.find((user) => user.nombre == req.body.nombre);
  if (result) {
    if (result.password == req.body.password) {
      res.status(200).send({
        message: "Successful Login!!",
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
});

module.exports = router;
