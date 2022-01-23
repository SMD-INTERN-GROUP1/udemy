const express = require("express");
const router = express.Router();
const multer = require("multer");
const dotenv = require("dotenv");
dotenv.config();
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, process.env.INIT_CWD + "/public/uploads");
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + "-" + Date.now() + ".mp4");
  },
});
const upload = multer({ storage: storage });

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

//chapter
//[POST] chapters/store
router.post("/courses/:slug/chapters/store", courseController.createChapter);

//video
//[POST] videos/store
router.post(
  "/courses/:slug/videos/store",
  upload.single("video_url"),
  courseController.createVideo
);

module.exports = router;
