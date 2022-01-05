const authController = require('../controller/auth.controller');

const router = require('express').Router();

//register
router.post('/register',authController.registerUser);

//login
// router.post('/login',authController.loginUser);
router.use('/login',authController.loginUser);

module.exports = router;
