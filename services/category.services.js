const CategoriesModel = require("../database/models/Categories");

const findAll = async (data) => {
  const category = await CategoriesModel.find(data);

  return category;
};

const create = async (data) => {
  const createCategory = new CategoriesModel(data);
  await createCategory.save();
  return createCategory;
};

module.exports = { findAll, create };
