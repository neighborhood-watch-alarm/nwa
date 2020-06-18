const express = require("express");
const router = express.Router();
const componentController = require("../controllers/component_controller.js");

router.post("/", componentController.componentDetails);

module.exports = router;
