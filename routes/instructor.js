const express = require("express");
const router = express.Router();

const courseController = require("../controller/course.controller");

/* GET instructor page. */
router.get("/", courseController.getListCourser);
router.get("/addcourse", courseController.renderCreateCoursePage);

module.exports = router;
