const express = require('express');
const bcrypt = require("bcrypt");
const Users = require('../database/models/Users');
const Instructor = require('../database/models/instructor');

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

// router.patch('/edit-profile', (req, res, next) => {
//   try {
//     let isLogin = false;
//     let idUser;
    
//     if (req.cookies.user) {
//       isLogin = true;
//       idUser = req.cookies.user._id;

//       Users.updateOne({ _id: idUser }, req.body)
//       .then(() => res.redirect('edit-profile'))
//       .catch(err => console.log(err));
//     }
//   } catch(err) {
//     return res.status(500).json(err);
//   }
// });

router.patch('/edit-profile', (req, res, next) => {
    let isLogin = false;
    let idUser;
    
    if (req.cookies.user) {
      isLogin = true;
      idUser = req.cookies.user._id;
      // let socialList = [req.body.personalWebsite, req.body.twitter, req.body.linkedin, req.body.facebook];
      // console.log(socialList);

      let personalWebsite = req.body.personalWebsite;
      let twitter = req.body.twitter;
      let facebook = req.body.facebook;
      let linkedin = req.body.linkedin;

      // console.log('hi:', req.body.personalWebsite, req.body.twitter, req.body.facebook, req.body.linkedin)
      console.log(req.body);

      // if(personalWebsite === "")
      //   personalWebsite === null;
      // if(twitter === "")
      //   twitter === null;
      // if(facebook === "")
      //   facebook === null;
      // if(linkedin == '')
      //   linkedin === "ass";

      // console.log(req.body);
      
      // Users.updateOne({ _id: idUser }, {$push: {list_social: [req.body.personalWebsite]}})
      // .then(() => res.redirect('edit-profile'))
      // .catch(err => console.log(err));

      Users.updateOne(
        { _id: idUser }, 
        { $set: 
          {list_social: [
            {"name": "Website", "url": personalWebsite},
            {"name": "Twitter", "url": twitter},
            {"name": "LinkedIn", "url": linkedin},
            {"name": "Facebook", "url": facebook}
          ]}
        })
      .then(() => res.redirect('edit-profile'))
      .catch(err => console.log(err));

      // res.json(req.body);
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
      let user = req.cookies.user;
      let idUser = req.cookies.user._id;
      let password = req.body.password;
      let notification;
      
      const checkUser = await Users.findOne({_id : idUser});
      if(!checkUser){
        //Sai tài khoản
        return res.status(404).render('component/login');
      }

      const validPassword = await bcrypt.compare(
        password,
        checkUser.password
      );

      if(!validPassword){
          notification = "Incorrect";
          res.render("profile/account.ejs", { title: "User account", user, notification } );
      } else {
        Users.updateOne( { _id: idUser } , { password: newPass} )
        .then(() => {
          notification = "Successful";
          res.render("profile/account.ejs", { title: "User account", user, notification } );
        });
      }
    }
});

// router.get('/public-profile', async (req, res, next) => {
//   res.render("profile/public-profile.ejs", { title: "User account" });
// });

module.exports = router;
