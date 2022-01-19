const express = require('express');
const router = express.Router();
const courseController = require('../controller/course.controller');
const verifyToken = require('../middlerwares/auth.middleware');
router.get('/wishlist', verifyToken,courseController.wishListFunc);
router.get("/search/page=:page", courseController.getSearch);   
router.get('/:title', courseController.getDetailCourse);
module.exports = router;