// import all important modules
const express = require("express");

// declare router
const router = express.Router();

// import controller
const home = require("../controller/homeController");

// implementation
router.get("/", home.index);
module.exports = router;
