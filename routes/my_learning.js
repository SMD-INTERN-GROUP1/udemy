const express = require('express');
const router = express.Router();
const userController = require('../controller/user.controller');
const questionController = require("../controller/questionController");
router.get("/", userController.getMyLearning);
router.get("/:slug", userController.getListVideoToLearn);

router.post("/check/:idCourse",  questionController.checkQuestion)
router.get("/quiz/:slug", questionController.test);
router.post("/process/store", userController.createProgress);


module.exports = router;