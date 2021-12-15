const express = require("express");
const router = express.Router();
const { welcome, login } = require("../controllers/task.controllers");

const users = [
  {
    nombre: "Luis",
    password: "password",
  },
];

router.get("/", welcome);

router.post("/Login", login);

module.exports = router;
