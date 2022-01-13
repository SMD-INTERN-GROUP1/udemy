const authController = require('../controller/auth.controller');
const middleware = require('../middlerwares/auth.middleware');
const router = require('express').Router();
const categoryService = require("../services/category.services");
const checkErrorLogin = require('../middlerwares/errorLogin.middleware');

router.get('/',async (req, res) => {
  return res.render('component/login',{errors:''})
});
router.post("/",authController.loginUser);

module.exports = router;
