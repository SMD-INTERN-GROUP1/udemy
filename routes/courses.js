const express = require("express");

const router = express.Router();

/* GET course page. */
router.get("/development", (req, res, next) => {
  res.render("component/topic", { title: "Udemy" });
});

// Categories section
router.get("/categories", (req, res, next) => {
  res.render("categories/create", { title: "Categories page" });
});

router.post("/createCategory", (req, res, next) => {
  // res.render("categories/create", { title: "Categories page" });
  ``;
});

module.exports = router;
