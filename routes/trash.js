const express = require("express");
const router = express.Router();
const topicController = require("../controller/topic.controller");
const categoryController = require("../controller/category.controller");
const courseController = require("../controller/course.controller");

/* Trash topics section */
router.get("/topics", topicController.renderTrashTopics);
router.patch("/topic/:id/restore", topicController.restoreTopic);
router.delete("/topic/:id/force", topicController.forceDestroy);

/* Trash categories section */
router.get("/categories", categoryController.renderTrashCategories);
router.patch("/category/:id/restore", categoryController.restore);
router.delete("/category/:id/force", categoryController.forceDestroy);

// /* Trash courses section */
router.get("/courses", courseController.renderTrashCourses);
router.delete("/course/:id/force", courseController.forceDestroy);

module.exports = router;
