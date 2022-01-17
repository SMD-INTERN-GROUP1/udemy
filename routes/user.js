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
  try {
    let isLogin = false;
  
    if (req.cookies.user) {
      isLogin = true;

      Users.findOne({_id: req.cookies.user._id})
      .then(user => {
        res.render("profile/profile.ejs", { title: "Edit profile", user } );
      })
      .catch(next);
    } else {
      res.redirect('/login');
    }
  } catch(err) {
    return   res.status(500).json(err);
  };
});

router.patch('/edit-profile', async (req, res, next) => {
  try {
    let isLogin = false;
    let idUser;
    
    if (req.cookies.user) {
      isLogin = true;
      idUser = req.cookies.user._id;

      Users.updateOne({ _id: idUser }, req.body)
      .then(() => res.redirect('edit-profile'))
      .catch(err => console.log(err));
    }
  } catch(err) {
    return res.status(500).json(err);
  }
});

router.get('/edit-account', async (req, res, next) => {
  res.render("profile/account.ejs", { title: "Public profile" });
});

// router.get('/public-profile', async (req, res, next) => {
//   res.render("profile/public-profile.ejs", { title: "User account" });
// });

module.exports = router;
