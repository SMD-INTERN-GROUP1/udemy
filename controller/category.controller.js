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

const renderUpdateView = async (req, res, next) => {
  const { id } = req.params;
  const category = await categoryService.findOneById(id);
  // res.send({ category });
  res.render("template/master", {
    title: "Category page",
    content: "../categories/update",
    category,
  });
};

const destroy = async function (req, res) {
  try {
    let data;
    const { id } = req.params;
    const { category, description } = req.body;
    data = { category, description };
    const deleteCategory = await categoryService.deleteCategory(id, data);
    res.redirect("/admin");
  } catch (error) {
    res.status(500).send(error);
  }
};

module.exports = {
  renderIndex,
  renderCreateView,
  create,
  renderUpdateView,
  destroy,
};
