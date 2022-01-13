const express = require("express");
const homeController = require("../controller/home.controller");
const router = express.Router();

/* GET home page. */
router.get("/", homeController.getHomePage);

router.get("/teaching", homeController.renderTeachingPage);

router.get("/teaching/register", homeController.renderTeachingRegister);

module.exports = router;
