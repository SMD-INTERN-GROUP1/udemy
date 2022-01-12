const authController = require('../controller/auth.controller');
const middleware = require('../middlerwares/auth.middleware');
const router = require('express').Router();

router.get('/', (req, res) => {
  return res.render('component/login')
})
router.post("/login",authController.loginUser);

module.exports = router;
