const express = require('express');
const bcrypt = require("bcrypt");
const Users = require('../database/models/Users');

const router = express.Router();

/* GET users listing. */
router.get('/', (req, res, next) => {
  // res.render("template/master", {
  //   title: "Topic page",
  //   content: "../course/course_index",
  // });
});

router.get('/edit-profile', (req, res, next) => {
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

router.patch('/edit-profile', (req, res, next) => {
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

router.get('/edit-account', (req, res, next) => {
  try {
    let notification = "";

    if (req.cookies.user) {
      Users.findOne({_id: req.cookies.user._id})
      .then(user => {
        res.render("profile/account.ejs", { title: "User account", user, notification } );
      })
      .catch(next);
    } else {
      res.redirect('/login');
    }
  } catch(err) {
    return res.status(500).json(err);
  };
});

router.patch('/edit-account', async (req, res, next) => {
    const salt = await bcrypt.genSalt(10);
    const hashedNewPass = await bcrypt.hash(req.body.newPassword, salt);
    let newPass = hashedNewPass;

    if (req.cookies.user) {
      let idUser = req.cookies.user._id;
      let notification;
      let user = req.cookies.user;

      // let query = { _id: idUser, password: currentPass}
      // Users.findOneAndUpdate(query, {password: newPass})
      // .then((data) => {
      //   console.log('data user', data);
      //   if(data) {
      //     notification = "Password update successful";
      //     res.render("profile/account.ejs", { title: "User account", data, notification } );
      //     // res.json('đúng');
      //   } else {
      //     notification = "Incorrect password";
      //     res.render("profile/account.ejs", { title: "User account", user, notification } );
      //     // res.json('sai');
      //   }
      // })
      // .catch(err => console.log(err));


      const checkUser = await Users.findOne({email : req.cookies.user.email}); //find by ID
      console.log(checkUser);
      if(!checkUser){
        // json('Sai tài khoản!');
        return res.status(404).render('component/login');
      }
      const validPassword = await bcrypt.compare(
        req.body.password,
        checkUser.password
      );
      if(!validPassword){
          // json('Sai mật khẩu!');
          // return res.status(404).render('component/login');
          // notification = "Incorrect password";
          // res.json(notification);
          // res.render("profile/account.ejs", { title: "User account", user, notification } );
          notification = "Incorrect";
          res.render("profile/account.ejs", { title: "User account", user, notification } );
      } else {
        Users.updateOne( { _id: idUser } , { password: newPass} )
        .then(() => {
          notification = "Successful";
          res.render("profile/account.ejs", { title: "User account", user, notification } );
        });
      }

      
      // notification = "Correct password";
      // res.json(notification);

      // console.log(req.body);
      // res.json(req.body);
    }
  
});

// router.get('/public-profile', async (req, res, next) => {
//   res.render("profile/public-profile.ejs", { title: "User account" });
// });

module.exports = router;
