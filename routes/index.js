const express = require("express");
const router = express.Router();
import { welcome, login } from "../controllers/task.controllers";

const users = [
  {
    nombre: "Luis",
    password: "password",
  },
];

router.get("/", welcome);

router.post("/Login", login);

module.exports = router;
