const express = require("express");
const router = express.Router();
const topicController = require("../controller/topic.controller");
const categoryController = require("../controller/category.controller");

/* Trash topics section */
// GET: /admin/trash/topics -> render trash topics page
router.get("/topics", topicController.renderTrashTopics);

// PATCH: /admin/trash/topic/:id/restore -> Restore topic
router.patch("/topic/:id/restore", topicController.restore);

// DELETE: /admin/trash/topic/:id/force -> Delete topic forever
router.delete("/topic/:id/force", topicController.forceDestroy);

/* Trash categories section */
// GET: /admin/trash/categories -> render trash category page
router.get("/categories", categoryController.renderTrashCategories);

// PATCH: /admin/trash/category/:id/restore -> Restore category
router.patch("/category/:id/restore", categoryController.restore);

// DELETE: /admin/trash/category/:id/force -> Delete category forever
router.delete("/category/:id/force", categoryController.forceDestroy);

module.exports = router;
