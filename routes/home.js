const express = require("express");

const homeController = require("../controller/home.controller");

const router = express.Router();

/* GET home page. */
router.get("/", homeController.getHomePage);

// GET teaching page
router.get("/teaching", homeController.renderTeachingPage);

router.get("/teaching/register", homeController.renderTeachingRegister);

router.post("/teaching/register", homeController.teachingRegister);

module.exports = router;
