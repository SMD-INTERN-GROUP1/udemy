const express = require('express');

const router = express.Router();

/* GET users listing. */
router.get('/', (req, res, next) => {
  res.render("template/master", {
    title: "Topic page",
    content: "../course/course_index",
  });
});

router.get('/edit-profile', async (req, res, next) => {
  res.render("profile/profile.ejs");
});

router.get('/edit-account', async (req, res, next) => {
  res.render("profile/account.ejs");
});

module.exports = router;
