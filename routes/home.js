const express = require("express");

const router = express.Router();
const homeController = require("../controller/home.controller");

/* GET home page. */
router.get("/", homeController.renderHomePage);

module.exports = router;
