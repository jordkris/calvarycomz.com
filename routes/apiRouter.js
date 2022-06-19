// import all important modules
const express = require("express");

// declare router
const router = express.Router();

// import controller
const profile = require("../controller/api/profileApiController.js");
const books = require("../controller/api/booksApiController.js");

// implementation
router.get("/profile/getAll", profile.getAll);
router.get("/books/getAll", books.getAll);
module.exports = router;
