const CategoriesModel = require("../database/models/Categories");

const findAll = async () => {
  const categories = await CategoriesModel.find();

  return categories;
};

module.exports = { findAll };
