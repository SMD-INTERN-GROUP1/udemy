const express = require("express");
const router = express.Router();
const adminController = require("../controller/admin.controler");
const categoriesController = require("../controller/category.controller");
const topicController = require("../controller/topic.controller");
const courseController = require("../controller/course.controller");
const userController = require("../controller/user.controller");
const bannerController = require("../controller/banner.controller");

/* GET admin page. */
router.get("/", adminController.renderAdminPage);

// Users section
router.get("/users", userController.renderUserPage);

// Categories section
router.get("/categories", categoriesController.renderCategoriesPage);
router.get("/addcategories", categoriesController.renderCreateView);
router.post("/createcategories", categoriesController.create);
router.get("/updatecategories/:id", categoriesController.renderUpdateView);
router.put("/editcategories/:id", categoriesController.update);
router.delete("/deletecategories/:id", categoriesController.destroy);

// Topics section
router.get("/topics", topicController.getListTopics);
router.get("/addtopic", topicController.renderCreateView);
router.post("/createtopic", topicController.create);
router.get("/updatetopic/:id", topicController.renderUpdateView);
router.put("/edittopic/:id", topicController.update);
router.delete("/deletetopic/:id", topicController.destroy);

// Courses section
router.get("/courses", courseController.renderCoursePage);

// Banner section
// GET List banners /admin/banners
router.get("/banners", bannerController.renderBannerPage);

module.exports = router;
