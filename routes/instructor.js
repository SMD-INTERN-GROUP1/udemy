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

const storageImage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "/public/uploads/images");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + "." + file.originalname);
  },
});

const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === "image/jpeg" ||
    file.mimetype === "image/png" ||
    file.mimetype === "image/jpg"
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const uploadImage = multer({
  storage: storageImage,
  limit: {
    fileSize: 1024 * 1024 * 5,
  },
  fileFilter: fileFilter,
});

const courseController = require("../controller/course.controller");
const questionController = require("../controller/questionController");
const Course = require("../database/models/Courses");
// const instructorController = require("../controller/instructor.controller");

/* GET instructor page. */
router.get("/", courseController.getListCourserOfInstructor);
router.get("/courses/:slug/quizz/admin", questionController.admintest);
router.get("/addcourse", courseController.renderCreateCoursePage);
router.post("/createcourse", courseController.create);
router.get("/courses/:slug/quiz",courseController.quizcontroller );
router.post(
  "/createcourse",
  uploadImage.single("course_image"),
  courseController.create
);
router.get("/courses/:slug", courseController.showCourse);
router.get("/courses/:slug/update", courseController.renderUpdateView);
router.put("/courses/:slug/updated", courseController.update);
router.delete("/courses/:slug/delete", courseController.destroy);
router.get("/search", (req, res, next) => {
  const { courses } = req.query;

  Course.find({
    title: {
      $regex: courses,
      $options: "$i",
    },
    author: req.cookies.user.username,
  }).then((data) => {
    // res.send(data);
    let isLogin = true;
    let user;
    if (req.cookies.user) {
      isLogin = false;
      console.log("cookies", req.cookies.user);
      user = req.cookies.user;
    }
    let page = parseInt(req.query.page) || 1;
    let perPage = 3;
    let start = (page - 1) * perPage;
    let end = page * perPage;
    Course.countDocuments((err, count) => {
      if (err) return next(err);
      res.render("dashboard_instructor/master", {
        title: "Instructor page",
        content: "../instructor_view/search",
        data: data.slice(start, end),
        isLogin,
        user,
        current: page,
        pages: Math.ceil(count / perPage),
      });
    });
  });
});

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
