const express = require("express");
const homeController = require("../controller/home.controller");
const router = express.Router();

/* GET home page. */
router.get("/", homeController.renderHomePage);

router.get("/courses", homeController.renderCoursePage);

module.exports = router;
