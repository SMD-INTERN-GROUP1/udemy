const CategoriesModel = require("../database/models/Categories");

const getListCategories = async () => {
  const categories = await CategoriesModel.find();

  return categories;
};

module.exports = { getListCategories };
