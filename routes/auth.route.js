const authController = require('../controller/auth.controller');
const router = require('express').Router();
const middleware = require('../middlerwares/auth.middleware');
const categoryService = require("../services/category.services");
const checkErrorLogin = require('../middlerwares/errorLogin.middleware');

router.get('/',async (req, res) => {
  return res.render('component/login',{errors:''})
});
router.post("/",authController.loginUser);



module.exports = router;
