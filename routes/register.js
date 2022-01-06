const express = require('express');
const bodyParser = require('body-parser');

const UserModel = require('../models/Users');
const router = express.Router();

/* GET register page. */
router.get('/', (req, res, next) => {
  res.render('component/register', { title: 'Register page' });
});

router.post('/', (req, res, next) => {
  let username = req.body.username;
  let email = req.body.email;
  let password = req.body.password;

  UserModel.create({
    username: username,
    email: email,
    password: password,
  })
  .then(data => {
    res.json('Tạo tài khoản thành công');
  })
  .catch(err => {
    res.json('Tạo tài khoản thất bại');
  })
});

module.exports = router;