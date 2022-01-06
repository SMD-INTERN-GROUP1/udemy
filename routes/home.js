const express = require("express");
const homeController = require('../controller/home.controller');
const router = express.Router();

/* GET home page. */
router.get("/", homeController.getHomePage);

module.exports = router;
