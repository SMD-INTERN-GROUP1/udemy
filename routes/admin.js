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

// Render update category page
router.get("/updatecategories/:id"), categoriesController.renderUpdateView;

router.post("/updatecategories/:id", async (req, res, next) => {
  try {
    let data;
    const { id } = req.params.id;
    const { category, description } = req.body;
    data = { category, description };
    const updateCategory = await Categories.findByIdAndUpdate(id, data);
    await updateCategory.save();
    res.send(updateCategory);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.get("/deletecategories/:id", categoriesController.destroy);

module.exports = router;
