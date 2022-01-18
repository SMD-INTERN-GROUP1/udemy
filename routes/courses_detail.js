const express = require('express');
const router = express.Router();
const courseController = require('../controller/course.controller');
router.get('/wishlist', courseController.wishListFunc);
router.get("/search/page=:page", courseController.getSearch);
router.get('/:title', courseController.getDetailCourse);
module.exports = router;