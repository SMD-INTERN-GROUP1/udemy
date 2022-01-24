const express = require('express');
const router = express.Router();
const userController = require('../controller/user.controller');

router.get("/", userController.getMyLearning);
router.get("/:slug", userController.getListVideoToLearn);

router.post("/process/store", userController.createProgress);

module.exports = router;