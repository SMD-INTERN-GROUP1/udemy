const express = require('express');
const bodyParser = require('body-parser');

const UserModel = require('../models/Users');
const router = express.Router();

let errs = [];

/* GET register page. */
router.get('/', (req, res, next) => {
  res.render('component/register', { title: 'Register page' , errs: errs});
});

router.post('/', (req, res, next) => {
  let username = req.body.username;
  let email = req.body.email;
  let password = req.body.password;
  let confirmPassword = req.body.confirmPassword;
  console.log(req.body);

  if(username.length < 6)
    errs.push('Username must be at least 6 characters!');
  
  if(password.length < 8)
    errs.push('Password must be at least 8 characters!');

  if(password !== confirmPassword)
    errs.push('Password, no match!');

  if(errs.length > 0){
      res.render('component/register', {
          title: 'Register page',
          errs: errs
      });
  }

  if(errs.length == 0) {
    UserModel.findOne({
      username: username
    })
    .then(data => {
      if(data) {
        errs.push('Username already exist!');
        res.render('component/register', { title: 'Register page' , errs: errs});
      }
    });

    UserModel.findOne({
      email: email
    })
    .then(data => {
      if(data) {
        errs.push('Email already exist!');
        res.render('component/register', { title: 'Register page' , errs: errs});
      }
    });

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
      res.json('Tạo tài khoản thất bại');
    })
  }
});

module.exports = router;