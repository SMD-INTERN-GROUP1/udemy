const express = require("express");
const router = express.Router();

/* GET instructor page. */
router.get("/", (req, res, next) => {
  res.render("template_instructor/master", {
    title: "Instructor page",
    content: "../instructor_view/instructor_index",
  });
});

module.exports = router;
