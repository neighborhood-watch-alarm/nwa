const express = require("express");
const router = express.Router();
const emailController = require("../controllers/email.controller");

router.post("/", emailController.send_email);

module.exports = router;
