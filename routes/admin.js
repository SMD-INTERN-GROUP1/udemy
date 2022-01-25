const express = require("express");
const router = express.Router();

const CourseModel = require("../database/models/Courses");
const UserModel = require("../database/models/Users");
const TopicModel = require("../database/models/Topics");

const adminController = require("../controller/admin.controler");
const categoriesController = require("../controller/category.controller");
const topicController = require("../controller/topic.controller");
const courseController = require("../controller/course.controller");
const userController = require("../controller/user.controller");
const bannerController = require("../controller/banner.controller");

/* GET admin page. */
router.get("/", async (req, res, next) => {
  try {
    const countStudents = await UserModel.find({
      isTeacher: false,
    }).countDocuments();
    const countUsers = await UserModel.find({}).countDocuments();
    const countInstructor = await UserModel.find({
      isTeacher: true,
    }).countDocuments();
    const countCourses = await CourseModel.find({}).countDocuments();

    res.render("dashboard_admin/master", {
      title: "Admin page",
      content: "../dashboard_admin/main_content",
      countStudents,
      countInstructor,
      countUsers,
      countCourses,
    });
  } catch (e) {
    res.status(500).json({ message: "Server error" });
  }
});

// Users section
router.get("/users", userController.renderUserPage);

// Categories section
router.get("/categories", categoriesController.renderCategoriesPage);
router.post("/categories", categoriesController.create);
router.get("/categories/:id", categoriesController.renderUpdatePage);
router.put("/categories/:id", categoriesController.update);
router.delete("/categories/:id", categoriesController.destroy);

// Topics section
router.get("/topics", topicController.getListTopics);
router.get("/new/topics", topicController.renderCreatePage);
router.post("/topics", topicController.create);
router.get("/topics/:id", topicController.renderUpdatePage);
router.put("/topics/:id", topicController.update);
router.delete("/topics/:id", topicController.destroy);

// Courses section
router.get("/courses", courseController.renderCoursePage);

// Banner section
router.get("/banners", bannerController.renderBannerPage);
router.get("/addbanner", bannerController.renderCreateView);
router.post("/createbanner", bannerController.create);

module.exports = router;
