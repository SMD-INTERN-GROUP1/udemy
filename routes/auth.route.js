const authController = require('../controller/auth.controller');

const router = require('express').Router();

//login


router.get("/", (req, res, next) => {
  res.render('component/login');
})
router.post('/login',authController.loginUser);

module.exports = router;
