const express = require("express");

const router = express.Router();
const Categories = require("../database/models/Categories");

/* GET home page. */
router.get("/", async (req, res, next) => {
  const categories = await Categories.find();
  console.log(
    "🚀 ~ file: home.js ~ line 9 ~ router.get ~ categories",
    categories
  );
  res.render("index", { title: "Express", categories });
});

module.exports = router;
