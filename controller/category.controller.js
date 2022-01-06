const categoryService = require("../services/category.services");

const renderIndex = async (req, res, next) => {
  const categories = await categoryService.findAll(data);
  res.render("template/master", {
    title: "Admin page",
    content: "../admin_view/index",
    categories,
  });
};

const renderCreateView = (req, res, next) => {
  res.render("template/master", {
    title: "Categories page",
    content: "../categories/create",
  });
};

const create = async (req, res, next) => {
  try {
    let data;
    const { description, category } = req.body;
    data = { description, category };

    const createCategory = categoryService.create(data);
    // res.send({ category });
    res.redirect("/admin");
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ state: false, message: "Server error" })
      .redirect("/admin/createcategories");
  }
};

module.exports = { renderIndex, renderCreateView, create };
