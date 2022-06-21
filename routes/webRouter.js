// import all important modules
const express = require("express");

// declare router
const router = express.Router();

// import controller
const home = require("../controller/homeController");
const admin = require("../controller/adminController");

// implementation
router.get("/", home.index);
router.get("/login", admin.login);
router.post("/login", admin.processLogin);
router.get("/admin", admin.index);
module.exports = router;