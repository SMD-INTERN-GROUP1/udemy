const express = require("express");

const router = express.Router();
const Categories = require("../database/models/Categories");
const adminController = require("../controller/admin.controler");
const categoriesController = require("../controller/category.controller");

/* GET admin page. */
router.get("/", adminController.renderAdminPage);

// Categories section
// Render Create category page -> Route: /admin/categories
router.get("/categories", categoriesController.renderCreateView);

// Add category
router.post("/createcategories", categoriesController.create);

router.get("/updatecategories/:id", async (req, res, next) => {
  const { id } = req.params;
  const category = await Categories.findById(id);
  // res.send({ category });
  res.render("template/master", {
    title: "Category page",
    content: "../categories/update",
    category,
  });
});

// router.post("/updatecategories/:id", async (req, res, next) => {
//   try {
//     let data;
//     const { id } = req.params.id;
//     const { category, description } = req.body;
//     data = { category, description };
//     const updateCategory = await Categories.findByIdAndUpdate(id, data);
//     await updateCategory.save();
//     res.send(updateCategory);
//   } catch (error) {
//     res.status(500).send(error);
//   }
// });

router.get("/deletecategories/:id", async function (req, res) {
  try {
    const deleteCategory = await Categories.findByIdAndDelete(
      req.params.id,
      req.body
    );
    res.redirect("/admin");
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;
