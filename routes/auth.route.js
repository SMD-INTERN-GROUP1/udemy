const authController = require('../controller/auth.controller');

const router = require('express').Router();

//register
router.post('/register',authController.registerUser);

//login


router.get("/", (req, res, next) => {
  res.render('component/login');
})
router.post('/login',authController.loginUser);

module.exports = router;
