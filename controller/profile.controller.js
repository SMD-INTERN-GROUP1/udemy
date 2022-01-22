const bcrypt = require('bcrypt');
const { render } = require('ejs');

const Users = require('../database/models/Users');
const Carts = require('../database/models/Cart');
const categoryService = require("../services/category.services");

async function renderEditProfilePage (req, res, next) {
  try {
    const categories = await categoryService.getListCategory();
  
    if (req.cookies.user) {
      isLogin = true;

      Users.findOne({_id: req.cookies.user._id})
      .then(user => {
        res.render("profile/profile.ejs", { title: "Edit profile", user, categories } );
      })
      .catch(next);
    } else {
      res.redirect('/login');
    }
  } catch(err) {
    return   res.status(500).json(err);
  };
};

function editProfile (req, res, next) {
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
};

async function renderEditAccountPage (req, res, next) {
  try {
    const categories = await categoryService.getListCategory();
    let notification = "";

    if (req.cookies.user) {
      Users.findOne({_id: req.cookies.user._id})
      .then(user => {
        res.render("profile/account.ejs", { title: "User account", user, notification, categories } );
      })
      .catch(next);
    } else {
      res.redirect('/login');
    }
  } catch(err) {
    return res.status(500).json(err);
  };
};

async function editAccount (req, res, next) {
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedNewPass = await bcrypt.hash(req.body.newPassword, salt);
    let newPass = hashedNewPass;
    const categories = await categoryService.getListCategory();

    if (req.cookies.user) {
      let user = req.cookies.user;
      let idUser = req.cookies.user._id;
      let password = req.body.password;
      let notification = "";
      
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
          res.render("profile/account.ejs", { title: "User account", user, notification, categories } );
      } else {
        Users.updateOne( { _id: idUser } , { password: newPass} )
        .then(() => {
          notification = "Successful";
          res.render("profile/account.ejs", { title: "User account", user, notification, categories } );
        });
      }
    }
  } catch(err) {
    return   res.status(500).json(err);
  };
};

async function renderEditPhotoPage (req, res, next) {
  try {
    const categories = await categoryService.getListCategory();
  
    if (req.cookies.user) {
      Users.findOne({_id: req.cookies.user._id})
      .then(user => {
        res.render("profile/avatar.ejs", { title: "Photo", user, categories });
      })
      .catch(next);
    } else {
      res.redirect('/login');
    }
  } catch(err) {
    return   res.status(500).json(err);
  };
};

async function editPhoto (req, res, next) {
  let avatar = '/images/profile/uploads/' + req.file.filename;

  if (req.cookies.user){
      idUser = req.cookies.user._id;
  
      Users.updateOne(
        { _id: idUser }, { avatar: avatar })
      .then(() => {
        res.redirect('edit-profile');
      })
      .catch(err => console.log(err));
  }
};

async function renderCloseAccountPage (req, res, next) {
  try {
    const categories = await categoryService.getListCategory();
    let message = "";
  
    if (req.cookies.user) {
      Users.findOne({_id: req.cookies.user._id})
      .then(user => {
        res.render("profile/close-account.ejs", { title: "Edit profile", user, categories, message } );
      })
      .catch(next);
    } else {
      res.redirect('/login');
    }
  } catch(err) {
    return res.status(500).json(err);
  };
};

async function closeAccount (req, res, next) {
    try {
      const categories = await categoryService.getListCategory();

      if(req.cookies.user) {
        let id = req.body.id;
        let message = "";

        await Carts.deleteOne({ $and: [ { user_id : id }, { isTeacher: false } ]});
        let deletedCount = await Users.deleteOne({ $and: [ { _id: id }, { isTeacher: false } ]});
    
        if(deletedCount.deletedCount) {
          res.clearCookie("user");
          res.clearCookie("accessToken");
          res.redirect('/');
        } else {
          Users.findOne({_id: req.cookies.user._id})
          .then(user => {
            message = "You cannot delete your account !!!";
            res.render("profile/close-account.ejs", { title: "Edit profile", user, categories, message } );
          })
          .catch(err => console.log(err));
        }
      }
    } catch(err) {
      return res.status(500).json(err);
    }; 
};

module.exports = {
  renderEditProfilePage,
  editProfile,
  renderEditAccountPage,
  editAccount,
  renderEditPhotoPage,
  editPhoto,
  renderCloseAccountPage,
  closeAccount
};