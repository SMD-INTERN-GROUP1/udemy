const express = require('express');
const router = express.Router();
const courseController = require('../controller/course.controller');

router.get("/page=:page", courseController.getSearch);
module.exports = router;