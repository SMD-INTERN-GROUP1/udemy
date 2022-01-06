const Categories = require("../database/models/Categories");
const categoryService = require("../services/category.services");

function getHomePage(req, res, next) {
  res.render("index", { title: "Group1 SMD Number one" });
}

const renderHomePage = async (req, res, next) => {
  const categories = await Categories.find();
  res.render("index", { title: "Udemy", categories });
};

module.exports = {
  getHomePage,
  renderHomePage,
};
