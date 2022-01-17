const express = require('express');
const Users = require('../database/models/Users')

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
    console.log("cookies", req.cookies.user.fullName);
    // console.log("cookies", req.cookies);
    user = req.cookies.user;
  }
  res.render("profile/profile.ejs", { title: "Edit profile", user } );
});

router.patch('/edit-profile', async (req, res, next) => {
  let isLogin = true;
  let idUser;
  if (req.cookies.user) {
    isLogin = false;
    // console.log("cookies", req.cookies.user._id);
    // console.log("cookies", req.cookies);
    idUser = req.cookies.user._id;

    Users.updateOne({ _id: idUser }, req.body)
    .then((data) => console.log(data))
    .catch(err => console.log(err));
  }

  console.log(req.body);
  res.json(req.body);
});

router.get('/edit-account', async (req, res, next) => {
  res.render("profile/account.ejs", { title: "User account" });
});


module.exports = router;
