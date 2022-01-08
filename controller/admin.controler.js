const CategoriesModel = require("../database/models/Category");

const renderAdminPage = async (req, res, next) => {
  const categories = await CategoriesModel.find();
  res.render("template/master", {
    title: "Admin page",
    content: "../admin_view/index",
    categories,
  });
};

module.exports = { renderAdminPage };
