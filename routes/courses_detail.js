const express = require("express");
const router = express.Router();
const courseController = require("../controller/course.controller");
const vetify = require("../middlerwares/auth.middleware");

router.get("/:slug", courseController.getDetailCourse);
router.post("/review/delete/:id/:idCourse", courseController.deleteReview);
router.post("/review/:id", courseController.createReview);

module.exports = router;
