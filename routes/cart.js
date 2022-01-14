const router = require('express').Router();
const categoryService = require("../services/category.services");

router.get('/',async (req, res) => {
  return res.render('component/cart')
});

module.exports = router;
