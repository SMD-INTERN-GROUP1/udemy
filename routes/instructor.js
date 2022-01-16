const express = require("express");
const router = express.Router();

const courseController = require("../controller/course.controller");
// const instructorController = require("../controller/instructor.controller");

/* GET instructor page. */
router.get("/", courseController.getListCourserOfInstructor);
router.get("/addcourse", courseController.renderCreateCoursePage);
router.post("/createcourse", courseController.create);
router.get("/courses/:slug", courseController.showCourse);
router.get("/courses/:slug/update", courseController.renderUpdateView);
router.put("/courses/:slug/updated", courseController.update);
router.delete("/courses/:slug/delete", courseController.destroy);

module.exports = router;
