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

const findOneById = async (id) => {
  const findCategory = await CategoriesModel.findById(id);

  return findCategory;
};

const deleteCategory = async (id, data) => {
  const deleteCategory = await CategoriesModel.findByIdAndDelete(id, data);
};

module.exports = { findAll, create, findOneById, deleteCategory };
