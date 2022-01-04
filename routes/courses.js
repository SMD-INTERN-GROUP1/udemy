const express = require("express");

const router = express.Router();

/* GET course page. */
router.get("/development", (req, res, next) => {
  res.render("component/topic", { title: "Udemy" });
});

module.exports = router;
