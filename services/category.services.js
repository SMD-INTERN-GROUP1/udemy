const CategoriesModel = require("../database/models/Categories");

const getListCategory = async () => {
  const categories = await CategoriesModel.find();
  return categories;
};

module.exports = { getListCategory };
