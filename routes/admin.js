const express = require("express");

const router = express.Router();
const Categories = require("../database/models/Categories");

/* GET admin page. */
router.get("/", async (req, res, next) => {
  const categories = await Categories.find();
  res.render("template/master", {
    title: "Admin page",
    content: "../admin_view/index",
    categories,
  });
});

// Categories section
router.get("/categories", (req, res, next) => {
  res.render("template/master", {
    title: "Categories page",
    content: "../categories/create",
  });
});

router.post("/createCategory", async (req, res, next) => {
  let category;
  const { id_category, title } = req.body;
  category = { id_category, title };

  const createCategory = new Categories(category);
  await createCategory.save();
  // res.send({ category });
  res.redirect("/admin");
});

router.get("/viewCategory", (req, res, next) => {
  res.render("template/master", {
    title: "Category page",
    content: "../categories/view",
  });
});

router.get("/update", (req, res, next) => {});
module.exports = router;
