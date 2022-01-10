const express = require("express");
const router = express.Router();
const homeController = require("../controller/home.controller");

/* GET course page. */
router.get("/", homeController.renderCoursePage);

router.get("/development", (req, res, next) => {
  res.render("component/topic", { title: "Udemy" });
});

module.exports = router;
