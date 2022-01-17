const express = require('express');
const User = require('../database/models/Users')

const router = express.Router();

/* GET users listing. */
router.get('/', (req, res, next) => {
  // res.render("template/master", {
  //   title: "Topic page",
  //   content: "../course/course_index",
  // });
});

router.get('/edit-profile', async (req, res, next) => {
  let isLogin = true;
  let user;
  if (req.cookies.user) {
    isLogin = false;
    // console.log("cookies", req.cookies.user);
    // console.log("cookies", req.cookies);
    user = req.cookies.user;
  }
  res.render("profile/profile.ejs", { title: "Edit profile", user } );
});

router.get('/edit-account', async (req, res, next) => {
  res.render("profile/account.ejs", { title: "User account" });
});


module.exports = router;
