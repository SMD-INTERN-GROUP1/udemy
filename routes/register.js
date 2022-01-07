const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require("bcrypt");

const UserModel = require('../database/models/User');
const router = express.Router();

let errs = [];

/* GET register page. */
router.get('/', (req, res, next) => {
  res.render('component/register', { title: 'Register page' , errs: errs});
});

router.post('/',async (req, res, next) => {
  const salt =  await bcrypt.genSalt(10);
  const hashed = await bcrypt.hash(req.body.password,salt);
  let username = req.body.username;
  let email = req.body.email;
  let password = hashed;
  let confirmPassword = hashed;
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
      res.redirect("/auth");
    })
    .catch(err => {
      res.json('Tạo tài khoản thất bại');
    })
  }
});

module.exports = router;