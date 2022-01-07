const express = require('express');
const router = express.Router();
const courseController = require('../controller/course.controller');
router.get('/:title', courseController.getDetailCourse);

module.exports = router;