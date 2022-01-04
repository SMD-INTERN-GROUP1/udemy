const express = require("express");

const router = express.Router();

/* GET admin page. */
router.get("/", (req, res, next) => {
  res.render("template/master", {
    title: "Admin page",
    content: "../admin_view/index",
  });
});

// Categories section
router.get("/categories", (req, res, next) => {
  res.render("template/master", {
    title: "Categories page",
    content: "../categories/create",
  });
});

router.post("/createCategory", (req, res, next) => {
  // res.render("categories/create", { title: "Categories page" });
  ``;
});

module.exports = router;
