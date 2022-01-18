const express = require("express");
const authMiddleware = require("../middlerwares/auth.middleware");
const { toggleWish } = require("../controller/user.controller");

const router = express.Router();

/* GET users listing. */
router.get("/", (req, res, next) => {
  res.send("respond with a resource");
});

/* PATCH users wishList. */
router.patch("/wish/:id", authMiddleware.verify, toggleWish);

module.exports = router;
