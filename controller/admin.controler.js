const categoryService = require("../services/category.services");

const renderAdminPage = async (req, res, next) => {
  const categories = await categoryService.findAll();
  res.render("template/master", {
    title: "Admin page",
    content: "../admin_view/index",
    categories,
  });
};

module.exports = { renderAdminPage };
