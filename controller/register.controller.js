const UserModel = require('../models/Users');

let errs = [];

module.exports.renderRegisterPage = (req, res, next) => {
  res.render('component/register', { title: 'Register page' , errs: errs});
};

module.exports.renderUserRegister = (req, res, next) => {
  let username = req.body.username;
  let email = req.body.email;
  let password = req.body.password;
  errs = [];
  
  // console.log(req.body);
  UserModel.findOne({
    username: username
  })
  .then(data => {
    if(data) {
      errs.push('Username already exist!');
    }
  });

  UserModel.findOne({
    email: email
  })
  .then(data => {
    if(data) {
      errs.push('Email already exist!');
    }
  });

  if(errs.length > 0){
    res.render('component/register', {
      title: 'Register page',
      errs: errs
  })};

  if(errs.length === 0) {
    UserModel.create({
      username: username,
      email: email,
      password: password,
    })
    .then(data => {
      //redirect login form
      res.json('Tạo tài khoản thành công');
    })
    .catch(err => {
      // res.json('Tạo tài khoản thất bại');
      res.render('component/register', {
        title: 'Register page',
        errs: errs
      })
    });
  }
};