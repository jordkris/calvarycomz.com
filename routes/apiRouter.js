// import all important modules
const express = require("express");

// declare router
const router = express.Router();

// import controller
const profile = require("../controller/api/profileApiController.js");
const books = require("../controller/api/booksApiController.js");
const pages = require("../controller/api/pagesApiController.js");
const reviews = require("../controller/api/reviewsApiController.js");
const db = require("../controller/api/dbApiController.js");

// implementation
router.get("/profile/getAll", profile.getAll);
router.get("/books/getAll", books.getAll);
router.get("/pages/getAll", pages.getAll);
router.get("/reviews/getAll", reviews.getAll);
router.post("/pages/get", pages.get);
router.post("/db/update", db.update);
module.exports = router;