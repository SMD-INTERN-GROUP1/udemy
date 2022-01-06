const express = require("express");
const router = express.Router();
var banners =require('../controller/home.controller')
/* GET home page. */
router.get("/", banners.bannerdata);
module.exports = router;
