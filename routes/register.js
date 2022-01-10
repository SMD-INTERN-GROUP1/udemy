const express = require('express');

const registerController = require('../controller/register.controller');

const router = express.Router();

router.get('/', registerController.renderRegisterPage);
router.post('/', registerController.renderUserRegister);

module.exports = router;