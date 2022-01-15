const express = require("express");
const router = express.Router();

const courseController = require("../controller/course.controller");
const instructorController = require("../controller/instructor.controller");

/* GET instructor page. */
router.get("/", instructorController.getListCourser);
router.get("/addcourse", instructorController.renderCreateCoursePage);
router.post("/createcourse", instructorController.create);
router.get("/courses/:slug");

module.exports = router;
