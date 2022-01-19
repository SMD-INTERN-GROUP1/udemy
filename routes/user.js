const express = require('express');
const bcrypt = require('bcrypt');
const multer = require('multer');

const Users = require('../database/models/Users');

const router = express.Router();


const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/images/profile/uploads')
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null, uniqueSuffix + '-' + file.originalname)
  }
})

const fileFilter = (req, file, cb) => {
  //reject a file
  if(file.mimetype === 'image/jpeg' || file.mimetype === 'image/png'){
    cb(null, true);
  } else {
    cb(null, false);
  }
}

const upload = multer({ 
  storage: storage, 
  limits: {
    fileSize: 1024 * 1024 * 5
  } ,
  fileFilter: fileFilter
});

router.patch('/edit-photo', upload.single('avatar'), async (req, res, next) => {
  console.log(req.file);
  res.json(req.body);
});

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

        let personalWebsite = req.body.Website;
        let twitter = req.body.Twitter;
        let facebook = req.body.Facebook;
        let linkedin = req.body.LinkedIn;
        let fullName = req.body.fullName;
        let headLine = req.body.headLine;
        let biography = req.body.biography;

        Users.updateOne(
          { _id: idUser }, 
          { 
            $set: 
            {
              list_social: [
                {"name": "Website", "url": personalWebsite},
                {"name": "Twitter", "url": twitter},
                {"name": "LinkedIn", "url": linkedin},
                {"name": "Facebook", "url": facebook}
              ],
              fullName: fullName,
              headLine: headLine,
              biography: biography
            }
          })
        .then(() => res.redirect('edit-profile'))
        .catch(err => console.log(err));
      }
    } catch {
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

//avatar page
router.get('/edit-photo', async (req, res, next) => {
  
  try {
    let isLogin = false;
  
    if (req.cookies.user) {
      isLogin = true;

      Users.findOne({_id: req.cookies.user._id})
      .then(user => {
        res.render("profile/avatar.ejs", { title: "Photo", user });
      })
      .catch(next);
    } else {
      res.redirect('/login');
    }
  } catch(err) {
    return   res.status(500).json(err);
  };
});




module.exports = router;
