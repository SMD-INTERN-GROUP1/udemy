const authController = require('../controller/auth.controller');
const router = require('express').Router();

router.get('/',authController.logOut);

module.exports = router;