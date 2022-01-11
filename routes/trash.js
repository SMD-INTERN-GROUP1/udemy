const express = require("express");
const router = express.Router();
const topicController = require("../controller/topic.controller");

/* Trash topics section */
// GET: /admin/trash/topics -> render trash topics page
router.get("/topics", topicController.renderTrashTopics);

// PATCH: /admin/trash/:id/restore -> Restore topic
router.patch("/topic/:id/restore", topicController.restore);

// DELETE: /admin/trash/:id/force -> Delete topic forever
router.delete("/topic/:id/force", topicController.forceDestroy);

module.exports = router;
