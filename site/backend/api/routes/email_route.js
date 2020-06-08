const express = require("express");
const router = express.Router();
const emailController = require("../controllers/email_controller.js");

router.get("/", emailController.send_email);

module.exports = router;
