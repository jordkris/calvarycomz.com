// import all important modules
const express = require("express");

// declare router
const router = express.Router();

// import controller
const pages = require("../controller/api/pagesApiController.js");
const auth = require("../controller/api/authApiController");
const db = require("../controller/api/dbApiController.js");

// implementation
router.post("/pages/updatePageContent/:id", pages.updatePageContent);
router.post("/login", auth.processLogin);
router.post("/db/get", db.get);
router.post("/db/update", db.update);
module.exports = router;