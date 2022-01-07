const express = require("express");

const router = express.Router();

/* GET home page. */
router.get("/", (req, res, next) => {
  const user=req.session.authUser
  console.log(user);
  res.render("index", { title: "Express"});
});

module.exports = router;
