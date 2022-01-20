const bcrypt = require('bcrypt');

const Users = require('../database/models/Users');

function renderEditProfilePage (req, res, next) {
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

function renderEditAccountPage (req, res, next) {
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
};

async function editAccount (req, res, next) {
  const salt = await bcrypt.genSalt(10);
  const hashedNewPass = await bcrypt.hash(req.body.newPassword, salt);
  let newPass = hashedNewPass;

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
        res.render("profile/account.ejs", { title: "User account", user, notification } );
    } else {
      Users.updateOne( { _id: idUser } , { password: newPass} )
      .then(() => {
        notification = "Successful";
        res.render("profile/account.ejs", { title: "User account", user, notification } );
      });
    }
  }
}

function renderEditPhotoPage (req, res, next) {
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
}

module.exports = {
  renderEditProfilePage,
  editProfile,
  renderEditAccountPage,
  editAccount,
  renderEditPhotoPage,
  editPhoto
};