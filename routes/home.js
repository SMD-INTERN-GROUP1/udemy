const express = require('express');
const router = express.Router();
const homeController = require('../controller/home.controller');

router.use('/', homeController.getHomePage);

module.exports = router;